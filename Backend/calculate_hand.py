from math import inf
from pokerkit import Automation, Mode, NoLimitTexasHoldem
from Model import GameStory


def simulateGamePlay(game_data: GameStory):

    state = NoLimitTexasHoldem.create_state(
        (
            Automation.BET_COLLECTION,
            Automation.CARD_BURNING,
            Automation.BLIND_OR_STRADDLE_POSTING,
            Automation.HOLE_CARDS_SHOWING_OR_MUCKING,
            Automation.HAND_KILLING,
            Automation.CHIPS_PUSHING,
            Automation.CHIPS_PULLING,
        ),  
        False,  
        {},  
        (game_data.big_blind // 2, game_data.big_blind),  # Small blind (20) and big blind (40)
        game_data.big_blind,  # Min-bet
        tuple(game_data.player_stacks),  # Starting stacks
        len(game_data.player_stacks),  # Number of players
        mode=Mode.CASH_GAME,
    )
    for hand in game_data.hands:
        state.deal_hole(hand)

    for action in game_data.actions:
        if action == "f":  # Fold
            state.fold()
        elif action == "x":  # Check
            state.check_or_call()
        elif action == "c":  # Call
            state.check_or_call()
        elif action.startswith("b"):  # Bet
            amount = int(action[1:])
            state.complete_bet_or_raise_to(amount)
        elif action.startswith("r"):  # Raise
            amount = int(action[1:])
            state.complete_bet_or_raise_to(amount)
       
        elif action.startswith("FLOP:"):  # Flop dealt
            cards = action.split(":")[1]
            state.deal_board(cards)
        
        elif action.startswith("TURN:"):  # Turn dealt
            cards = action.split(":")[1]
            state.deal_board(cards)
     
        elif action.startswith("RIVER:"):  # River dealt
            cards = action.split(":")[1]
            state.deal_board(cards)
    return state.stacks

