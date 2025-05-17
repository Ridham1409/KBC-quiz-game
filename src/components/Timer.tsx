
import React from 'react';
import { useGame } from '@/context/GameContext';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const Timer: React.FC = () => {
  const { gameState } = useGame();
  const { timeRemaining, timerActive } = gameState;
  
  // Calculate timer color based on time remaining
  const getTimerColor = () => {
    if (timeRemaining > 20) return 'bg-green-500';
    if (timeRemaining > 10) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Calculate progress percentage
  const progressPercentage = (timeRemaining / 30) * 100;
  
  if (!timerActive && timeRemaining === 30) {
    return null;
  }

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">Time Remaining</span>
        <span className={cn(
          "text-xl font-bold",
          timeRemaining <= 10 ? "text-red-500" : 
          timeRemaining <= 20 ? "text-yellow-500" : "text-green-500"
        )}>
          {timeRemaining}s
        </span>
      </div>
      <Progress 
        value={progressPercentage} 
        className="h-2"
        indicatorClassName={cn(
          "transition-all duration-1000",
          getTimerColor()
        )}
      />
    </div>
  );
};

export default Timer;
