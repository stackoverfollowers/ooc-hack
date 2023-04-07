from datetime import datetime

from fastapi_users.db import SQLAlchemyBaseOAuthAccountTable, SQLAlchemyBaseUserTable
from fastapi_users_db_sqlalchemy.access_token import SQLAlchemyBaseAccessTokenTable
from slugify import slugify
from sqlalchemy import Boolean, DateTime, String, event, select
from sqlalchemy.orm import Mapped, Session, mapped_column, relationship

from db.base import Base
from db.mixins import IdMixin, SlugMixin, TimestampMixin, UserIdMixin


class OAuthAccount(
    IdMixin, TimestampMixin, UserIdMixin, SQLAlchemyBaseOAuthAccountTable[int], Base
):
    pass


class User(IdMixin, TimestampMixin, SQLAlchemyBaseUserTable[int], Base):
    oauth_accounts: Mapped[list[OAuthAccount]] = relationship(
        "OAuthAccount",
        lazy="joined",
    )

    def __repr__(self):
        return f"<User {self.email}>"


class AccessToken(UserIdMixin, SQLAlchemyBaseAccessTokenTable[int], Base):
    pass


class Post(TimestampMixin, IdMixin, UserIdMixin, SlugMixin, Base):
    title: Mapped[str] = mapped_column(String(512), index=True, nullable=False)
    description: Mapped[str] = mapped_column(String(512), nullable=False, default="")
    is_published: Mapped[bool] = mapped_column(
        Boolean, default=False, nullable=False, index=True
    )
    published_at: Mapped[datetime] = mapped_column(
        DateTime, default=None, nullable=True
    )
    body: Mapped[str] = mapped_column(String, nullable=False, default="")

    def __repr__(self) -> str:
        return f"<Post {self.title}>"


@event.listens_for(Session, "before_commit")
def receive_before_commit(session: Session):
    new_items = [item for item in session.new if isinstance(item, SlugMixin)]
    dirty_items = [item for item in session.dirty if isinstance(item, SlugMixin)]
    all_items = new_items + dirty_items
    if not all_items:
        return
    slugs_map = {}
    for item in all_items:
        table = item.__table__
        if table not in slugs_map:
            slugs_map[table] = {c[0] for c in session.execute(select(table.c.slug))}
        item_slug = item.slug or ""
        title = getattr(item, item.slug_target_column)
        slug = slugify(title, max_length=120)
        if not item_slug.startswith(slug):
            i = 1
            while slug in slugs_map[table]:
                slug = slugify(title, max_length=120) + "-" + str(i)
                i += 1
            item.slug = slug
            slugs_map[table].add(slug)
