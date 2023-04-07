from datetime import datetime

from sqlalchemy import BigInteger, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, declarative_mixin, declared_attr, mapped_column


@declarative_mixin
class IdMixin:
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)


@declarative_mixin
class UserIdMixin:
    @declared_attr
    def user_id(cls) -> Mapped[int]:
        return mapped_column(
            Integer, ForeignKey("user.id", ondelete="cascade"), nullable=False
        )


@declarative_mixin
class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=func.now(),
        server_onupdate=func.now(),
        onupdate=datetime.now,
    )


@declarative_mixin
class SlugMixin:
    slug_target_column = "title"
    slug: Mapped[str] = mapped_column(
        String(128), unique=True, nullable=False, index=True
    )
