export interface GameData {
  big_blind: number;
  player_stacks: number[];
  hands: string[];
  actions: string[];
  error?: string;
}

export interface GameResponse {
  message: string;
  id: string;
  result: number[];
  error?: string;
}

export interface SavedGame extends GameData {
  id: string;
  results: number[];
}

export interface GamesResponse {
  games: SavedGame[];
  error?: string;
} 