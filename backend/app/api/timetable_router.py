from fastapi import APIRouter, HTTPException, Cookie
from app.db.config import timetable_collection
from app.utils.auth_helpers import decode_access_token
from app.utils.api_timetable_utils import (
    create_timetable,
    store_timetable,
    create_timetable_ai,
    update_remaining_workload,
)
from app.utils.auto_schedule import tt_score_calc
from app.models.timetable_model import (
    GenerateTimetableModel,
)

timetable_router = APIRouter(prefix="/timetable", tags=["timetable"])


@timetable_router.get("/get_timetable")
async def get_timetable(access_token: str = Cookie()) -> GenerateTimetableModel:
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    user_id = decode_access_token(access_token)

    timetable = timetable_collection.find_one({"user_id": user_id}, {"_id": 0})

    if not timetable:
        return GenerateTimetableModel(timetable={})

    return GenerateTimetableModel(timetable=timetable.get("timetable"))


@timetable_router.get("/generate_timetable")
async def generate_timetable(access_token: str = Cookie()) -> GenerateTimetableModel:
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    user_id = decode_access_token(access_token)
    try:
        timetable, workload_data = create_timetable(user_id)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))

    store_timetable(user_id, timetable)
    update_remaining_workload(user_id, workload_data)

    return GenerateTimetableModel(timetable=timetable)


@timetable_router.get("/generate_ai_timetable")
async def generate_ai_timetable(access_token: str = Cookie()) -> GenerateTimetableModel:
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    user_id = decode_access_token(access_token)

    try:
        timetable = create_timetable_ai(user_id)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    store_timetable(user_id, timetable)

    return GenerateTimetableModel(timetable=timetable)


@timetable_router.get("/get_timetable_score")
async def get_timetable_score(access_token: str = Cookie()) -> dict:
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    user_id = decode_access_token(access_token)

    timetable = timetable_collection.find_one({"user_id": user_id}, {"_id": 0})

    if not timetable or not timetable.get("timetable"):
        print("Timetable not found")
        return {
            "empty_lecs": 0,
            "total_lecs": 0,
            "tt_score": 0,
        }
        # raise HTTPException(status_code=404, detail="Timetable not found")

    empty_lecs, total_lecs, tt_score = tt_score_calc(timetable["timetable"])

    return {
        "empty_lecs": empty_lecs,
        "total_lecs": total_lecs,
        "tt_score": round(tt_score, 2),
    }
