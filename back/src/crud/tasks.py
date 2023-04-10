from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from crud.base import CRUDBase
from db import User
from db.models import Task
from schemas import TaskCreate
from schemas.task import TaskUpdate
from sqlalchemy import select


class TasksCRUD(CRUDBase[Task, TaskCreate, TaskUpdate]):
    async def create_and_check_by_name_and_desk(
            self,
            task_form: TaskCreate,
            session: AsyncSession,
            user: User
    ) -> Task:
        q = (
            select(Task).where(Task.name == task_form.name)
            .where(Task.description == task_form.description)
            .where(Task.target_id == task_form.target_id)
        )
        task = await session.execute(q)
        if task is not None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Task already exist"
            )
        task = Task(
            author_id=user.id,
            executor_id=task.executor_id,
            target_id=task.target_id,
            name=task.name,
            description=task.description,
            deadline=task.deadline,
            status=task.status
        )
        session.add(task)
        await session.commit()
        await session.refresh(task)
        for content_id in task.contents:
            # TODO: Добавлять контенту task_id
            ...
        await session.commit()
        await session.refresh(task)
        return task


tasks_crud = TasksCRUD(Task)
