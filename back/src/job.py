import logging
import os

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from sqlalchemy import or_
from sqlalchemy.future import select

from db.engine import get_async_session
from db.models import Content

logger = logging.getLogger(__name__)


async def check_content():
    q = select(Content).filter(or_(Content.target_id.is_(None), Content.task_id.is_(None)))
    async for session in get_async_session():
        data = (await session.execute(q)).scalars().all()
        if not data:
            logger.info("No content found")
            return
        for content in data:
            if os.path.exists(content.path):
                os.remove(content.path)
            await session.delete(content)
            logger.info(f"Content {content.id} with name {content.name} deleted")


scheduler = AsyncIOScheduler()
scheduler.add_job(func=check_content, trigger='interval', hours=1)
