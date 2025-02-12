import asyncpg
import os

DATABASE_URL = "postgresql://anatoli:abc123@localhost:5432/my_db"

async def get_db_connection():
    return await asyncpg.connect(DATABASE_URL)
