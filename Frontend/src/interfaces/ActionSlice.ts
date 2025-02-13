export interface ActionSlice {
  call: (playerIndex: number, amount: number) => void;
  fold: (playerIndex: number) => void;
  raise: (playerIndex: number, amount: number) => void;
  allIn: (playerIndex: number) => void;
  bet: (playerIndex: number, amount: number) => void;
} 