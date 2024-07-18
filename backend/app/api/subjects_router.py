from fastapi import APIRouter, HTTPException, Cookie
from app.db.config import subject_collection, department_settings_collection
from app.models.subject_model import SubjectModelInput
from app.utils.auth_helpers import decode_access_token


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


@subjects_router.get("/subjects/get/{subject_id}")
async def read_subject(subject_id: str, access_token: str = Cookie()):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    user_id = decode_access_token(access_token)
    subject = subject_collection.find_one({"_id": subject_id, "user_id": user_id})
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    return {"status": "success", "data": subject}


@subjects_router.put("/subjects/update/{subject_id}")
async def update_subject(
    subject_id: str, subject: SubjectModelInput, access_token: str = Cookie()
):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    user_id = decode_access_token(access_token)
    subject_data = subject.model_dump()
    subject_data["user_id"] = user_id
    result = subject_collection.update_one(
        {"_id": subject_id, "user_id": user_id}, {"$set": subject_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Subject not found")
    return {"status": "success"}


@subjects_router.delete("/subjects/delete/{subject_id}")
async def delete_subject(subject_id: str, access_token: str = Cookie()):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    user_id = decode_access_token(access_token)
    result = subject_collection.delete_one({"_id": subject_id, "user_id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Subject not found")
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

    return {
        "status": "success",
        "deleted_subjects_count": subject_result.deleted_count,
        "deleted_settings_count": settings_result.deleted_count,
    }
