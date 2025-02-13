import { Card } from './card';

export interface DeckState {
  deck: Card[];
  communityCards: Card[];
  initializeDeck: () => void;
  drawCard: () => Card;
  addToCommunityCards: (card: Card) => void;
} 