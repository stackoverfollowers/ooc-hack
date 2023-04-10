from crud.base import CRUDBase
from db.models import Field
from schemas.field import FieldCreate, FieldUpdate


class FieldsCRUD(CRUDBase[Field, FieldCreate, FieldUpdate]):
    ...


fields_crud = FieldsCRUD(Field)
