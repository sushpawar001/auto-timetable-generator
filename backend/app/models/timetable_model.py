from pydantic import BaseModel

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
