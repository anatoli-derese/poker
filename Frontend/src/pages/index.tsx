import { useGameplayStore } from "@/stores/gamePlay";
import { useDeckStore } from "@/stores/cardStore";
import CardComponent from "./CardComponent";
import GameWindow from "./GameWindow";
import StartGame from "./StartGame";
import { LogsWindow } from "./LogsWindow";
import { useGameStoryStore } from "@/stores/storyStore";
import { useState, useEffect } from 'react';
import { saveGame } from '@/services/gameService';
import GameResult from '@/components/GameResult';
import ErrorModal from '@/components/ErrorModal';
import SavedGames from '@/components/SavedGames';

export default function Home() {
  const { game, flop, turn, river } = useGameplayStore();
  const { communityCards } = useDeckStore();
  const { hands, actions, big_blind, player_stacks } = useGameStoryStore();
  const [gameResult, setGameResult] = useState<number[] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle round transitions
  useEffect(() => {
    const allPlayersBetEqual = game.players.every(
      player => player.currentBet === game.bet
    );
    console.log("All players bet equal:", allPlayersBetEqual);

    if (game.players.length > 0 && allPlayersBetEqual && game.bet > 0 ) {
      if (game.state === 'pre-flop') {
        flop();
      } else if (game.state === 'flop') {
        turn();
      } else if (game.state === 'turn') {
        river();
      }
      
    }
  }, [game.state, game.bet, game.players]);

  // Handle game completion separately
  useEffect(() => {
    const allPlayersBetEqual = game.players.every(player => 
      player.currentBet === game.bet
    );
    
    if (game.state === 'river' && allPlayersBetEqual && !isProcessing && game.bet > 0  ) {
      setIsProcessing(true);
     
      (async () => {
        console.log("Game complete, saving game state:", game);
        const gameObject = {
          big_blind,
          player_stacks,
          hands,
          actions,
        };
        try {
          const response = await saveGame(gameObject);
          console.log(response)
          if (response.error) {
            throw new Error(response.error);
          }
          setGameResult(response.result);
        } catch (error) {
          const errorMessage = (error as Error).message;
          setError(`Failed to save game: ${errorMessage}`);
          console.error('Failed to save game:', errorMessage);
        } finally {
          setIsProcessing(false);
        }

      })();
    }
  }, [game.players, game.bet, game.state]);

  const handleRestart = () => {
    setError(null);
    setGameResult(null);
    window.location.reload();
  };

  return (
    <div className="flex gap-4 p-4 h-screen bg-slate-900">
      <div className="w-1/2 flex flex-col gap-4 bg-slate-800 rounded-lg p-4">
        <StartGame />
        <div className="flex flex-row gap-2 justify-center">
          {communityCards.length > 0 &&
            communityCards.map((card, index) => (
              <CardComponent key={index} card={card} />
            ))}
        </div>
        <div className="w-full flex flex-col gap-4">
          <GameWindow />
          <LogsWindow />
        </div>
        
        {gameResult && (
          <GameResult 
            result={gameResult} 
            onClose={() => setGameResult(null)} 
          />
        )}

        {error && (
          <ErrorModal 
            error={error}
            onClose={() => setError(null)}
            onRestart={handleRestart}
          />
        )}
      </div>
      <div className="w-1/2 h-full">
        <SavedGames />
      </div>
    </div>
  );
}


