from fastapi import APIRouter

from routers import tasks, targets, statuses, target_types, workgroups

api_router = APIRouter()

api_router.include_router(tasks.router, prefix="/tasks", tags=["tasks"])
api_router.include_router(targets.router, prefix="/targets", tags=["targets"])
api_router.include_router(statuses.router, prefix="/statuses", tags=["statuses"])
api_router.include_router(target_types.router, prefix="/target_types", tags=["target_types"])
api_router.include_router(workgroups.router, prefix="/workgroups", tags=["workgroups"])
