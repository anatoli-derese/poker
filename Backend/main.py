import uuid
from fastapi import FastAPI, Depends, HTTPException
from Database import get_db_connection
from Repository import GameRepository
from Model import GameStory
from calculate_hand import simulateGamePlay
from fastapi.middleware.cors import CORSMiddleware
    
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def get_repo():
    db = await get_db_connection()
    repo = GameRepository(db)
    await repo.create_table()  # Ensure table exists
    yield repo
    await db.close()

@app.post("/save-game/")
async def save_game(game: GameStory, repo: GameRepository = Depends(get_repo)):
    try:
        result = simulateGamePlay(game)
    except Exception as e:
        return HTTPException(status_code=401, detail=str(e))
    game_id = await repo.save_game(game, result)
    return {"message": "Game saved", "id": game_id, "result" : result}

@app.get("/get-games/")
async def get_games(repo: GameRepository = Depends(get_repo)):
    return await repo.get_games()

@app.get("/get-game/{game_id}")
async def get_game(game_id: str, repo: GameRepository = Depends(get_repo)):
    game = await repo.get_game_by_id(game_id)
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")
    return game
