from fastapi import APIRouter, Depends, Response
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from crud.target_types import target_type_crud
from db.engine import get_async_session
from db.models import TargetType
from dependencies import get_target_type_by_id
from schemas.target_type import TargetTypeSchema, TargetTypeCreate, TargetTypeUpdate

router = APIRouter()


@router.get("/", response_model=list[TargetTypeSchema])
async def get_target_types(
        session: AsyncSession = Depends(get_async_session)
):
    return await target_type_crud.get_multi(db=session)


@router.post("/", response_model=TargetTypeSchema)
async def create_target_type(
        target_type_form: TargetTypeCreate,
        session: AsyncSession = Depends(get_async_session)
):
    return await target_type_crud.create(db=session, obj_in=target_type_form)


@router.put("/{target_type_id}", response_model=TargetTypeSchema)
async def edit_target_type(
        target_type_form: TargetTypeUpdate,
        target_type: TargetType = Depends(get_target_type_by_id),
        session: AsyncSession = Depends(get_async_session)
):
    return await target_type_crud.update(db=session, db_obj=target_type, obj_in=target_type_form)


@router.delete("/{target_type_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_target_type(
        target_type: TargetType = Depends(get_target_type_by_id),
        session: AsyncSession = Depends(get_async_session)
):
    await session.delete(target_type)
    await session.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
