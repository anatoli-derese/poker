import { Button } from "@/components/ui/button";
import { Game } from "@/interfaces/game";
import { useState } from "react";


const Raise = ({ game, onRaise }: { game: Game,  onRaise: (index: number, raiseAmount: number) => void; }) => {
    const [raise, setRaise] = useState(40);

    const increaseRaise = ()=>{

        if ( raise + game.bet + game.bet <= game.players[game.currentTurn].chips){
            setRaise(raise+40);
        }
    }

    
    const decreaseRaise = ()=>{
        if (raise - game.bet > 0){
            setRaise(raise-40);
        }
    }

    const raiseCallBack = () => {
        
           onRaise(game.currentTurn, raise + game.bet);
            setRaise(40);
            
    }

    

    return ( 
        <div>
            <div className="flex flex-row gap-3 ${}">
                <Button  onClick={increaseRaise} >+</Button>
                <Button  onClick={raiseCallBack}>Raise: {raise}</Button>
                <Button  onClick={decreaseRaise}>-</Button>
            </div>
        </div>
        

     );
}
 
export default Raise;