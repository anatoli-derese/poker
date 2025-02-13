interface GameData {
  big_blind: number;
  player_stacks: number[];
  hands: string[];
  actions: string[];
  error?: string;
}

interface GameResponse {
  message: string;
  id: string;
  result: number[];
  error?: string;
}

interface SavedGame extends GameData {
  id: string;
  results: number[];
}

interface GamesResponse {
  games: SavedGame[];
  error?: string;
}

export const saveGame = async (gameData: GameData): Promise<GameResponse> => {
  try {
    const response = await fetch('http://127.0.0.1:8000/save-game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameData),
    });

    const data = await response.json();

    if (!response.ok || data["status_code"] !== 200) {
      return { message: '', id: '', result: [], error: data["detail"] || 'Unexpected error' };
    }

    return data;

  } catch (error) {
    console.error('Error saving game:', error);
    return { message: '', id: '', result: [], error: (error as Error).message };
  }
};

export const fetchSavedGames = async (): Promise<GamesResponse> => {
  try {
    const response = await fetch('http://127.0.0.1:8000/get-games', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (!response.ok) {
      return { games: [], error: data.detail || 'Failed to fetch games' };
    }
    return { games: Array.isArray(data) ? data : [] };

  } catch (error) {
    console.error('Error fetching games:', error);
    return { games: [], error: (error as Error).message };
  }
};
