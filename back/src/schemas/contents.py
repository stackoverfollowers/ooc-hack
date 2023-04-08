from enum import Enum

from pydantic import BaseModel


class ContentTypeEnum(Enum):
    IMAGE = "IMAGE"
    VIDEO = "VIDEO"
    DOCUMENT = "DOCUMENT"


class ContentOut(BaseModel):
    id: int
    name: str
    path: str
    type: ContentTypeEnum

    class Config:
        orm_mode = True


class FilteredContents(BaseModel):
    items: list[ContentOut]


class ContentPut(BaseModel):
    name: str
