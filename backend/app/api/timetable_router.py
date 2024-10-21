from fastapi import APIRouter, HTTPException, Cookie
from app.db.config import timetable_collection
from app.utils.auth_helpers import decode_access_token
from app.utils.api_timetable_utils import (
    create_timetable,
    create_timetable_ga_optimized,
    create_timetable_sa,
    store_timetable,
    create_timetable_ga,
    create_timetable_ai,
)
from app.utils.auto_schedule import tt_score_calc

timetable_router = APIRouter()


@timetable_router.get("/timetable")
async def get_timetable(access_token: str = Cookie()):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    user_id = decode_access_token(access_token)
    print(f"{user_id = }")
    timetable = timetable_collection.find_one({"user_id": user_id}, {"_id": 0})

    if not timetable:
        timetable = create_timetable(user_id)
        store_timetable(user_id, timetable)
        print("Timetable created")

    return {"status": "success", "data": timetable["timetable"]}


@timetable_router.get("/test_tt")
def test_tt(user_id: str):
    import json, time

    # # manual approch 91.66
    # "668f5e36fea09a575df5e494"
    
    start = time.perf_counter()
    tt = create_timetable_ga_optimized(user_id)
    end = time.perf_counter()
    time_taken = end - start
    print(f"[ga optimized] {time_taken = }")
    print(f"score {tt_score_calc(tt)}")
    
    start = time.perf_counter()
    tt = create_timetable_sa(user_id)
    end = time.perf_counter()
    time_taken = end - start
    print(f"[sa] {time_taken = }")
    print(f"score {tt_score_calc(tt)}")
    
    start = time.perf_counter()
    tt = create_timetable_ai(user_id)
    end = time.perf_counter()
    time_taken = end - start
    print(f"[ai] {time_taken = }")
    print(f"score {tt_score_calc(tt)}")

    return {"status": "success"}
