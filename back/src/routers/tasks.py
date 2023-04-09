from http.client import HTTPException
from typing import List

from fastapi import APIRouter, Depends, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from crud.base import CRUDBase
from db.engine import get_async_session
from db.models import Task, User
from dependencies import get_task_by_id, get_task_by_name_and_desc, current_active_user
from schemas.task import TaskSchema, TaskCreate, TaskUpdate

router = APIRouter()
crud = CRUDBase(Task)


@router.get("/", response_model=List[TaskSchema])
async def get_tasks(session: AsyncSession = Depends(get_async_session)) -> List[Task]:
    tasks = await session.execute(select(Task))
    return tasks.scalars().all()


@router.post("/", response_model=TaskSchema, status_code=201)
async def create_task(task: TaskCreate,
                      user: User = Depends(current_active_user),
                      session: AsyncSession = Depends(get_async_session)
                      ) -> Task:
    db_task = get_task_by_name_and_desc(Task, task.name)
    if db_task:
        raise HTTPException(status_code=400, detail="Task already registered")

    new_task = Task(
        author_id=user.id,
        executor_id=task.executor_id,
        target_id=task.target_id,
        name=task.name,
        description=task.description,
        deadline=task.deadline,
        status=task.status
    )
    session.add(new_task)
    await session.commit()
    return new_task


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
