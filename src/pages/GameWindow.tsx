import { Button } from "@/components/ui/button";
import { useGameplayStore } from "@/stores/gamePlay";
import Raise from "./Raise";
import Bet from "./Bet";
import CardComponent from "./CardComponent";

const GameWindow = () => {
  const {game,  call,raise, fold ,bet , allIn} = useGameplayStore()
  const currentBet = game.bet;
  const player = game.players[game.currentTurn]; 
  if( player  === undefined) {
    return <></>
  }

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-4">
        Player {player.id}'s Turn
      </h2>
      <p className="text-lg font-medium text-gray-100 mb-2">
        <span className="font-bold text-gray-200">Current Bet:</span> {player.currentBet} 
      </p>
      <p className="text-lg font-medium text-gray-100 mb-6">
        <span className="font-bold text-gray-200">Round's Bet:</span> {game.bet} 
      </p>
      <p className="text-lg font-medium text-gray-100 mb-6">
        <span className="font-bold text-gray-200">You have:</span> {player.chips} 
      </p>
  
      <div className="flex flex-row gap-4 mb-6">
        {player.hand.length > 0 &&
          player.hand.map((card, index) => <CardComponent key={index} card={card} />)}
      </div>
  
      <div className="p-4 ">
        <ul className="flex flex-wrap gap-4 justify-center">
          {currentBet > 0 && (
            <Button
              onClick={() => call(game.currentTurn, game.bet)}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-200"
            >
              Call
            </Button>
          )}
          {currentBet === 0 && game.state !== "initial" && (
            <Button
              onClick={() => call(game.currentTurn, game.bet)}
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition duration-200"
            >
              Check
            </Button>
          )}
          <Button
            onClick={() => fold(game.currentTurn)}
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition duration-200"
          >
            Fold
          </Button>
          {currentBet > 0 && (
            <Raise
              game={game}
              onRaise={raise}
            />
          )}
          {currentBet === 0 && game.state !== "initial" && (
            <Bet
              game={game}
              onBet={bet}
            />
          )}
          {currentBet > 0 && (
            <Button
              onClick={() => allIn(game.currentTurn)}
              className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow hover:bg-purple-600 transition duration-200"
            >
              All In
            </Button>
          )}
        </ul>
      </div>
    </div>
  );
  
}
 
export default GameWindow;