from typing import Any

from core.schemas import BaseModel


class FieldBase(BaseModel):
    type_id: int
    section_id: int


class FieldCreate(BaseModel):
    type_id: int
    section_id: int


class FieldUpdate(BaseModel):
    type_id: int
    section_id: int


class FieldSchema(BaseModel):
    name: str
    value: Any
    field_type_id: int
    is_required: bool | None
    default_value: Any | None