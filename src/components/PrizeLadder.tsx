
import React from 'react';
import { useGame } from '@/context/GameContext';
import { prizeLevels } from '@/data/prizeData';
import { cn } from '@/lib/utils';

const PrizeLadder: React.FC = () => {
  const { gameState } = useGame();
  const { currentLevel } = gameState;

  return (
    <div className="w-full max-w-xs h-full bg-quiz-dark rounded-lg shadow-lg overflow-y-auto prize-ladder-bg">
      <div className="p-3 text-center border-b border-muted">
        <h3 className="text-xl font-bold text-quiz-primary">Prize Ladder</h3>
      </div>
      
      <div className="p-2">
        {prizeLevels.map((prize) => {
          const isCurrentLevel = prize.level === currentLevel;
          const isPastLevel = prize.level < currentLevel;
          
          return (
            <div 
              key={prize.level}
              className={cn(
                "flex items-center justify-between p-2 my-1 rounded-md transition-all",
                {
                  "bg-quiz-primary text-white font-bold translate-x-2 scale-105": isCurrentLevel,
                  "bg-gray-700 opacity-60": isPastLevel,
                  "bg-transparent": !isCurrentLevel && !isPastLevel,
                  "border-l-4 border-orange-400": prize.guaranteed
                }
              )}
            >
              <span className="font-medium">{prize.level}</span>
              <span className={cn({ "font-bold": prize.guaranteed })}>
                {prize.amount}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrizeLadder;
