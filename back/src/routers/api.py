from fastapi import APIRouter

from routers import contents

api_router = APIRouter()

api_router.include_router(contents.router, prefix="/contents", tags=["contents"])
