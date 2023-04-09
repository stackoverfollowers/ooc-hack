from typing import List, Optional, Union

from core.schemas import BaseModel
from schemas.field import FieldSchema, FieldCreate


class TargetBase(BaseModel):
    name: str
    status_id: int
    target_type_id: int
    address: str
    area: str
    district: str
    square: float


class TargetCreate(TargetBase):
    fields: Optional[List[FieldCreate]]


class TargetUpdate(TargetCreate):
    ...


class TargetSchema(TargetBase):
    target_type_id: int
    status_id: int

    class Config:
        orm_mode = True
