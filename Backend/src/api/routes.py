from fastapi import APIRouter, Depends, HTTPException
from src.repositories.game_repository import GameRepository
from src.services.game_service import GameService
from src.models.game import GameStory
from src.db.database import get_db_connection

router = APIRouter()

async def get_repo():
    db = await get_db_connection()
    repo = GameRepository(db)
    await repo.create_table()
    yield repo
    await db.close()

@router.post("/save-game/")
async def save_game(game: GameStory, repo: GameRepository = Depends(get_repo)):
    try:
        result = GameService.simulate_game_play(game)
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
    
    game_id = await repo.save_game(game, result)
    return {"message": "Game saved", "id": game_id, "result": result, "status_code": 200}

@router.get("/get-games/")
async def get_games(repo: GameRepository = Depends(get_repo)):
    return await repo.get_games()

@router.get("/get-game/{game_id}")
async def get_game(game_id: str, repo: GameRepository = Depends(get_repo)):
    game = await repo.get_game_by_id(game_id)
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")
    return game 