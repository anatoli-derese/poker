import asyncpg
import uuid
from Model import GameStoryDB, GameStory, GameStoryResult

class GameRepository:
    def __init__(self, db: asyncpg.Connection):
        self.db = db

    async def create_table(self):
        await self.db.execute("""
            CREATE TABLE IF NOT EXISTS game_story (
            id UUID PRIMARY KEY,
            big_blind INTEGER NOT NULL,
            player_stacks INTEGER[] NOT NULL,
            hands TEXT[] NOT NULL,
            actions TEXT[] NOT NULL,
            results INTEGER[] NOT NULL
        );

        """)

    async def save_game(self, game: GameStory, results) -> str:
        game_id = uuid.uuid4()
        await self.db.execute("""
            INSERT INTO game_story (id, big_blind, player_stacks, hands, actions, results)
            VALUES ($1::UUID, $2, $3, $4, $5, $6)
        """, game_id, game.big_blind, game.player_stacks, game.hands, game.actions, results)
        return game_id

    async def get_games(self):
        rows = await self.db.fetch("SELECT * FROM game_story")
        return [GameStoryResult(**dict(row)) for row in rows]

    async def get_game_by_id(self, game_id: str):
        row = await self.db.fetchrow("SELECT * FROM game_story WHERE id = $1::UUID", game_id)
        return GameStoryResult(**dict(row)) if row else None
