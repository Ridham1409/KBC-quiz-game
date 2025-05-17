
import React from 'react';
import { useGame } from '@/context/GameContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { HelpCircle, Users, PhoneCall } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Lifelines: React.FC = () => {
  const {
    gameState,
    useFiftyFifty,
    useAudiencePoll,
    usePhoneAFriend,
    useDoubleDip
  } = useGame();

  const { usedLifelines, gameStatus, doubleDipActive, firstAttemptWrong } = gameState;
  const gameActive = gameStatus === 'in_progress';

  return (
    <div className="flex justify-center gap-4 my-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={useFiftyFifty}
              disabled={usedLifelines.fiftyFifty || !gameActive}
              className={cn(
                "rounded-full h-16 w-16 p-0 bg-gradient-to-br",
                usedLifelines.fiftyFifty
                  ? "from-gray-600 to-gray-800 opacity-50"
                  : "from-indigo-500 to-purple-700 hover:from-indigo-600 hover:to-purple-800"
              )}
            >
              <span className="text-lg font-bold">50:50</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Eliminates two incorrect answers</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={useAudiencePoll}
              disabled={usedLifelines.audiencePoll || !gameActive}
              className={cn(
                "rounded-full h-16 w-16 p-0 bg-gradient-to-br",
                usedLifelines.audiencePoll
                  ? "from-gray-600 to-gray-800 opacity-50"
                  : "from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
              )}
            >
              <Users size={24} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ask the audience for help</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={usePhoneAFriend}
              disabled={usedLifelines.phoneAFriend || !gameActive}
              className={cn(
                "rounded-full h-16 w-16 p-0 bg-gradient-to-br",
                usedLifelines.phoneAFriend
                  ? "from-gray-600 to-gray-800 opacity-50"
                  : "from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              )}
            >
              <PhoneCall size={24} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Phone a friend for help</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={useDoubleDip}
              disabled={usedLifelines.doubleDip || !gameActive}
              className={cn(
                "rounded-full h-16 w-16 p-0 bg-gradient-to-br",
                usedLifelines.doubleDip
                  ? "from-gray-600 to-gray-800 opacity-50"
                  : doubleDipActive && firstAttemptWrong
                    ? "from-orange-400 to-red-500 animate-pulse"
                    : doubleDipActive
                      ? "from-orange-400 to-red-500"
                      : "from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              )}
            >
              <HelpCircle size={24} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{doubleDipActive && firstAttemptWrong ? "Second chance active" : "Make two attempts on a question"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Lifelines;
