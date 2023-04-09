from core.schemas import BaseModel


class StatusBase(BaseModel):
    name: str


class StatusCreate(StatusBase):
    ...


class StatusUpdate(StatusBase):
    ...


class StatusSchema(StatusBase):
    targets:
    class Config:
        orm_mode = True