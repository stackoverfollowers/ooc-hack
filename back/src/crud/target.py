from crud.base import CRUDBase
from db.models import Target
from schemas.target import TargetCreate, TargetUpdate


class TargetCRUD(CRUDBase[Target, TargetCreate, TargetUpdate]):
    ...


target_crud = TargetCRUD(Target)
