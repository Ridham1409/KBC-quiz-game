
import React from 'react';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const WelcomeDialog: React.FC = () => {
  const { gameState, startGame } = useGame();
  const [open, setOpen] = React.useState(gameState.gameStatus === 'not_started');

  React.useEffect(() => {
    setOpen(gameState.gameStatus === 'not_started');
  }, [gameState.gameStatus]);

  const handleStart = () => {
    startGame();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-quiz-primary">Welcome to QuizMaster!</DialogTitle>
          <DialogDescription className="text-center">
            The ultimate KBC-style quiz game
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <p>
            Test your knowledge and win virtual prizes by answering 15 increasingly difficult questions.
          </p>
          
          <h3 className="font-bold mt-4">Game Rules:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Answer 15 questions correctly to win ₹1 Crore</li>
            <li>Questions get progressively harder</li>
            <li>You have 30 seconds to answer each question</li>
            <li>Milestones at ₹10,000 and ₹3,20,000 guarantee those amounts if you fail later</li>
          </ul>
          
          <h3 className="font-bold mt-4">Lifelines:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><span className="font-medium">50:50</span> - Removes two incorrect options</li>
            <li><span className="font-medium">Audience Poll</span> - Shows how the audience voted</li>
            <li><span className="font-medium">Phone a Friend</span> - Get advice from a virtual friend</li>
            <li><span className="font-medium">Flip Question</span> - Replace the current question</li>
          </ul>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleStart}
            className="w-full bg-quiz-primary hover:bg-quiz-secondary"
          >
            Start Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDialog;
