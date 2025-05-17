
import React from 'react';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import QuitConfirmation from './QuitConfirmation';

const GameHeader: React.FC = () => {
  const { gameState, getCurrentPrize } = useGame();
  const { currentLevel, gameStatus } = gameState;
  
  const [quitDialogOpen, setQuitDialogOpen] = React.useState(false);
  
  const isGameActive = gameStatus === 'in_progress';
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full p-4 bg-card rounded-xl mb-4">
      <div className="flex items-center mb-4 md:mb-0">
        <h1 className="text-2xl md:text-3xl font-bold text-quiz-primary mr-2">
          QuizMaster
        </h1>
        {isGameActive && (
          <span className="text-sm bg-quiz-primary/20 text-quiz-light px-3 py-1 rounded-full">
            Question {currentLevel}/15
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        {isGameActive && (
          <>
            <div className="bg-quiz-dark/50 px-4 py-2 rounded-md">
              <span className="text-sm text-quiz-light">Current Prize</span>
              <p className="font-bold text-quiz-primary">{getCurrentPrize()}</p>
            </div>
            
            <Button 
              variant="outline"
              size="sm"
              onClick={() => setQuitDialogOpen(true)}
              className="border-quiz-primary text-quiz-primary hover:bg-quiz-primary/10"
            >
              Quit
            </Button>
            
            <QuitConfirmation
              open={quitDialogOpen}
              setOpen={setQuitDialogOpen}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default GameHeader;
