
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

const GameStatus: React.FC = () => {
  const { gameState, restartGame, quitGame, nextQuestion, getFinalPrize } = useGame();
  const { gameStatus, revealAnswer, isAnswerCorrect, currentLevel } = gameState;
  
  const showResult = revealAnswer && isAnswerCorrect && gameStatus === 'in_progress';
  const isGameOver = gameStatus === 'won' || gameStatus === 'lost' || gameStatus === 'quit';
  
  const [open, setOpen] = React.useState(false);
  
  React.useEffect(() => {
    setOpen(showResult || isGameOver);
  }, [showResult, isGameOver]);
  
  if (!showResult && !isGameOver) return null;
  
  let title = '';
  let description = '';
  let primaryAction = null;
  let secondaryAction = null;
  
  if (showResult) {
    title = 'Correct Answer!';
    description = currentLevel === 15 
      ? "Congratulations! You've reached the final question and won the top prize!" 
      : "Great job! Let's move on to the next question.";
    primaryAction = <Button onClick={nextQuestion}>Next Question</Button>;
    secondaryAction = <Button variant="outline" onClick={quitGame}>Quit & Take Prize</Button>;
  } else if (gameStatus === 'won') {
    title = "Congratulations! You've Won!";
    description = `You've won the top prize of ₹1 Crore!`;
    primaryAction = <Button onClick={restartGame}>Play Again</Button>;
  } else if (gameStatus === 'lost') {
    title = "Game Over";
    description = `You've answered incorrectly. You'll take home ${getFinalPrize()}.`;
    primaryAction = <Button onClick={restartGame}>Try Again</Button>;
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
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {secondaryAction}
          {primaryAction}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameStatus;
