from fastapi import APIRouter, HTTPException
from app.models.subject_model import SubjectModelInput
from typing import List
from app.db.config import subject_collection
from app.utils.convert_data_format import convert_data_format

timetable_router = APIRouter()

@timetable_router.post("/timetable/upload-csv")
async def get_csv_data(subjects: List[SubjectModelInput]):
    to_upload = [subject.model_dump() for subject in subjects]
    result = subject_collection.insert_many(to_upload)

    return {"status": "success"}

@timetable_router.get("/timetable")
async def get_timetable():
    subjects = subject_collection.find({})
    formatted_data = convert_data_format(subjects)

    return {"status": "success", "data": formatted_data}