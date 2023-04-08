from datetime import datetime
from typing import Any

from fastapi_users.db import SQLAlchemyBaseUserTable
from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, String, func
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.orm import Mapped, declared_attr, mapped_column
from sqlalchemy_utils import ChoiceType

from db.base import Base
from db.mixins import IdMixin, TimestampMixin, UserIdMixin


class User(IdMixin, TimestampMixin, SQLAlchemyBaseUserTable[int], Base):
    ADMIN = "ADMIN"
    SPECIALIST = "SPECIALIST"
    TYPES = (
        (ADMIN, ADMIN),
        (SPECIALIST, SPECIALIST),
    )

    type: Mapped[str] = mapped_column(
        ChoiceType(TYPES, impl=String()), default=SPECIALIST, nullable=False
    )

    def __repr__(self):
        return f"<User {self.email}>"


class WorkGroup(IdMixin, Base):
    name: Mapped[str] = mapped_column(String(512), index=True, nullable=False)


class WorkGroupUser(Base, IdMixin, UserIdMixin, TimestampMixin):
    @declared_attr
    def work_group_id(cls) -> Mapped[int]:
        return mapped_column(
            Integer, ForeignKey("work_group.id", ondelete="cascade"), nullable=False
        )


class TargetType(Base, IdMixin):
    name: Mapped[str] = mapped_column(String(512), index=True, nullable=False)


class WorkGroupTargetType(Base, IdMixin):
    @declared_attr
    def work_group_id(cls) -> Mapped[int]:
        return mapped_column(
            Integer, ForeignKey("work_group.id", ondelete="cascade"), nullable=False
        )

    @declared_attr
    def target_type_id(cls) -> Mapped[int]:
        return mapped_column(
            Integer, ForeignKey("target_type.id", ondelete="cascade"), nullable=False
        )


class SectionField(Base, IdMixin):
    name: Mapped[str] = mapped_column(String(512), index=True, nullable=False)


class Field(Base, IdMixin):
    INTEGER, FLOAT, STRING, ARRAY = "INTEGER", "FLOAT", "STRING", "ARRAY"
    TYPES = (
        (INTEGER, INTEGER),
        (FLOAT, FLOAT),
        (STRING, STRING),
        (ARRAY, ARRAY),
    )

    @declared_attr
    def type_id(cls) -> Mapped[int]:
        return mapped_column(
            Integer, ForeignKey("target_type.id", ondelete="cascade"), nullable=False
        )

    @declared_attr
    def section_id(cls) -> Mapped[int]:
        return mapped_column(
            Integer, ForeignKey("section_field.id", ondelete="cascade"), nullable=False
        )

    name: Mapped[str] = mapped_column(String(512), unique=True, index=True)
    is_required: Mapped[bool] = mapped_column(Boolean, default=False)
    field_type: Mapped[int] = mapped_column(
        ChoiceType(TYPES, impl=Integer), default=STRING, index=True
    )
    default_value: Mapped[Any] = mapped_column(JSON, default="")


class Status(Base, IdMixin):
    name: Mapped[str] = mapped_column(String(512), index=True, nullable=False)


class Target(TimestampMixin, UserIdMixin, Base, IdMixin):
    @declared_attr
    def target_type_id(cls) -> Mapped[int]:
        return mapped_column(
            Integer, ForeignKey("target_type.id", ondelete="cascade"), nullable=False
        )

    @declared_attr
    def status_id(cls) -> Mapped[int]:
        return mapped_column(
            Integer, ForeignKey("status.id", ondelete="cascade"), nullable=False
        )

    address: Mapped[str] = mapped_column(String(1024), default="", nullable=False)
    area: Mapped[str] = mapped_column(String(256), default="", nullable=False)  # округ
    district: Mapped[str] = mapped_column(
        String(256), default="", nullable=False
    )  # район
    square: Mapped[float] = mapped_column(Float, default=0, nullable=False)


class TargetField(Base, IdMixin):
    @declared_attr
    def field_id(cls) -> Mapped[int]:
        return mapped_column(
            Integer, ForeignKey("field.id", ondelete="cascade"), nullable=False
        )

    @declared_attr
    def target_id(cls) -> Mapped[int]:
        return mapped_column(
            Integer, ForeignKey("target.id", ondelete="cascade"), nullable=False
        )

    value: Mapped[str] = mapped_column(JSON, default="", nullable=False)


class Task(IdMixin, Base):
    UNKNOWN, IN_PROGRESS, DONE, FAILED, CANCELLED = (
        "UNKNOWN",
        "IN_PROGRESS",
        "DONE",
        "FAILED",
        "CANCELLED",
    )
    STATUSES = (
        (UNKNOWN, UNKNOWN),
        (IN_PROGRESS, IN_PROGRESS),
        (DONE, DONE),
        (FAILED, FAILED),
        (CANCELLED, CANCELLED),
    )

    @declared_attr
    def author_id(cls) -> Mapped[int]:
        return mapped_column(
            Integer,
            ForeignKey("user.id", ondelete="cascade"),
            nullable=False,
        )

    @declared_attr
    def executor_id(cls) -> Mapped[int]:
        return mapped_column(
            Integer,
            ForeignKey("user.id", ondelete="cascade"),
            nullable=False,
        )

    @declared_attr
    def target_id(cls) -> Mapped[int]:
        return mapped_column(
            Integer,
            ForeignKey("target.id", ondelete="cascade"),
            nullable=False,
        )

    name: Mapped[str] = mapped_column(String(512), nullable=False, index=True)
    description: Mapped[str] = mapped_column(String(2048), nullable=False, default="")
    assign_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    deadline: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    status: Mapped[str] = mapped_column(
        ChoiceType(STATUSES, impl=String()), default=UNKNOWN
    )


class Content(Base, IdMixin):
    IMAGE = "IMAGE"
    VIDEO = "VIDEO"
    DOCUMENT = "DOCUMENT"
    TYPES = (
        (IMAGE, IMAGE),
        (VIDEO, VIDEO),
        (DOCUMENT, DOCUMENT),
    )

    @declared_attr
    def target_id(cls) -> Mapped[int]:
        return mapped_column(
            Integer,
            ForeignKey("target.id", ondelete="cascade"),
            nullable=True,
        )

    @declared_attr
    def task_id(cls) -> Mapped[int]:
        return mapped_column(
            Integer,
            ForeignKey("task.id", ondelete="cascade"),
            nullable=True,
        )

    name: Mapped[str] = mapped_column(String(1024), nullable=False)
    path: Mapped[str] = mapped_column(String(2048), nullable=False)
    type: Mapped[str] = mapped_column(ChoiceType(TYPES), default=IMAGE)

    def update_from_dict(self, **kwargs):
        for field, value in kwargs.items():
            if hasattr(self, field):
                setattr(self, field, value)