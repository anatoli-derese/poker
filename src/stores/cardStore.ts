import { create } from 'zustand';
import { Card } from '@/interfaces/card';
import { useActionState } from 'react';
interface DeckState {
  deck: Card[];
  communityCards: Card[];
  initializeDeck: () => void;
  drawCard: () => Card;
  addToCommunityCards: (card: Card) => void;
}

const generateFullDeck = (): Card[] => {
  const suits: Card['suit'][] = ['h', 'd', 'c', 's'];
  const ranks: Card['rank'][] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  return suits.flatMap((suit) => ranks.map((rank) => ({ suit, rank })));
};

export const useDeckStore = create<DeckState>((set) => ({
  deck: [],
  
  communityCards: [],
  
  initializeDeck: () => set({ deck: generateFullDeck() , communityCards: []}),
  
  drawCard: () => {
    let drawnCard: Card | null = null; 
    set((state) => {
      if (state.deck.length === 0) return state; // Handle empty deck
      const cardIndex = Math.floor(Math.random() * state.deck.length); // Get random index
      const deck = [...state.deck];
      drawnCard = deck[cardIndex]; // Get the card at the random index
      deck.splice(cardIndex, 1); // Remove the card from the deck
      return { deck }; // Update the state with the modified deck
    });  
    return drawnCard!; // Return the drawn card after updating the state
  },

 addToCommunityCards: (card) => set((state) => ({ communityCards: [...state.communityCards, card] })),


}));
