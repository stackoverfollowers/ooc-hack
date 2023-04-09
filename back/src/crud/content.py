from pydantic import BaseModel

from crud.base import CRUDBase
from db.models import Content
from schemas.contents import ContentPut


class ContentCRUD(CRUDBase[Content, BaseModel, ContentPut]):
    ...


content_crud = ContentCRUD(Content)
