import {create} from 'zustand'

interface Counter {
    number: number;
    increment:() => void;
    decrement: () => void;
}

export const useCounterStore = create<Counter>((set) => ({
    number: 0,
    increment: () => set((state) => ({ number: state.number + 1 })),
    decrement: () => set((state) => ({ number: state.number - 1 })),
}));
