from fastapi import APIRouter, HTTPException, Cookie
from app.db.config import subject_collection, department_settings_collection
from app.utils.auth_helpers import decode_access_token
from app.utils.convert_data_format import convert_data_format_tt, convert_data_format_settings
from app.utils.auto_schedule import auto_schedule

timetable_router = APIRouter()

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
