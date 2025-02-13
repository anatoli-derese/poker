import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { fetchSavedGames } from '@/services/gameService';

interface SavedGame {
  id: string;
  big_blind: number;
  player_stacks: number[];
  hands: string[];
  actions: string[];
  results: number[];
}

const SavedGames = () => {
  const [games, setGames] = useState<SavedGame[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetchGames = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchSavedGames();
      if (response.error) {
        setError(response.error);
        setGames([]);
      } else if (Array.isArray(response.games)) {
        setGames(response.games);
      } else {
        setGames([]);
        setError('Invalid data format received');
      }
    } catch (err) {
      setError('Failed to fetch games');
      setGames([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch games when component mounts
  useEffect(() => {
    handleFetchGames();
  }, []);


  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-4 w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Saved Games</h2>
        <Button 
          onClick={handleFetchGames}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          {loading ? 'Loading...' : 'Fetch Games'}
        </Button>
      </div>

      {error && (
        <div className="text-red-400 mb-4 p-2 bg-red-900/50 rounded">
          {error}
        </div>
      )}

      <div className="space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto font-mono text-sm">
        {Array.isArray(games) && games.map((game) => (

          <div key={game.id} className="bg-slate-700 border-slate-600 border p-4 rounded-lg hover:bg-slate-600 transition-colors">
            {/* Hand ID and Big Blind */}
            <div className="text-slate-300 mb-2">
              Hand #{game.id}
              <span className="text-slate-400 ml-2">
                Stack: {game.player_stacks?.[0]} Big blind: {game.big_blind}
              </span>
            </div>

            {/* Player Hands */}
            <div className="text-slate-300 mb-2">
              Hands: {Array.isArray(game.hands) && game.hands.map((hand, idx) => (
                <span key={idx} className="mr-2">
                  Player {idx + 1}: {hand}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="text-slate-300 mb-2">
              Actions: {Array.isArray(game.actions) && game.actions.join(' ')}
            </div>

            {/* Winnings */
            }
            
            <div className="text-slate-300">
              Winnings: {Array.isArray(game.results) && game.results.map((chips, idx) => (
                <span key={idx} className={`mr-2 ${chips >= game.player_stacks[idx] ? 'text-emerald-400' : 'text-rose-400'}`}>
                  Player {idx + 1}: {chips >= game.player_stacks[idx]  ? '+' : ''}{chips - game.player_stacks[idx] }
                </span>
              ))}
            </div>
          </div>
        ))}
        
        {(!games || games.length === 0) && !loading && !error && (
          <div className="text-slate-400 text-center py-4">
            No saved games found in Database!
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedGames; 