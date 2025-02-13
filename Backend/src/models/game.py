from pydantic import BaseModel
from typing import List
from uuid import UUID

class GameStory(BaseModel):
    big_blind: int
    player_stacks: List[int]
    hands: List[str]
    actions: List[str]

class GameStoryDB(GameStory):
    id: UUID

class GameStoryResult(BaseModel):
    id: UUID
    big_blind: int
    player_stacks: List[int]
    hands: List[str]
    actions: List[str]
    results: List[int] 