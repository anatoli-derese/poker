import { useGameplayStore } from "@/stores/gamePlay";
import { useDeckStore } from "@/stores/cardStore";
import CardComponent from "./CardComponent";
import GameWindow from "./GameWindow";
import StartGame from "./StartGame";
import { LogsWindow } from "./LogsWindow";
import { useGameStoryStore } from "@/stores/storyStore";

export default function Home() {
  const {game,  flop,  turn, river, } = useGameplayStore()
  const {communityCards, } = useDeckStore()
  const {hands, actions,big_blind, player_stacks } = useGameStoryStore()
  let roundEnded = false;

  if (game.players.length > 0 && game.players.length > game.currentTurn){
    if (game.bet == game.players[game.currentTurn].currentBet && game.bet > 0) {
      console.log("Round Ended");
      roundEnded = true;
      if (game.state === 'pre-flop') {
        flop();
      }
      if (game.state === 'flop') {
        turn();
      }
      if (game.state === 'turn') {
        river();

      }
      if (game.state == 'river') {
        console.log("Showdown");

        const gameObject = {
          big_blind,
          player_stacks,
          hands,
          actions
        };
        // Download the game log
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(gameObject)], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "game-log.json";
      document.body.appendChild(element); // Required for this to work in  FireFox
        element.click();

    


              }
            }
          }
          
        
        
 
  if (roundEnded){
  }

  return (
    <div className="flex flex-col gap-8 justify-center items-center p-6">
      <StartGame />
      <div className="flex flex-row gap-2">
        {communityCards.length > 0 &&
          communityCards.map((card, index) => (
            <CardComponent key={index} card={card} />
          ))}
      </div>
      <div className="w-full flex flex-col gap-4 justify-center items-center">
        <GameWindow />
        <LogsWindow />
      </div>
    </div>
  );

}


