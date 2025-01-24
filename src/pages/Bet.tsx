import { Button } from "@/components/ui/button";
import { Game } from "@/interfaces/game";
import { useState } from "react";


const Bet = ({ game, onBet }: { game: Game,  onBet: (index: number, betAmount: number) => void; }) => {
    const [Bet, setBet] = useState(40);

    const increaseBet = ()=>{

        if ( Bet + game.bet + game.bet <= game.players[game.currentTurn].chips){
            setBet(Bet+40);
        }
    }

    
    const decreaseBet = ()=>{
        if (Bet - game.bet > 0){
            setBet(Bet-40);
        }
    }

    const BetCallBack = () => {
        
            onBet(game.currentTurn, Bet + game.bet);
            setBet(40);
        
       
    }

    

    return ( 
        <div>
            <div className="flex flex-row gap-3 ${}">
                <Button  onClick={increaseBet} >+</Button>
                <Button  onClick={BetCallBack}>Bet: {Bet}</Button>
                <Button  onClick={decreaseBet}>-</Button>
            </div>
        </div>
        

     );
}
 
export default Bet;