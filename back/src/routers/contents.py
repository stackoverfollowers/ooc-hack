import mimetypes
import os.path
import shutil
import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, File, HTTPException, Request, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status
from starlette.responses import FileResponse

from core.config import get_settings
from crud.content import content_crud
from db.engine import get_async_session
from db.models import Content
from dependencies import current_active_user, get_content_by_id, get_video
from routers.utils import range_requests_response
from schemas.contents import ContentOut, ContentPut, ContentTypeEnum

router = APIRouter(dependencies=[Depends(current_active_user)])

settings = get_settings()


@router.post("/", response_model=ContentOut)
async def upload_content(
    file: Annotated[UploadFile, File()],
    session: AsyncSession = Depends(get_async_session),
):
    if file.content_type.startswith("video/"):
        content_type = ContentTypeEnum.VIDEO
        start_path = settings.STATIC_PATH / "videos"
    elif file.content_type.startswith("image/"):
        content_type = ContentTypeEnum.IMAGE
        start_path = settings.STATIC_PATH / "images"
    else:
        content_type = ContentTypeEnum.DOCUMENT
        start_path = settings.STATIC_PATH / "docs"
    file_path = start_path / f"{uuid.uuid4()}_{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    # noinspection PyArgumentList
    content = Content(
        name=file.filename,
        path=str(file_path),
        type=content_type.value,
        task_id=None,
        target_id=None,
    )
    session.add(content)
    await session.commit()
    await session.refresh(content)
    return content


@router.get("/{content_id}/download", response_class=FileResponse)
async def download_file_by_id(content: Content = Depends(get_content_by_id)):
    if content.type != content.DOCUMENT:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Document not found"
        )
    content_type = mimetypes.guess_type(content.path)[0]
    return FileResponse(
        content.path, status_code=200, filename=content.name, media_type=content_type
    )


@router.get("/{content_id}", response_model=ContentOut)
async def get_content_data(content: Content = Depends(get_content_by_id)):
    return content


@router.get("/{content_id}/stream")
async def get_video(request: Request, video: Content = Depends(get_video)):
    content_type = mimetypes.guess_type(video.path)[0]
    return range_requests_response(
        request,
        file_path=video.path,
        content_type=content_type,
    )


@router.delete("/{content_id}")
async def delete_content(
    content: Content = Depends(get_content_by_id),
    session: AsyncSession = Depends(get_async_session),
):
    await session.delete(content)
    if os.path.exists(path=content.path):
        os.remove(path=content.path)
    return {"status": "ok", "message": "Content deleted"}


@router.put("/{content_id}", response_model=ContentOut)
async def edit_content(
    content_in: ContentPut,
    content: Content = Depends(get_content_by_id),
    session: AsyncSession = Depends(get_async_session),
):
    await content_crud.update(db=session, db_obj=content, obj_in=content_in)
    return content
