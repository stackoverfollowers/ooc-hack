from enum import Enum
from pathlib import Path
from typing import Any

from pydantic import BaseModel, validator


class ContentTypeEnum(Enum):
    IMAGE = "IMAGE"
    VIDEO = "VIDEO"
    DOCUMENT = "DOCUMENT"


class ContentOut(BaseModel):
    id: int
    name: str
    path: str

    @validator("path", pre=True)
    def cut_path(cls, v: str | None, values: dict[str, Any]) -> Any:
        return Path(v).name

    type: ContentTypeEnum

    class Config:
        orm_mode = True


class FilteredContents(BaseModel):
    items: list[ContentOut]


class ContentPut(BaseModel):
    name: str
