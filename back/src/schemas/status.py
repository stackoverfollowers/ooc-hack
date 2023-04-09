from core.schemas import BaseModel


class StatusBase(BaseModel):
    name: str


class StatusCreate(StatusBase):
    ...


class StatusUpdate(StatusBase):
    ...


class StatusSchema(StatusBase):
    id: int

    class Config:
        orm_mode = True
