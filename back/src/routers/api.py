from fastapi import APIRouter

from routers import posts

api_router = APIRouter()
api_router.include_router(posts.router, prefix="/posts", tags=["posts"])
