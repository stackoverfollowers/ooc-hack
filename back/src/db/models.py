from __future__ import annotations

from datetime import datetime
from typing import Any

from fastapi_users.db import SQLAlchemyBaseUserTable
from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Table,
    UniqueConstraint,
    func,
)
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.orm import Mapped, declared_attr, mapped_column, relationship
from sqlalchemy_utils import ChoiceType

from db.base import Base
from db.mixins import IdMixin, TimestampMixin, UserIdMixin

workgroup_user = Table(
    "workgroup_user",
    Base.metadata,
    Column("user_id", ForeignKey("user.id"), primary_key=True),
    Column("workgroup_id", ForeignKey("workgroup.id"), primary_key=True),
    UniqueConstraint(
        "user_id", "workgroup_id", name="uq__workgroup_user__user_id_workgroup_id"
    ),
)
workgroup_target_type = Table(
    "workgroup_target_type",
    Base.metadata,
    Column("workgroup_id", ForeignKey("workgroup.id"), primary_key=True),
    Column("target_type_id", ForeignKey("target_type.id"), primary_key=True),
    UniqueConstraint(
        "workgroup_id",
        "target_type_id",
        name="uq__workgroup_target_type__work_group_id_target_type_id",
    ),
)


class User(IdMixin, TimestampMixin, SQLAlchemyBaseUserTable[int], Base):
    ADMIN = "ADMIN"
    SPECIALIST = "SPECIALIST"
    TYPES = (
        (ADMIN, ADMIN),
        (SPECIALIST, SPECIALIST),
    )

    type: Mapped[str] = mapped_column(
        ChoiceType(TYPES, impl=String(64)), default=SPECIALIST, nullable=False
    )

    workgroups: Mapped[list[Workgroup]] = relationship(
        secondary=workgroup_user, back_populates="specialists"
    )

    targets: Mapped[list[Target]] = relationship(back_populates="user")

    def __repr__(self):
        return f"<User {self.email}>"


class Workgroup(IdMixin, Base):
    name: Mapped[str] = mapped_column(String(512), index=True, nullable=False)

    specialists: Mapped[list[User]] = relationship(
        secondary=workgroup_user, back_populates="workgroups"
    )
    target_types: Mapped[list[TargetType]] = relationship(
        secondary=workgroup_target_type,
        back_populates="workgroups",
    )

    def __repr__(self) -> str:
        return f"<WorkGroup '{self.name}'>"


class TargetType(Base, IdMixin):
    name: Mapped[str] = mapped_column(String(512), index=True, nullable=False)

    workgroups: Mapped[list[Workgroup]] = relationship(
        secondary=workgroup_target_type, back_populates="target_types"
    )
    targets: Mapped[list[Target]] = relationship(back_populates="target_type")

    def __repr__(self) -> str:
        return f"<TargetType '{self.name}'>"


class Section(Base, IdMixin):
    name: Mapped[str] = mapped_column(String(512), index=True, nullable=False)
    weight: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    fields: Mapped[list[Field]] = relationship(back_populates="section")

    def __repr__(self) -> str:
        return f"<Section '{self.name}'>"


class Field(Base, IdMixin):
    INTEGER, FLOAT, STRING, ARRAY = "INTEGER", "FLOAT", "STRING", "ARRAY"
    TYPES = (
        (INTEGER, INTEGER),
        (FLOAT, FLOAT),
        (STRING, STRING),
        (ARRAY, ARRAY),
    )

    @declared_attr
    def target_type_id(cls) -> Mapped[int]:
        return mapped_column(
            Integer, ForeignKey("target_type.id", ondelete="cascade"), nullable=False
        )

    @declared_attr
    def section_id(cls) -> Mapped[int]:
        return mapped_column(
<<<<<<< Updated upstream
            Integer, ForeignKey("section.id", ondelete="cascade"), nullable=False
=======
         Integer, ForeignKey("section_field.id", ondelete="cascade"), nullable=False
>>>>>>> Stashed changes
        )

    name: Mapped[str] = mapped_column(String(512), unique=True, index=True)
    is_required: Mapped[bool] = mapped_column(Boolean, default=False)
    field_type: Mapped[int] = mapped_column(
        ChoiceType(TYPES, impl=String(64)), default=STRING, index=True
    )
    default_value: Mapped[Any] = mapped_column(JSON, default="")
    weight: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    section: Mapped[Section] = relationship(back_populates="fields")
    target_type: Mapped[TargetType] = relationship(back_populates="fields")

    def __repr__(self) -> str:
        return f"<Field '{self.name}'>"


class Status(Base, IdMixin):
    name: Mapped[str] = mapped_column(String(512), index=True, nullable=False)

    targets: Mapped[Target] = relationship(back_populates="status")

    def __repr__(self) -> str:
        return f"<Target {self.name}>"


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

    name: Mapped[str] = mapped_column(String(1024), default="", nullable=False)
    address: Mapped[str] = mapped_column(String(1024), default="", nullable=False)
    area: Mapped[str] = mapped_column(String(256), default="", nullable=False)  # округ
    district: Mapped[str] = mapped_column(
        String(256), default="", nullable=False
    )  # район
    square: Mapped[float] = mapped_column(Float, default=0, nullable=False)

    user: Mapped[User] = relationship(back_populates="targets")
    target_type: Mapped[TargetType] = relationship(back_populates="targets")
    status: Mapped[Status] = relationship(back_populates="targets")
    contents: Mapped[list[Content]] = relationship(back_populates="target")

    def __repr__(self) -> str:
        return f"<Target '{self.name}'>"


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

    field: Mapped[Field] = relationship(back_populates="target_fields")
    target: Mapped[Target] = relationship(back_populates="target_fields")


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
        ChoiceType(STATUSES, impl=String(64)), default=UNKNOWN
    )

    author: Mapped[User] = relationship(
        back_populates="authored_tasks", foreign_keys=[author_id]
    )
    executor: Mapped[User] = relationship(
        back_populates="executed_tasks", foreign_keys=[executor_id]
    )
    target: Mapped[Target] = relationship(back_populates="tasks")
    contents: Mapped[list[Content]] = relationship(back_populates="task")


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
            ForeignKey("target.id", ondelete="setnull"),
            nullable=True,
        )

    @declared_attr
    def task_id(cls) -> Mapped[int]:
        return mapped_column(
            Integer,
            ForeignKey("task.id", ondelete="setnull"),
            nullable=True,
        )

    name: Mapped[str] = mapped_column(String(1024), nullable=False)
    path: Mapped[str] = mapped_column(String(2048), nullable=False)
    type: Mapped[str] = mapped_column(ChoiceType(TYPES, impl=String(64)), default=IMAGE)

    target: Mapped[Target | None] = relationship(back_populates="contents")
    task: Mapped[Task | None] = relationship(back_populates="contents")

    def __repr__(self) -> str:
        return f"<Content {self.type} '{self.name}'>"
