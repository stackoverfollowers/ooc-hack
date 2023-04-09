from typing import List, Optional, Union

from core.schemas import BaseModel
from schemas.field import FieldSchema
from schemas.section import SectionCreate


class TargetBase(BaseModel):
    name: str
    status_id: int
    target_type_id: int
    address: str
    area: str
    district: str
    square: float


class TargetCreate(TargetBase):
    fields: Optional[List[SectionCreate]]


class TargetUpdate(TargetCreate):
    ...


class TargetSchema(TargetBase):

    fields: list[FieldSchema]

    class Config:
        orm_mode = True
