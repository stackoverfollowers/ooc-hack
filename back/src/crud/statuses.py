from crud.base import CRUDBase
from db.models import Status
from schemas.status import StatusCreate, StatusUpdate


class StatusesCRUD(CRUDBase[Status, StatusCreate, StatusUpdate]):
    ...


statuses_crud = StatusesCRUD(Status)
