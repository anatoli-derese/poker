import {create} from 'zustand';
interface GameStory{
    big_blind:number;
    player_stacks : number[];
    hands : string[];
    actions : string[];
    setBigBlind: (big_blind: number) => void;
    setPlayerStacks: (player_stacks: number[]) => void;
    addtoHands: (hand: string) => void;
    setActions: (actions: string[]) => void;
    addToAction: (action: string) => void;
    
}

// create a log
export const useGameStoryStore = create<GameStory>((set) => ({
    big_blind: 40,
    player_stacks: [],
    hands: [],
    actions: [],
    
    setBigBlind: (big_blind: number) =>
        set((state) => ({
          big_blind: big_blind, 
    })),
    
    setPlayerStacks: (player_stacks: number[]) =>
        set((state) => ({
          player_stacks: player_stacks, 
    })),

    // implement addtoHands
    addtoHands: (hand: string) =>
        set((state) => ({
          hands: [...state.hands, hand], 
    })),
    setActions: (actions: string[]) =>
        set((state) => ({
          actions: actions, 
    })),
    addToAction : (action: string) => 
        set((state) => ({
            actions: [...state.actions, action],
        })), 
}));
