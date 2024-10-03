from fastapi import APIRouter, HTTPException, Cookie
from app.db.config import (
    subject_collection,
    department_settings_collection,
    timetable_collection,
)
from app.utils.auth_helpers import decode_access_token
from bson.objectid import ObjectId
from app.utils.auto_schedule import create_professors_timetable2, split_strip_strings

professor_router = APIRouter()


@professor_router.get("/professors/get")
def get_all_professors(access_token: str = Cookie(None)):
    user_id = decode_access_token(access_token)
    subjects = subject_collection.find({"user_id": user_id})
    professors = set(
        split_strip_strings([subject["professor"] for subject in subjects])
    )

    return {"status": "success", "data": professors}


@professor_router.get("/professors/timetable")
def get_professors_timetable(access_token: str = Cookie(None)):
    user_id = decode_access_token(access_token)
    subjects = subject_collection.find({"user_id": user_id})
    department_settings = department_settings_collection.find(
        {"user_id": user_id}, {"_id": 0, "user_id": 0, "practical_slots": 0}
    )
    professors = set(
        split_strip_strings([subject["professor"] for subject in subjects])
    )
    timetable = timetable_collection.find_one({"user_id": user_id})
    if timetable is None:
        raise HTTPException(status_code=404, detail="Timetable not found")

    timetable = timetable["timetable"]
    
    professors_timetable, max_lecs = create_professors_timetable2(
        list(professors), timetable, list(department_settings)
    )
    return {
        "status": "success",
        "timetable_data": professors_timetable,
        "number_of_lectures": max_lecs,
    }
