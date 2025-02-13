import { Button } from "@/components/ui/button";

interface GameResultProps {
  result: number[];
  onClose: () => void;
}

const GameResult = ({ result, onClose }: GameResultProps) => {
  if (!result) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-black">Game Results</h2>
        <div className="space-y-2">
          {result.map((chips, index) => (
            <div key={index} className="flex justify-between">
              <span className="font-medium text-black">Player {index + 1}:</span>
              {
                chips >= 1000 ? <span className="text-green-600 font-bold"> + {1000- chips} chips</span>: <span className="text-red-600 font-bold"> - {1000 -chips} chips</span>

              }</div>
          ))}
        </div>
        <Button 
          onClick={onClose}
          className="mt-4 w-full"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default GameResult; 