
import React from 'react';
import { useGame } from '@/context/GameContext';
import QuestionCard from './QuestionCard';
import PrizeLadder from './PrizeLadder';
import Timer from './Timer';
import Lifelines from './Lifelines';
import GameStatus from './GameStatus';
import WelcomeDialog from './WelcomeDialog';
import AudiencePoll from './AudiencePoll';
import PhoneAFriend from './PhoneAFriend';
import GameHeader from './GameHeader';

const GameContainer: React.FC = () => {
  const { gameState } = useGame();
  const { gameStatus } = gameState;
  
  const isGameActive = gameStatus === 'in_progress';
  
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <WelcomeDialog />
        <GameStatus />
        <AudiencePoll />
        <PhoneAFriend />
        
        <GameHeader />
        
        {isGameActive && (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 order-2 lg:order-1">
              <Timer />
              <QuestionCard />
              <Lifelines />
            </div>
            
            <div className="lg:w-72 order-1 lg:order-2">
              <PrizeLadder />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameContainer;
