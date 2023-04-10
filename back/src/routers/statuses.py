from fastapi import APIRouter, Depends, Response
from sqlalchemy.ext.asyncio import AsyncSession

from crud.statuses import statuses_crud
from db.engine import get_async_session
from db.models import Status, User
from dependencies import get_status_by_id, current_active_user
from schemas.status import StatusSchema, StatusCreate, StatusUpdate

router = APIRouter()


@router.get("/", response_model=list[StatusSchema])
async def get_statuses(
        session: AsyncSession = Depends(get_async_session),
        user: User = Depends(current_active_user)
):
    return await statuses_crud.get_multi(session)


@router.post("/", response_model=StatusSchema)
async def create_status(
        status_form: StatusCreate,
        user: User = Depends(current_active_user),
        session: AsyncSession = Depends(get_async_session)
):
    return await statuses_crud.create(session, obj_in=status_form)


@router.put("/{status_id}", response_model=StatusSchema)
async def edit_status(
        status_form: StatusUpdate,
        status: Status = Depends(get_status_by_id),
        user: User = Depends(current_active_user),
        session: AsyncSession = Depends(get_async_session)
):
    return await statuses_crud.update(db=session, db_obj=status, obj_in=status_form)


@router.delete("/{status_id}")
async def delete_status(
        status: Status = Depends(get_status_by_id),
        user: User = Depends(current_active_user),
        session: AsyncSession = Depends(get_async_session)
):
    await statuses_crud.remove(db=session, pk=status.id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
