from models.game import GameStory
from pokerkit import Automation, Mode, NoLimitTexasHoldem

class GameService:
    @staticmethod
    def simulate_game_play(game_data: GameStory):
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
            (game_data.big_blind // 2, game_data.big_blind),
            game_data.big_blind,
            tuple(game_data.player_stacks),
            len(game_data.player_stacks),
            mode=Mode.CASH_GAME,
        )

        for hand in game_data.hands:
            state.deal_hole(hand)

        for action in game_data.actions:
            if action == "f":
                state.fold()
            elif action in ["x", "c"]:
                state.check_or_call()
            elif action.startswith(("b", "r")):
                amount = int(action[1:])
                state.complete_bet_or_raise_to(amount)
            elif any(action.startswith(x) for x in ["FLOP:", "TURN:", "RIVER:"]):
                cards = action.split(":")[1]
                state.deal_board(cards)

        return state.stacks 