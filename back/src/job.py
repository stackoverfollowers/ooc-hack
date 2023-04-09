import logging
import os

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from sqlalchemy import or_
from sqlalchemy.future import select

from db.engine import async_engine
from db.models import Content


logger = logging.getLogger(__name__)


async def check_content():
    q = select(Content).filter(or_(Content.target_id.is_(None), Content.task_id.is_(None)))
    async with async_engine.begin() as conn:
        data = (await conn.execute(q)).scalars().all()
        if not data:
            logger.info("No content found")
            return
        for content in data:
            if os.path.exists(content.path):
                os.remove(content.path)
            await conn.delete(content)
            await conn.commit()
            logger.info("Content %s with name %s deleted", content.id, content.name)


scheduler = AsyncIOScheduler()
scheduler.add_job(func=check_content, trigger="interval", hours=1)
