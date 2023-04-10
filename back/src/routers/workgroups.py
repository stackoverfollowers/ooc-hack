from typing import List

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.ext.asyncio import AsyncSession

from crud.workgroups import wg_crud
from db.engine import get_async_session
from db.models import Workgroup, User
from dependencies import current_active_user, get_workgroup_by_id
from schemas.workgroup import WorkgroupUpdate, WorkgroupCreate, WorkgroupSchema

router = APIRouter()


@router.get("/", response_model=List[WorkgroupSchema])
async def get_workgroups(session: AsyncSession = Depends(get_async_session)) -> List[Workgroup]:
    wgs = await wg_crud.get_multi(db=session)
    return wgs


@router.post("/", response_model=WorkgroupSchema, status_code=201)
async def create_task(wg_form: WorkgroupCreate,
                      user: User = Depends(current_active_user),
                      session: AsyncSession = Depends(get_async_session)
                      ) -> Workgroup:
    return await wg_crud.create_and_check_users_and_tg_types(
        create_form=wg_form,
        session=session,
        user=user
    )


@router.get("/{workgroup_id}", response_model=WorkgroupSchema)
async def get_workgroup(wg: Workgroup = Depends(get_workgroup_by_id)) -> Workgroup:
    return wg


@router.delete("/{workgroup_id}")
async def delete_workgroup(wg: Workgroup = Depends(get_workgroup_by_id),
                      session: AsyncSession = Depends(get_async_session)):
    await session.delete(wg)
    await session.commit()
    return Response(status_code=204)


@router.put("/{workgroup_id}", response_model=WorkgroupSchema)
async def update_workgroup(wg_form: WorkgroupUpdate,
                      wg: Workgroup = Depends(get_workgroup_by_id),
                      session: AsyncSession = Depends(get_async_session)) -> Workgroup:
    if not wg:
        raise HTTPException(status_code=404, detail="Workgroup not found")
    return await wg_crud.update(session, db_obj=wg, obj_in=wg_form)
