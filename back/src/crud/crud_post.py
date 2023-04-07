from fastapi.encoders import jsonable_encoder
from sqlalchemy import or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from crud.base import CRUDBase
from db.models import Post
from schemas.post import PostCreate, PostUpdate


class CRUDPost(CRUDBase[Post, PostCreate, PostUpdate]):
    async def create_with_user(
        self, db: AsyncSession, *, obj_in: PostCreate, user_id: int
    ) -> Post:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data, user_id=user_id)
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def get_by_id_or_slug(
        self,
        db: AsyncSession,
        *,
        post_id_or_slug: str,
        user_id: int | None,
        is_superuser: bool | None
    ) -> Post | None:
        cond = Post.slug == post_id_or_slug
        if post_id_or_slug.isdigit():
            cond = or_(Post.slug == post_id_or_slug, Post.id == int(post_id_or_slug))
        q = select(Post).filter(cond)
        if user_id is None:
            q = q.filter_by(is_published=True)
        elif not is_superuser:
            q = q.filter(or_(Post.is_published == True, Post.user_id == user_id))
        result = await db.execute(q)
        return result.scalars().first()


post = CRUDPost(Post)
