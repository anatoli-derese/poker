import { useGameplayStore } from '../gamePlay';
import { useDeckStore } from '../cardStore';
import { useLogStore } from '../logStore';
import { useGameStoryStore } from '../storyStore';
import { describe, expect, test, jest, beforeEach } from '@jest/globals';

// Mock the dependent stores
jest.mock('../cardStore');
jest.mock('../logStore');
jest.mock('../storyStore');

describe('GameplayStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    useGameplayStore.setState({
      game: {
        players: [],
        pot: 0,
        currentTurn: 0,
        state: 'initial',
        bet: 0
      }
    });

    // Mock the dependent store methods
    (useDeckStore.getState as jest.Mock).mockReturnValue({
      drawCard: () => ({ rank: 'A', suit: '♠' }),
      initializeDeck: jest.fn(),
      addToCommunityCards: jest.fn()
    });

    (useLogStore.getState as jest.Mock).mockReturnValue({
      addToLogs: jest.fn(),
      clearLogs: jest.fn()
    });

    (useGameStoryStore.getState as jest.Mock).mockReturnValue({
      setBigBlind: jest.fn(),
      setPlayerStacks: jest.fn(),
      addtoHands: jest.fn(),
      addToAction: jest.fn()
    });
  });

  test('initializeGame should set up the game state correctly', () => {
    const { initializeGame } = useGameplayStore.getState();
    initializeGame(1000, 0);
    const { game } = useGameplayStore.getState();

    expect(game.players).toHaveLength(6);
    expect(game.pot).toBe(40);
    expect(game.state).toBe('pre-flop');
    expect(game.players[0].chips).toBe(980);
  });

  test('startDealing should set up the initial betting round', () => {
    const { initializeGame, startDealing } = useGameplayStore.getState();
    initializeGame(1000, 0);
    startDealing(40);
    const { game } = useGameplayStore.getState();

    expect(game.state).toBe('pre-flop');
    expect(game.bet).toBe(40);
    
    // Check small blind and big blind
    const smallBlindPlayer = game.players.find(p => p.special === 'smallblind');
    const bigBlindPlayer = game.players.find(p => p.special === 'bigblind');
    
    expect(smallBlindPlayer?.currentBet).toBe(20);
    expect(bigBlindPlayer?.currentBet).toBe(40);
  });

  test('call should update player bets and pot correctly', () => {
    const { initializeGame, startDealing, call } = useGameplayStore.getState();
    initializeGame(1000, 0);
    startDealing(40);
    
    call(2, 40); // Player 2 calls the big blind
    const { game } = useGameplayStore.getState();

    expect(game.players[2].currentBet).toBe(40);
    expect(game.pot).toBe(80);
    expect(game.currentTurn).toBe(3);
  });

  test('fold should remove player from active players', () => {
    const { initializeGame, startDealing, fold } = useGameplayStore.getState();
    initializeGame(1000, 0);
    startDealing(40);
    
    fold(2);
    const { game } = useGameplayStore.getState();

    expect(game.players).toHaveLength(5);
  });

  test('raise should update bet amounts correctly', () => {
    const { initializeGame, startDealing, raise } = useGameplayStore.getState();
    initializeGame(1000, 0);
    startDealing(40);
    
    raise(2, 100);
    const { game } = useGameplayStore.getState();

    expect(game.bet).toBe(100);
    expect(game.players[2].currentBet).toBe(100);
    expect(game.pot).toBe(140);
  });
}); 