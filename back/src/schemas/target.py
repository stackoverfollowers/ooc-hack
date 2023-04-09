# from typing import List, Optional, Union
#
# from core.schemas import BaseModel
# from schemas.field import FieldSchema
#
#
# class TargetBase(BaseModel):
#     status_id: int
#     target_type_id:
#     work_group_id: int
#     address: str
#     area: str
#     district: str
#     square: Union[float, int]
#
#
# class TargetCreate(TargetBase):
#     fields: Optional[List[FieldSchema]]
#
#
# class TargetUpdate(TargetCreate):
#     ...
#
#
# class TargetSchema(TargetBase):
#     target_type_id: int
#     status_id: int
#
#     class Config:
#         orm_mode = True