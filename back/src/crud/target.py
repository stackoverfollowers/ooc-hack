import json

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from crud.base import CRUDBase
from db import User
from db.models import Target, Status, Section, Field
from schemas.target import TargetCreate, TargetUpdate


class TargetCRUD(CRUDBase[Target, TargetCreate, TargetUpdate]):

    async def create_with_user(self, db: AsyncSession, target_form: TargetCreate, user: User) -> Target:
        sections = target_form.sections
        target = Target(
            name=target_form.name,
            status_id=target_form.status_id,
            target_type_id=target_form.target_type_id,
            address=target_form.address,
            area=target_form.area,
            district=target_form.district,
            square=target_form.square,
            user_id=user.id,

        )
        for _section in sections:
            q = select(Section).filter_by(name=_section.name)
            section = (await db.execute(q)).scalars().first()
            if section is None:
                section = Section(
                    name=_section.name
                )
                db.add(section)
                await db.commit()
                await db.refresh(section)
            res_fields = []

            for _field in _section.fields:
                field = Field(
                    target_type_id=target_form.target_type_id,
                    section_id=section.id,
                    name=_field.name,
                    is_required=_field.is_required,
                    field_type=_field.field_type.value,
                    default_value=_field.default_value
                )

                db.add(field)
                await db.commit()
                await db.refresh(field)
                res_fields.append(field)
        db.add(target)
        await db.commit()
        await db.refresh(target)
        return target


target_crud = TargetCRUD(Target)
