from fastapi import APIRouter, HTTPException, Header, Response, Cookie
from fastapi.security import OAuth2PasswordBearer
from app.db.config import user_collection
from app.models.user_model import UserModel
from datetime import datetime, timedelta
from app.utils.auth_helpers import verify_password, hash_password, create_access_token
from fastapi.responses import JSONResponse

auth_router = APIRouter()

@auth_router.post("/login")
async def login(user: UserModel, response: Response):
    user_data = user_collection.find_one({"email": user.email})

    if not user_data:
        raise HTTPException(status_code=400, detail="User does not exists!")

    if verify_password(user.password, user_data["password"]):
        access_token = create_access_token({"sub": str(user_data["_id"])})
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=True,
            expires=7 * 24 * 60 * 60,
            max_age=7 * 24 * 60 * 60  # 7 days in seconds
        )
        return {"status": "success", "user_id": str(user_data["_id"])}
    else:
        raise HTTPException(status_code=400, detail="Incorrect email or password!")


@auth_router.post("/register")
async def register(user: UserModel):
    user_data = user_collection.find_one({"email": user.email})
    if user_data:
        raise HTTPException(status_code=400, detail="User already registered")
    else:
        user.password = hash_password(user.password)
        user_collection.insert_one(user.model_dump())
        return {"status": "success"}


@auth_router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(key="access_token")
    return {"status": "success"}
