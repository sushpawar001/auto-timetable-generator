from fastapi import APIRouter, HTTPException, Cookie
from app.models.subject_model import SubjectModelInput, DepartmentSettings
from typing import List
from app.db.config import subject_collection, department_settings_collection
from app.utils.auth_helpers import decode_access_token
from app.utils.convert_data_format import convert_data_format_tt, convert_data_format_settings
from app.utils.auto_schedule import auto_schedule

timetable_router = APIRouter()

def filter_subject(subject: dict[str, str]):
    required_fields = ["subject", "department", "college_year", "subject_type"]
    return all(subject[field] != "" for field in required_fields)


@timetable_router.post("/timetable/upload-csv")
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

    subject_result = subject_collection.insert_many(to_upload)
    department_settings_result = department_settings_collection.insert_many(department_settings)

    if subject_result.acknowledged and department_settings_result.acknowledged:
        return {"status": "success"}
    else:
        raise HTTPException(status_code=500, detail="Failed to upload data")


@timetable_router.get("/timetable")
async def get_timetable(access_token: str = Cookie()):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    user_id = decode_access_token(access_token)
    department_settings = department_settings_collection.find({"user_id": user_id}, {"_id": 0, "user_id": 0})
    formatted_settings = convert_data_format_settings(list(department_settings))
    # print(formatted_settings)

    subjects = subject_collection.find({"user_id": user_id})
    formatted_tt_data = convert_data_format_tt(list(subjects))

    timetable = auto_schedule(formatted_tt_data, formatted_settings)

    print(timetable)

    return {"status": "success", "data": timetable}
