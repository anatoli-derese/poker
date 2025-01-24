import { create } from 'zustand';
import { Game } from '@/interfaces/game';
import { Player } from '@/interfaces/player';
import { useDeckStore } from './cardStore';
import { use } from 'react';
import { useLogStore } from './logStore';
import { clearAllModuleContexts } from 'next/dist/server/lib/render-server';


interface GameplayState {
  game: Game;
  
  initializeGame: (stack: number, startFrom: number) => void; // if startFrom is not provided, it defaults to 0
  startDealing: (bigBlindNumber: number) => void;
  call: (playerIndex : number, amount : number) => void;
  raise : (playerIndex : number, amount : number) => void;
  fold: (playerIndex : number) => void;
  nextPlayer : (playerIndex : number) => void;
  flop: () => void;
  bet : (playerIndex : number, amount : number) => void
  turn : () => void
  river: () => void
  allIn : (playerIndex : number) => void

}



export const useGameplayStore = create<GameplayState>((set) => ({
  game: {
    players: [],
    pot: 0,
    currentTurn: 0,
    state: 'initial',
    bet : 0
  },

  nextPlayer : (playerIndex: number) => {
    const { game } = useGameplayStore.getState();
    const players = game.players;
    let nextPlayer = (playerIndex + 1) % game.players.length;
    while (players[nextPlayer].isActive == false) {
      nextPlayer = (nextPlayer + 1) % game.players.length;
    }
    set({
      game: {
        ...game,
        currentTurn : nextPlayer,
      },
    });

  },
  initializeGame: (stack, startFrom = 0) => {
    // Create an array of game.players.length players with the given stack
    const {initializeDeck} = useDeckStore.getState();
    const {addToLogs, clearLogs} = useLogStore.getState();
    initializeDeck();
    clearLogs();
    const players: Player[] = Array.from({ length: 6 }, (_, index) => ({
      id: index + 1,
      isActive: true,
      isTurn: false,
      special: 'none',
      chips: stack,
      hand: [],
      currentBet: 0,
    }));

    // Assign special roles to the first three players
    const dealer = startFrom % 6;
    const smallBlind = (startFrom + 1) % 6;
    const bigBlind = (startFrom + 2) % 6;
    

    players[dealer].special = 'dealer';
    players[smallBlind ].special = 'smallblind';
    players[bigBlind].special = 'bigblind';

    set({
      game: {
        bet : 0,
        state: 'initial',
        players,
        pot: 0, // Initialize pot to 0
        currentTurn: 0, // Initialize current turn to 0
      },
    });

    const {startDealing} = useGameplayStore.getState()
    addToLogs(`Game Initialized with a stack of ${stack} chips`)

    startDealing(40);
  },

  startDealing : (bigBlindNumber = 40) => {
    const {  drawCard, initializeDeck } = useDeckStore.getState(); // Access deck state
    const { game,  } = useGameplayStore.getState(); // Access game state
    const {addToLogs} = useLogStore.getState();
    initializeDeck();
    const playersWithHands = game.players.map((player) => {
      const cardOne = drawCard();
      const cardTwo = drawCard();
      addToLogs(`Player ${player.id} is dealt card ${cardOne.rank + cardOne.suit} and card ${cardTwo.rank + cardTwo.suit}`);
      return {
        ...player,
        hand: [cardOne, cardTwo], 
      };
    });

    let nextPlayer  = 0;
    const updatedPlayers = playersWithHands.map((player, index) => {
      const smallBlindNumber = bigBlindNumber/2;

      if (player.special === 'smallblind') {
        player.chips -= smallBlindNumber;
        player.currentBet = smallBlindNumber;
        addToLogs(`Player ${player.id} posts small blind of ${smallBlindNumber}`);
      }
      if (player.special === 'bigblind') {
        player.chips -= bigBlindNumber;
        nextPlayer = (index + 1) % game.players.length;
        player.currentBet = bigBlindNumber;
        addToLogs(`Player ${player.id} posts big blind of ${bigBlindNumber}`);
      }
      return player;
    });
    set({
      game: {
        ...game,
        bet : bigBlindNumber,
        players : updatedPlayers,
        state : 'pre-flop',
        pot: bigBlindNumber , // Add small blind and big blind to the pot
        currentTurn: nextPlayer, // Start first round of the game
      },
    });
  },
  allIn: (playerIndex: number) => {
    const { game } = useGameplayStore.getState();
    const {addToLogs} = useLogStore.getState();

    const players = game.players;

    const player = players[playerIndex];
    const allInAmount = player.chips;
    player.chips = 0;
    player.currentBet = allInAmount;
    set({
      game: {
        ...game,
        players : players,
        pot : game.pot + allInAmount,
        currentTurn : (playerIndex + 1) % game.players.length,
        bet : allInAmount,
      }});

    addToLogs(`Player ${player.id} goes all in with ${allInAmount} chips`);

  },

  call : (playerIndex, amount) => {
    const { game,  } = useGameplayStore.getState(); // Access game state
    const {addToLogs} = useLogStore.getState();
    const players = game.players;
    const player = players[playerIndex];
    const updatedPlayers = players.map((player, index) => {
      if (index === playerIndex) {
        player.chips -= (amount - player.currentBet);
        player.currentBet = amount;
      }
      return player;
    });
    set({
      game: {
        ...game,
        players : updatedPlayers,
        pot : game.pot + amount,
        currentTurn : (playerIndex + 1) % game.players.length,
        bet : amount,
      },
    });
    addToLogs(`Player ${player.id} calls with ${amount} chips`);
  
  },
  raise : (playerIndex, amount)  => {
    const {game} = useGameplayStore.getState();
    const {addToLogs} = useLogStore.getState();
    const players = game.players;
    const player = players[playerIndex];
    player.chips -= (amount - player.currentBet);
    player.currentBet = amount;
    set({
      game: {
        ...game,
        players : players,
        pot : game.pot + amount,
        currentTurn : (playerIndex + 1) % game.players.length,
        bet : amount,
      },
    });
    addToLogs(`Player ${player.id} raises to ${amount} chips`);


  }
  ,

  fold: (playerIndex: number) => {
    const { game } = useGameplayStore.getState();
    const {addToLogs} = useLogStore.getState();
    const foldingPlayer = game.players[playerIndex];
    let currentIndex = playerIndex;
    if (playerIndex + 1 === game.players.length) { // if its the last one
      currentIndex = 0;
    }
    const players = game.players.filter((_, index) => index !== playerIndex);
    set({
      game: {
        ...game,
        currentTurn: currentIndex,
        players,
      },
    });
    addToLogs(`Player ${foldingPlayer.id} folds`);
  },

  flop : () => {
    const { game } = useGameplayStore.getState();
    const{addToLogs} = useLogStore.getState();  
    addToLogs("***FLOP***");
    const { drawCard } = useDeckStore.getState();
    const communityCards = [drawCard(), drawCard(), drawCard()];
    for (let i=0 ; i < communityCards.length; i++){
      useDeckStore.getState().addToCommunityCards(communityCards[i]);
      addToLogs( `Community Card ${communityCards[i].rank + communityCards[i].suit} is dealt`);
    }
    const players = game.players.map((player) => {player.currentBet = 0; return player;});
    const nextPlayer = 0;
    set({
      game: {
        ...game,
        bet: 0,
        state: 'flop',
        currentTurn: nextPlayer
      },
    });
  }  ,


  bet: (playerIndex: number, amount: number) =>{
    const { game } = useGameplayStore.getState();
    const {addToLogs} = useLogStore.getState();

    const players = game.players;
    const player = players[playerIndex];
    player.chips -= amount;
    player.currentBet = amount;

    set({
      game: {
        ...game,
        players : players,
        pot : game.pot + amount,
        currentTurn : (playerIndex + 1) % game.players.length,
        bet : amount,
      },
    });
    addToLogs(`Player ${player.id} bets with ${amount} chips`);
  }
,
  turn : () =>{

    const {game} = useGameplayStore.getState()
    const {addToLogs} = useLogStore.getState();  
    addToLogs("***TURN***")
    const {drawCard, addToCommunityCards} = useDeckStore.getState()
    const fourthCard = drawCard()
    addToCommunityCards(fourthCard);
    addToLogs(`Community Card ${fourthCard.rank + fourthCard.suit} is dealt`);
    const players = game.players;
    players.map((player) => {player.currentBet = 0 ;return player})
    set({
      game: {
        ...game,
        bet: 0,
        state: 'turn',
        currentTurn: 0
      },
    });
  },

  river :() =>{
    const {game} = useGameplayStore.getState()
    const {addToLogs} = useLogStore.getState();
    addToLogs("***RIVER***")

    const {drawCard, addToCommunityCards} = useDeckStore.getState()
    const fifthCard = drawCard()
    addToCommunityCards(fifthCard);
    addToLogs(`Community Card ${fifthCard.rank + fifthCard.suit} is dealt`);

    const players = game.players;
    players.map((player) => {player.currentBet = 0 ;return player})
    set({
      game: {
        ...game,
        bet: 0,
        state: 'river',
        currentTurn: 0
      },
    });
  }
}));
