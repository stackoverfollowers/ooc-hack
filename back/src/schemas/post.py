import datetime

from core.schemas import BaseModel


class PostBase(BaseModel):
    id: int | None = None
    title: str | None = None
    description: str | None = None
    user_id: int | None = None
    is_published: bool | None = None
    published_at: datetime.datetime | None
    created_at: datetime.datetime | None
    updated_at: datetime.datetime | None


class PostCreate(BaseModel):
    title: str
    description: str


class PostRead(PostBase):
    id: int
    title: str
    slug: str
    description: str
    is_published: bool


class PostUpdate(BaseModel):
    title: str | None
    description: str | None
    is_published: bool | None


class PostInDBBase(PostBase):
    id: int
    title: str
    slug: str
    user_id: int
    is_published: bool

    class Config:
        orm_mode = True


class Post(PostInDBBase):
    pass
