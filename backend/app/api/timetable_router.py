from fastapi import APIRouter, HTTPException, Cookie
from app.db.config import timetable_collection
from app.utils.auth_helpers import decode_access_token
from app.utils.api_timetable_utils import create_timetable, store_timetable

timetable_router = APIRouter()

@timetable_router.get("/timetable")
async def get_timetable(access_token: str = Cookie()):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    user_id = decode_access_token(access_token)
    
    timetable = timetable_collection.find_one({"user_id": user_id}, {"_id": 0})
    
    if not timetable:
        timetable = create_timetable(user_id)
        store_timetable(user_id, timetable)
        print("Timetable created")


    return {"status": "success", "data": timetable["timetable"]}
