from typing import List, Optional, Union

from core.schemas import BaseModel
from schemas.field import FieldSchema
from schemas.section import SectionCreate, SectionSchema


class TargetBase(BaseModel):
    name: str
    status_id: int
    target_type_id: int
    address: str
    area: str
    district: str
    square: float


class TargetCreate(TargetBase):
    sections: Optional[List[SectionCreate]]


class TargetUpdate(TargetCreate):
    ...


class TargetSchema(TargetBase):

    # sections: List[SectionSchema]
    # fields: List[FieldSchema]

    class Config:
        orm_mode = True
