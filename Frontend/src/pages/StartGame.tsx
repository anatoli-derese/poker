
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGameplayStore } from "@/stores/gamePlay";

export default function StartGame() {
  const {initializeGame, game} = useGameplayStore()
  const [chips, setChips] = useState(1000);

  const increaseChips = () => setChips(chips + 100);
  const decreaseChips = () => chips > 100 && setChips(chips - 100);

  return (
    <div className="flex flex-row items-center gap-3">
      <Button onClick={decreaseChips} className="px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">-</Button>
      <span className="text-xl font-bold text-gray-700">{chips}</span>
      <Button onClick={increaseChips} className="px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">+</Button>
      <Button
        onClick={() => initializeGame(chips, 0)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {game.state === "initial" ? "Start Game" : "Restart Game"}
      </Button>
    </div>
  );
}
