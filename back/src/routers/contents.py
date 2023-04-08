import os.path
import shutil
import uuid
from typing import Annotated
import mimetypes

from fastapi import APIRouter, File, UploadFile, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.responses import FileResponse
from core.config import get_settings
from db.engine import get_async_session
from db.models import Content
from dependencies import get_content_by_id, get_video, get_target_contacts_by_id, get_task_contacts_by_id
from schemas.contents import ContentTypeEnum, ContentOut, ContentPut, FilteredContents
from utils import range_requests_response

router = APIRouter()

settings = get_settings()


@router.post("/", response_model=ContentOut)
async def upload_content(
        file: Annotated[UploadFile, File()],
        session: AsyncSession = Depends(get_async_session)
):
    file_path = settings.STATIC_PATH / f"{uuid.uuid4()}_{file.filename}"
    if file.content_type.startswith("video/"):
        content_type = ContentTypeEnum.VIDEO
    elif file.content_type.startswith("image/"):
        content_type = ContentTypeEnum.IMAGE
    else:
        content_type = ContentTypeEnum.DOCUMENT

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    # noinspection PyArgumentList
    content = Content(
        name=file.filename,
        path=str(file_path),
        type=content_type.value,
        task_id=None,
        target_id=None
    )
    session.add(content)
    await session.commit()
    await session.refresh(content)
    return content


@router.get("/{content_id}")
async def download_file_by_id(content: Content = Depends(get_content_by_id)):
    content_type = mimetypes.guess_type(content.path)[0]
    return FileResponse(content.path, status_code=200, filename=content.name, media_type=content_type)


@router.get("/{content_id}/data", response_model=ContentOut)
async def get_content_data(content: Content = Depends(get_content_by_id)):
    return content


@router.get("/target/{target_id}/", response_model=FilteredContents)
async def get_target_contents(contents: list[Content] = Depends(get_target_contacts_by_id)):
    return contents


@router.get("/task/{task_id}/", response_model=FilteredContents)
async def get_task_contents(contents: list[Content] = Depends(get_task_contacts_by_id)):
    return contents


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
        session: AsyncSession = Depends(get_async_session)
):
    await session.delete(content)
    if os.path.exists(path=content.path):
        os.remove(path=content.path)
    return {"status": "ok", "message": "Content deleted"}


@router.put("/{content_id}", response_model=ContentOut)
async def edit_content(
        file_data: ContentPut,
        content: Content = Depends(get_content_by_id),
        session: AsyncSession = Depends(get_async_session),
):
    content.update_from_dict(**file_data.dict())
    session.add(content)
    await session.commit()
    return content
