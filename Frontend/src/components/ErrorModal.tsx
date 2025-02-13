import { Button } from "@/components/ui/button";

interface ErrorModalProps {
  error: string;
  onClose: () => void;
  onRestart: () => void;
}

const ErrorModal = ({ error, onClose, onRestart }: ErrorModalProps) => {
  if (!error) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Error Occurred</h2>
        <div className="space-y-4">
          <p className="text-black">{error}</p>
          <p className="text-gray-600">Backend could not calculate the result for your recent game :(</p>
          <p className="text-gray-600">Please try the following:</p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Refresh the page</li>
            <li>Start a new game</li>
          </ul>
        </div>
        <div className="mt-6 flex justify-center">
          <Button 
            onClick={onRestart}
            className=" bg-red-600 hover:bg-red-700"
          >
            Restart Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal; 