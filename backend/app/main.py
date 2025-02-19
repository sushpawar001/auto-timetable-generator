from fastapi import FastAPI, Request, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.api.timetable_router import timetable_router
from app.api.auth import auth_router
from app.api.professor_router import professor_router
from starlette.middleware.base import BaseHTTPMiddleware
from app.api.subjects_router import subjects_router
from app.api.department_router import department_router
from fastapi.middleware.gzip import GZipMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:5173/*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(GZipMiddleware)

app.include_router(auth_router, tags=["auth"])
app.include_router(timetable_router, tags=["timetable"])
app.include_router(subjects_router, tags=["subjects"])
app.include_router(professor_router, tags=["professor"])
app.include_router(department_router, tags=["department"])

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
