import shutil
import uuid
from typing import Annotated
import mimetypes

from fastapi import APIRouter, File, UploadFile, Body, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.responses import FileResponse
from core.config import get_settings
from db.engine import get_async_session
from db.models import Content
from dependencies import get_content_by_id, get_video
from schemas.contents import ContentTypeEnum, ContentOut
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
async def download_file_by_id(content=Depends(get_content_by_id)):
    content_type = mimetypes.guess_type(content.path)[0]
    return FileResponse(content.path, status_code=200, filename=content.name, media_type=content_type)


@router.get("/{content_id}/stream")
async def get_video(request: Request, video: Content = Depends(get_video)):
    content_type = mimetypes.guess_type(video.path)[0]
    return range_requests_response(
        request,
        file_path=video.path,
        content_type=content_type,
    )
