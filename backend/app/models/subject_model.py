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

