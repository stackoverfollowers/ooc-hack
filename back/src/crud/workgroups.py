from fastapi import HTTPException

from crud.base import CRUDBase
from db.models import Workgroup, User, TargetType
from schemas.workgroup import WorkgroupCreate, WorkgroupUpdate
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select


class WorkgroupCRUD(CRUDBase[Workgroup, WorkgroupCreate, WorkgroupUpdate]):
    async def create_and_check_users_and_tg_types(
            self,
            create_form: WorkgroupCreate,
            session: AsyncSession,
            user: User
    ) -> Workgroup:
        q = (
            select(Workgroup).where(Workgroup.name == create_form.name)
        )
        wg = await session.execute(q)
        if wg is not None:
            raise HTTPException(
                status_code=400, detail="Workgroup already exist"
            )
        for _id in create_form.specialists:
            spec_in_db = session.get(User, _id)
            if spec_in_db is None:
                raise HTTPException(404, detail="Specialist not found")

        for _id in create_form.target_types:
            target_type = session.get(TargetType, _id)
            if target_type is None:
                raise HTTPException(status_code=404, detail="Target type not found")

        session.add(wg)
        await session.commit()
        await session.refresh(wg)
        for user_id in create_form.specialists:
            # TODO: Добавлять user'у рабочую группу
            ...
        for tg_type_id in create_form.target_types:
            # TODO: Добавлять user'у рабочую группу
            ...
        await session.commit()
        await session.refresh(wg)
        return wg


wg_crud = WorkgroupCRUD(Workgroup)
