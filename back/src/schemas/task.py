from core.schemas import BaseModel
from datetime import datetime
from enum import Enum


class TaskStatusEnum(str, Enum):
    UNKNOWN = "UNKNOWN"
    IN_PROGRESS = "IN_PROGRESS"
    DONE = "DONE"
    FAILED = "FAILED"
    CANCELLED = "CANCELLED"


class TaskBase(BaseModel):
    target_id: int
    name: str
    description: str
    deadline: datetime
    executor_id: int


class TaskCreate(TaskBase):
    status: TaskStatusEnum | None


class TaskUpdate(TaskCreate):
    ...


class TaskSchema(TaskBase):
    author_id: int
    executor_id: int
    assign_at: datetime
    status: TaskStatusEnum

    class Config:
        orm_mode = True
