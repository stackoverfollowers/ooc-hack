from http.client import HTTPException
from typing import List

from fastapi import APIRouter, Depends, Response
from sqlalchemy.ext.asyncio import AsyncSession

from crud.base import CRUDBase
from crud.tasks import tasks_crud
from db.engine import get_async_session
from db.models import Task, User
from dependencies import get_task_by_id, current_active_user
from schemas.task import TaskSchema, TaskCreate, TaskUpdate

router = APIRouter()
crud = CRUDBase(Task)


@router.get("/", response_model=List[TaskSchema])
async def get_tasks(session: AsyncSession = Depends(get_async_session)) -> List[Task]:
    tasks = await tasks_crud.get_multi(db=session)
    return tasks


@router.post("/", response_model=TaskSchema, status_code=201)
async def create_task(task_form: TaskCreate,
                      user: User = Depends(current_active_user),
                      session: AsyncSession = Depends(get_async_session)
                      ) -> Task:
    return await tasks_crud.create_and_check_by_name_and_desk(
        task_form=task_form,
        session=session,
        user=user
    )


@router.get("/{task_id}", response_model=TaskSchema)
async def get_task(task: Task = Depends(get_task_by_id)) -> Task:
    return task


@router.delete("/{task_id}")
async def delete_task(task: Task = Depends(get_task_by_id),
                      session: AsyncSession = Depends(get_async_session)):
    session.delete(task)
    await session.commit()
    return Response(status_code=204)


@router.put("/{task_id}", response_model=TaskSchema)
async def update_task(task_id: int,
                      task: TaskUpdate,
                      session: AsyncSession = Depends(get_async_session)) -> Task:
    db_task = await crud.get(session, pk=task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return await crud.update(session, db_obj=db_task, obj_in=task)
