# from typing import List
#
# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.ext.asyncio import AsyncSession
#
# from crud.base import CRUDBase
# from db.engine import get_async_session
# from db.models import Target
# from schemas.target import TargetCreate, TargetUpdate
#
# router = APIRouter()
#
# target_crud = CRUDBase(Target)
#
#
# @router.post("/", response_model=Target)
# async def create_target(target_in: TargetCreate,
#                         session: AsyncSession = Depends(get_async_session),
#                         ) -> Target:
#     return await target_crud.create(db=session, obj_in=target_in)
#
#
# @router.get("/", response_model=List[Target])
# async def read_targets(
#         session: AsyncSession = Depends(get_async_session),
# ) -> List[Target]:
#     targets = await target_crud.get_multi(session)
#     return targets
#
#
# @router.get("/{target_id}", response_model=Target)
# async def read_target(target_id: int,
#                       session: AsyncSession = Depends(get_async_session)) -> Target:
#     target = await target_crud.get(db=session, pk=target_id)
#     if not target:
#         raise HTTPException(status_code=404, detail="Target not found")
#     return target
#
#
# @router.put("/{target_id}", response_model=Target)
# async def update_target(target_id: int,
#                         target_in: TargetUpdate,
#                         session: AsyncSession = Depends(get_async_session)) -> Target:
#     target = await target_crud.get(db=session, pk=target_id)
#     if not target:
#         raise HTTPException(status_code=404, detail="Target not found")
#     return await target_crud.update(db=session, db_obj=target, obj_in=target_in)
#
#
# @router.delete("/{target_id}", status_code=204)
# async def delete_target(target_id: int,
#                         session: AsyncSession = Depends(get_async_session)) -> None:
#     target = await target_crud.get(db=session, pk=target_id)
#     if not target:
#         raise HTTPException(status_code=404, detail="Target not found")
#     await target_crud.remove(db=session, pk=target_id)
