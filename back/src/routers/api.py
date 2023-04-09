from fastapi import APIRouter

from routers import tasks, targets

api_router = APIRouter()

api_router.include_router(tasks.router, prefix="/tasks", tags=["tasks"])
api_router.include_router(targets.router, prefix="/targets", tags=["targets"])
