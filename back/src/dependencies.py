from fastapi import Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.user_manager import fastapi_users
from db.engine import get_async_session
from db.models import Post

current_active_user = fastapi_users.current_user(active=True)
current_super_user = fastapi_users.current_user(superuser=True)

optional_current_user = fastapi_users.current_user(optional=True, active=True)


async def get_post(post_id: int, db: AsyncSession = Depends(get_async_session)) -> Post:
    post = await db.get(Post, post_id)
    if post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found!"
        )
    return post


async def get_post_as_owner(
    post_id: int,
    db: AsyncSession = Depends(get_async_session),
    user=Depends(current_active_user),
):
    post = await db.get(Post, post_id)
    if post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found!"
        )
    if not (post.user_id == user.id or user.is_superuser):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You have no power!",
        )
    return post
