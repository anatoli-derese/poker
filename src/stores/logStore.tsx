import {create} from 'zustand';
interface Log{
    logs: String [];
    addToLogs: (log: string) => void;
    clearLogs: ()=> void;
}

// create a log
export const useLogStore = create<Log>((set) => ({
    logs: [],
    addToLogs: (log: string) =>
        set((state) => ({
          logs: [...state.logs, log], 
    })),
    clearLogs: () =>
        set((state) => ({
            logs: [],
        })),
}));
