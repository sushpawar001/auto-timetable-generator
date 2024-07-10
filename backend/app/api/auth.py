from fastapi import APIRouter, HTTPException, Header
from fastapi.security import OAuth2PasswordBearer
from app.db.config import user_collection
from app.models.user_model import UserModel

from app.utils.auth_helpers import verify_password, hash_password, create_access_token


auth_router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@auth_router.post("/login")
async def login(user: UserModel):
    user_data = user_collection.find_one({"email": user.email})

    if not user_data:
        raise HTTPException(status_code=400, detail="User does not exists!")

    if verify_password(user.password, user_data["password"]):
        access_token = create_access_token({"sub": str(user_data["_id"])})
        return {"access_token": access_token, "status": "success"}
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

@auth_router.get("/me")
async def hidden_page(token: str = Header(...)):
    print(token)
    return {"status": "success"}
