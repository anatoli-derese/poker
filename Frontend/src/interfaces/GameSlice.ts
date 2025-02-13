import { Game, GameState } from '@/types/game';

export interface GameSlice {
  game: Game;
  initializeGame: (startingChips: number, playerCount: number) => void;
  updateGameState: (newState: GameState) => void;
  updatePot: (amount: number) => void;
  updateCurrentTurn: (playerIndex: number) => void;
} 