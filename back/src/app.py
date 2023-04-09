from fastapi import FastAPI
from fastapi_pagination import add_pagination
from starlette.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from core.config import get_settings
from core.user_manager import include_user_routers
from db.utils import create_db_and_tables
from job import scheduler
from routers.api import api_router

settings = get_settings()

app = FastAPI(
    title="Template Project for awesome",
    version="0.0.1",
    description="API for your best project",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.on_event("startup")
async def on_start():
    scheduler.start()
    return
    await create_db_and_tables()


include_user_routers(app)
app.include_router(api_router)

add_pagination(app)
