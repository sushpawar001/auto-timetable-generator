from fastapi import APIRouter, HTTPException, Cookie
from pymongo import ReturnDocument
from app.db.config import subject_collection, department_settings_collection
from app.models.subject_model import SubjectModelInput
from app.utils.auth_helpers import decode_access_token
from bson.objectid import ObjectId
from app.models.subject_model import SubjectModelInput, DepartmentSettings
from typing import List
from app.utils.api_timetable_utils import (
    create_timetable,
    store_timetable,
    update_remaining_workload,
)
from app.db.config import timetable_collection

subjects_router = APIRouter()


@subjects_router.post("/subjects/create")
async def create_subject(subject: SubjectModelInput, access_token: str = Cookie()):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    user_id = decode_access_token(access_token)
    subject_data = subject.model_dump()
    subject_data["user_id"] = user_id
    result = subject_collection.insert_one(subject_data)
    return {"status": "success", "id": str(result.inserted_id)}


@subjects_router.get("/subjects/get")
async def read_subjects(access_token: str = Cookie()):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    user_id = decode_access_token(access_token)
    subject_data = subject_collection.find({"user_id": user_id})
    subjects = convert_objectid_to_str(subject_data)
    return {"status": "success", "data": subjects}


def convert_objectid_to_str(cursor):
    return [{**item, "_id": str(item["_id"])} for item in cursor]


@subjects_router.get("/subject/get/{subject_id}")
async def read_subject(subject_id: str, access_token: str = Cookie()):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    user_id = decode_access_token(access_token)
    subject = subject_collection.find_one(
        {"_id": ObjectId(subject_id), "user_id": user_id}
    )
    if subject:
        subject["_id"] = str(subject["_id"])
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    return {"status": "success", "data": subject}


@subjects_router.put("/subject/update/{subject_id}")
async def update_subject(
    subject_id: str, subject: SubjectModelInput, access_token: str = Cookie()
):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    user_id = decode_access_token(access_token)
    subject_data = subject.model_dump()
    subject_data["user_id"] = user_id
    result = subject_collection.find_one_and_update(
        {"_id": ObjectId(subject_id), "user_id": user_id},
        {"$set": subject_data},
        return_document=ReturnDocument.AFTER,
    )

    if result is None:
        raise HTTPException(status_code=404, detail="Subject not found")

    result["_id"] = str(result["_id"])

    timetable, workload_data = create_timetable(user_id)
    store_timetable(user_id, timetable)
    update_remaining_workload(user_id, workload_data)

    return {"status": "success", "data": result}


@subjects_router.delete("/subjects/delete/{subject_id}")
async def delete_subject(subject_id: str, access_token: str = Cookie()):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    user_id = decode_access_token(access_token)
    result = subject_collection.delete_one(
        {"_id": ObjectId(subject_id), "user_id": user_id}
    )
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Subject not found")

    timetable, workload_data = create_timetable(user_id)
    store_timetable(user_id, timetable)
    update_remaining_workload(user_id, workload_data)

    return {"status": "success"}


@subjects_router.delete("/subjects/delete-all")
async def delete_all_subjects_and_settings(access_token: str = Cookie()):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    user_id = decode_access_token(access_token)

    # Delete all subjects for the user
    subject_result = subject_collection.delete_many({"user_id": user_id})

    # Delete all department settings for the user
    settings_result = department_settings_collection.delete_many({"user_id": user_id})

    timetable_collection.delete_many({"user_id": user_id})

    return {
        "status": "success",
        "deleted_subjects_count": subject_result.deleted_count,
        "deleted_settings_count": settings_result.deleted_count,
    }


def filter_subject(subject: dict[str, str]):
    required_fields = ["subject", "department", "college_year", "subject_type"]
    return all(subject[field] != "" for field in required_fields)


@subjects_router.post("/subjects/upload-csv")
async def get_csv_data(subjects: List[SubjectModelInput], access_token: str = Cookie()):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    user_id = decode_access_token(access_token)

    # Combine model_dump and strip operations in a single loop
    to_upload = [
        {
            **subject.model_dump(),
            "user_id": user_id,
            "subject": subject.subject.strip(),
            "department": subject.department.strip(),
            "college_year": subject.college_year.strip(),
            "subject_type": subject.subject_type.strip(),
        }
        for subject in subjects
    ]

    # Filter subjects in the same loop to avoid an additional iteration
    to_upload = [subject for subject in to_upload if filter_subject(subject)]

    # Use set comprehension directly
    departments = {subject["department"] for subject in to_upload}

    # Use list comprehension directly
    department_settings = [
        DepartmentSettings(user_id=user_id, department=department).model_dump()
        for department in departments
    ]

    subject_collection.delete_many({"user_id": user_id})
    department_settings_collection.delete_many({"user_id": user_id})

    subject_result = subject_collection.insert_many(to_upload)
    department_settings_result = department_settings_collection.insert_many(
        department_settings
    )

    timetable, workload_data = create_timetable(user_id)
    store_timetable(user_id, timetable)
    update_remaining_workload(user_id, workload_data)

    if subject_result.acknowledged and department_settings_result.acknowledged:
        return {"status": "success"}
    else:
        raise HTTPException(status_code=500, detail="Failed to upload data")
