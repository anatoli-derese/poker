import { Card } from "./card";

export interface Player {
    id: number; // Player ID (1 to 6)
    isActive: boolean; // Indicates if the player is active
    isTurn: boolean; // Indicates if it is the player's turn
    special: 'none' | 'dealer' | 'smallblind' | 'bigblind'; // Special role
    chips: number; // Number of chips the player has
    hand : Card[]  // The player's hand
    currentBet: number; // The current bet the player has placed
  }
  