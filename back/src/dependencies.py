from fastapi import Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.user_manager import fastapi_users

from crud.statuses import statuses_crud
from crud.target_types import target_type_crud
from crud.tasks import tasks_crud
from crud.workgroups import wg_crud
from crud.content import content_crud
from db.engine import get_async_session
from db.models import Task, Status, Workgroup, Content


current_active_user = fastapi_users.current_user(active=True)
current_super_user = fastapi_users.current_user(superuser=True)

optional_current_user = fastapi_users.current_user(optional=True, active=True)


async def get_target_by_id(task_id: int, session: AsyncSession = Depends(get_async_session)) -> Task:
    task = await session.get(Task, task_id)
    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task not found!"
        )
    return task


async def get_task_by_id(task_id: int, session: AsyncSession = Depends(get_async_session)) -> Task:
    task = await tasks_crud.get(db=session, pk=task_id)
    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task not found!"
        )
    return task


async def get_status_by_id(status_id: int, session: AsyncSession = Depends(get_async_session)) -> Status:
    db_status = await statuses_crud.get(session, status_id)
    if db_status is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Status not found"
        )
    return db_status


async def get_target_type_by_id(target_type_id: int, session: AsyncSession = Depends(get_async_session)) -> Status:
    target_type = await target_type_crud.get(session, target_type_id)
    if target_type is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Target type not found"
        )
    return target_type


async def get_workgroup_by_id(workgroup_id: int, session: AsyncSession = Depends(get_async_session)) -> Workgroup:
    workgroup = await wg_crud.get(session, workgroup_id)
    if workgroup is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Workgroup not found"
        )
    return workgroup

async def get_content_by_id(
    content_id: int, session: AsyncSession = Depends(get_async_session)
) -> Content:
    content = await content_crud.get(session, content_id)
    if content is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="File not found"
        )
    return content


async def get_video(content: Content = Depends(get_content_by_id)):
    if content.type != content.VIDEO:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Video not found"
        )
    return content

