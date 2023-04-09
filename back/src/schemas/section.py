from typing import List

from core.schemas import BaseModel
from schemas.field import FieldSchema, FieldCreate, FieldCreateTarget


class SectionBase(BaseModel):
    name: str
    fields: List[FieldCreate]


class SectionCreate(SectionBase):
    fields: List[FieldCreateTarget]


class SectionUpdate(SectionBase):
    ...


class SectionSchema(SectionBase):
    fields: List[FieldCreate]

    class Config:
        orm_mode = True
