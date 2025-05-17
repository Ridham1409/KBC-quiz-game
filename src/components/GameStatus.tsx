
import React from 'react';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Smile, Frown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const GameStatus: React.FC = () => {
  const { gameState, restartGame, quitGame, getFinalPrize } = useGame();
  const { gameStatus } = gameState;
  
  // Only show for game over states (won, lost, quit)
  const isGameOver = gameStatus === 'won' || gameStatus === 'lost' || gameStatus === 'quit';
  
  const [open, setOpen] = React.useState(false);
  
  React.useEffect(() => {
    setOpen(isGameOver);
  }, [isGameOver]);
  
  if (!isGameOver) return null;
  
  let title = '';
  let description = '';
  let primaryAction = null;
  let emoji = null;
  
  if (gameStatus === 'won') {
    title = "Congratulations! You've Won!";
    description = `You've won the top prize of ₹1 Crore!`;
    primaryAction = <Button onClick={restartGame}>Play Again</Button>;
    emoji = <Smile className="h-16 w-16 text-green-500 mx-auto my-4" />;
  } else if (gameStatus === 'lost') {
    title = "Game Over";
    description = `You've answered incorrectly. You'll take home ${getFinalPrize()}.`;
    primaryAction = <Button onClick={restartGame}>Try Again</Button>;
    emoji = <Frown className="h-16 w-16 text-red-500 mx-auto my-4" />;
  } else if (gameStatus === 'quit') {
    title = "Game Over";
    description = `You've decided to quit. You'll take home ${getFinalPrize()}.`;
    primaryAction = <Button onClick={restartGame}>Play Again</Button>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {emoji}
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {primaryAction}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameStatus;
