export interface Game {
  players: Player[];
  currentTurn: number;
  pot: number;
  state: GameState;
  bet: number;
}

export type GameState = 'pre-flop' | 'flop' | 'turn' | 'river' | 'showdown' | 'initial'; 