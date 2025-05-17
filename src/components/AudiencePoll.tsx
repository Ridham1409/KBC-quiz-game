
import React from 'react';
import { useGame } from '@/context/GameContext';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const AudiencePoll: React.FC = () => {
  const { gameState } = useGame();
  const { audienceResults } = gameState;
  
  const [open, setOpen] = React.useState(!!audienceResults);

  React.useEffect(() => {
    setOpen(!!audienceResults);
  }, [audienceResults]);

  const optionLetters = ['A', 'B', 'C', 'D'];

  if (!audienceResults) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Audience Poll Results</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {audienceResults.map((percentage, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="font-medium">Option {optionLetters[index]}</span>
                <span className="font-bold">{percentage}%</span>
              </div>
              <Progress value={percentage} className="h-6" />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AudiencePoll;
