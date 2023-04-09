from crud.base import CRUDBase
from db.models import TargetType
from schemas.target_type import TargetTypeCreate, TargetTypeUpdate


class TargetTypesCRUD(CRUDBase[TargetType, TargetTypeCreate, TargetTypeUpdate]):
    ...


target_type_crud = TargetTypesCRUD(TargetType)
