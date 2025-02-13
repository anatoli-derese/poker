import { Game } from './game';

export interface CommunityCardsProps {
  cards: any[];
}

export interface GameResultProps {
  result: number[];
  onClose: () => void;
}

export interface ErrorModalProps {
  error: string;
  onClose: () => void;
  onRestart: () => void;
}

export interface BetProps {
  game: Game;
  onBet: (index: number, betAmount: number) => void;
}

export interface RaiseProps {
  game: Game;
  onRaise: (index: number, raiseAmount: number) => void;
} 