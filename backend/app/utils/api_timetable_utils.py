from app.db.config import department_settings_collection, subject_collection, timetable_collection
from app.utils.auto_schedule import auto_schedule
from app.utils.convert_data_format import convert_data_format_settings, convert_data_format_tt


def create_timetable(user_id: str):
    department_settings = department_settings_collection.find({"user_id": user_id}, {"_id": 0, "user_id": 0})
    formatted_settings = convert_data_format_settings(list(department_settings))

    subjects = subject_collection.find({"user_id": user_id})
    formatted_tt_data = convert_data_format_tt(list(subjects))

    timetable = auto_schedule(formatted_tt_data, formatted_settings)

    return timetable


def store_timetable(user_id: str, timetable: dict):
    timetable_collection.delete_many({"user_id": user_id})
    timetable_collection.insert_one({"user_id": user_id, "timetable": timetable})