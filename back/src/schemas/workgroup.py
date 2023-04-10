from core.schemas import BaseModel


class WorkgroupBase(BaseModel):
    name: str
    specialists: list[int]
    target_types: list[int]


class WorkgroupCreate(WorkgroupBase):
    ...


class WorkgroupUpdate(WorkgroupBase):
    ...


class WorkgroupSchema(WorkgroupBase):

    class Config:
        orm_mode = True
