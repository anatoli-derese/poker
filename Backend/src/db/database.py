import asyncpg
from core.config import settings

async def get_db_connection():
    return await asyncpg.connect(settings.DATABASE_URL) 