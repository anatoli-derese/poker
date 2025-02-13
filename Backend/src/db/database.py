from asyncpg import create_pool
from asyncpg.pool import Pool
from src.core.config import settings

async def get_db_connection() -> Pool:
    return await create_pool(
        user='anatoli',
        password='abc123',
        database='my_db',
        host='db',
        port=5432
    ) 