from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Path, status
from fastapi_pagination import Page
from fastapi_pagination.ext.async_sqlalchemy import paginate
from sqlalchemy import desc, or_, select
from sqlalchemy.ext.asyncio import AsyncSession

import crud
import schemas
from db import User
from db.engine import get_async_session
from db.models import Post
from dependencies import current_active_user, get_post_as_owner, optional_current_user

router = APIRouter()


@router.post("/", response_model=schemas.Post, status_code=status.HTTP_201_CREATED)
async def create_post(
    *,
    db: AsyncSession = Depends(get_async_session),
    post_in: schemas.PostCreate,
    current_user: User = Depends(current_active_user),
) -> Any:
    """Create new Post"""
    post = await crud.post.create_with_user(db, obj_in=post_in, user_id=current_user.id)
    return post


@router.get("/", response_model=Page[schemas.Post])
async def get_posts(
    *,
    db: AsyncSession = Depends(get_async_session),
    user: User | None = Depends(optional_current_user),
) -> Any:
    """Return list of posts"""
    q = select(Post)
    if user is None:
        q = q.filter_by(is_published=True)
    elif not user.is_superuser:
        q = q.filter(or_(Post.is_published == True, Post.user_id == user.id))
    return await paginate(
        db, q.order_by(desc(Post.published_at), desc(Post.created_at))
    )


@router.get("/{post_id_or_slug}", response_model=schemas.Post)
async def get_post_by_id_or_slug(
    post_id_or_slug: str = Path(title="Slug or ID of post title"),
    *,
    db: AsyncSession = Depends(get_async_session),
    user: User | None = Depends(optional_current_user),
) -> Any:
    """Return post by slug"""
    post = await crud.post.get_by_id_or_slug(
        db,
        post_id_or_slug=post_id_or_slug,
        user_id=user.id if user else None,
        is_superuser=user.is_superuser if user else None,
    )
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found"
        )
    return post


@router.patch("/{post_id}", response_model=schemas.Post)
async def update_post(
    *,
    db: AsyncSession = Depends(get_async_session),
    post_in: schemas.PostUpdate,
    post: Post = Depends(get_post_as_owner),
) -> Any:
    """Update post"""
    await crud.post.update(db=db, db_obj=post, obj_in=post_in)
    return post


@router.delete("{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(
    *,
    db: AsyncSession = Depends(get_async_session),
    post: Post = Depends(get_post_as_owner),
) -> None:
    """Delete post"""
    await crud.post.remove(db=db, pk=post.id)
    return
