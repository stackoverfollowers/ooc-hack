from enum import Enum
from typing import Any

from core.schemas import BaseModel


class FieldTypeEnum(Enum):
    INTEGER, FLOAT, STRING, ARRAY = "INTEGER", "FLOAT", "STRING", "ARRAY"


class FieldBase(BaseModel):
    name: str
    is_required: bool = False
    field_type: FieldTypeEnum
    default_value: Any
    type_id: int
    section_id: int


class FieldCreate(FieldBase):
    ...


class FieldUpdate(FieldBase):
    ...


class FieldSchema(FieldBase):
    id: int
    ...
