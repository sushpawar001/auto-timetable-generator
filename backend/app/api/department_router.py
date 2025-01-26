import time
from bson import ObjectId
from fastapi import APIRouter, HTTPException, Cookie
from typing import List
from app.db.config import department_settings_collection
from app.utils.auth_helpers import decode_access_token
from app.models.subject_model import DepartmentSettingsInput

department_router = APIRouter()


@department_router.get("/departments/get")
async def read_departments(access_token: str = Cookie()):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    user_id = decode_access_token(access_token)
    department_data = department_settings_collection.find({"user_id": user_id})
    departments = convert_objectid_to_str(department_data)

    return {"status": "success", "data": departments}


def convert_objectid_to_str(cursor):
    return [{**item, "_id": str(item["_id"])} for item in cursor]


@department_router.post("/departments/update")
async def update_department(
    data: DepartmentSettingsInput, access_token: str = Cookie()
):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    user_id = decode_access_token(access_token)

    update_data = data.model_dump()
    update_data.pop("department_id")

    department_settings_collection.update_one(
        {"_id": ObjectId(data.department_id)}, {"$set": update_data}
    )
    return {"status": "success"}
