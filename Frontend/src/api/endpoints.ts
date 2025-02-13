export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export const ENDPOINTS = {
  SAVE_GAME: `${API_BASE_URL}/save-game`,
  GET_GAMES: `${API_BASE_URL}/get-games`,
} as const; 