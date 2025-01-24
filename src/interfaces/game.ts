import { Player } from "./player";
export interface Game {
  players: Player[]; // List of players in the game
  currentTurn: number; // ID of the player whose turn it is
  pot: number; // Total chips in the pot
  state: 'pre-flop' | 'flop' | 'turn' | 'river' | 'showdown' | 'initial'; // Current state of the game
  bet : number; // Current bet amount
  
}
