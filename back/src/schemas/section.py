# from typing import List
#
# from core.schemas import BaseModel
# from schemas.field import FieldSchema
#
#
# class SectionBase(BaseModel):
#     name: str
#     weight: int | None
#     fields: List[FieldSchema]
#
#     class Config:
#         orm_mode = True
#
# class SectionCreate(SectionBase):
#
#
# class SectionUpdate(SectionBase):
#     name: str
#     weight: int | None
#     fields: List[FieldSchema]
#
#
# class SectionSchema(SectionBase):
#
#     class Config:
#         orm_mode = True