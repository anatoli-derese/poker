from abc import ABC, abstractmethod
import asyncpg

class BaseRepository(ABC):
    def __init__(self, db: asyncpg.Connection):
        self.db = db

    @abstractmethod
    async def create_table(self):
        pass 