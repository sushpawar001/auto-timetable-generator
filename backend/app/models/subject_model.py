from pydantic import BaseModel

class SubjectModel(BaseModel):
    subject: str
    professor: str
    department: str
    college_year: str
    subject_type: str
    workload: int
    

class SubjectModelInput(BaseModel):
    subject: str = ""
    professor: str = ""
    department: str = ""
    college_year: str = ""
    subject_type: str = ""
    workload: int = -1

class DepartmentSettings(BaseModel):
    user_id: str
    department: str
    start_time: str = "07:20"
    end_time: str = "10:00"
    practical_slots: list[str] = []
    minutes_lecture: int = 40

class DepartmentSettingsInput(DepartmentSettings):
    department_id: str

