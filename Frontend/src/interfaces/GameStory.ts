export interface GameStory {
  big_blind: number;
  player_stacks: number[];
  hands: string[];
  actions: string[];
  setBigBlind: (big_blind: number) => void;
  setPlayerStacks: (player_stacks: number[]) => void;
  addtoHands: (hand: string) => void;
  setActions: (actions: string[]) => void;
  addToAction: (action: string) => void;
} 