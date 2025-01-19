from typing import Dict, List
from pydantic import BaseModel, Field


class LectureModel(BaseModel):
    professors: str | list[str]
    subjects: str | list[str]
    isOptional: bool = False


class TimetableModel(BaseModel):
    time_slot: list[str]
    monday: list[LectureModel] = []
    tuesday: list[LectureModel] = []
    wednesday: list[LectureModel] = []
    thursday: list[LectureModel] = []
    friday: list[LectureModel] = []
    saturday: list[LectureModel] = []
    sunday: list[LectureModel] = []


class SubjectModel(BaseModel):
    subject: str
    subtype: str
    professor: str


class CollegeYearModel(BaseModel):
    Mon: List[SubjectModel]
    Tue: List[SubjectModel]
    Wed: List[SubjectModel]
    Thurs: List[SubjectModel]
    Fri: List[SubjectModel]
    Sat: List[SubjectModel]


class GenerateTimetableModel(BaseModel):
    timetable: Dict[str, CollegeYearModel]
