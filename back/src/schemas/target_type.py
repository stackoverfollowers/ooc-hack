from pydantic import BaseModel


class TargetTypeBase(BaseModel):
    name: str


class TargetTypeCreate(TargetTypeBase):
    ...


class TargetTypeUpdate(TargetTypeBase):
    ...


class TargetTypeSchema(TargetTypeBase):
    id: int

    class Config:
        orm_mode = True
