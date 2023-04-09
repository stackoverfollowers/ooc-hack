from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from crud.statuses import statuses_crud
from db.engine import get_async_session
from db.models import Status
from dependencies import get_status_by_id
from schemas.status import StatusSchema, StatusCreate, StatusUpdate

router = APIRouter()


@router.get("/", response_model=list[StatusSchema])
async def get_statuses(
        session: AsyncSession = Depends(get_async_session),

):
    return await statuses_crud.get_multi(session)


@router.post("/", response_model=StatusSchema)
async def create_status(
        status_form: StatusCreate,
        session: AsyncSession = Depends(get_async_session),

):
    return await statuses_crud.create(session, obj_in=status_form)


@router.put("/{status_id}", response_model=StatusSchema)
async def edit_status(
        status_form: StatusUpdate,
        status: Status = Depends(get_status_by_id),
        session: AsyncSession = Depends(get_async_session)
):
    return await statuses_crud.update(db=session, db_obj=status, obj_in=status_form)