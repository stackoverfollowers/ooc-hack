from fastapi import Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import join

from core.user_manager import fastapi_users
from db.engine import get_async_session
from db.models import Content, Target, Task

current_user = fastapi_users.current_user()
current_active_user = fastapi_users.current_user(active=True)
current_super_user = fastapi_users.current_user(superuser=True)

optional_current_user = fastapi_users.current_user(optional=True, active=True)


async def get_content_by_id(
        content_id: int,
        session: AsyncSession = Depends(get_async_session)
) -> Content:
    content = await session.get(Content, content_id)
    if content is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found"
        )
    return content


async def get_video(content: Content = Depends(get_content_by_id)):
    if content.type != content.VIDEO:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Video not found"
        )
    return content
