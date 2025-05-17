
import React from 'react';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface QuitConfirmationProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const QuitConfirmation: React.FC<QuitConfirmationProps> = ({ open, setOpen }) => {
  const { quitGame, getCurrentPrize } = useGame();
  
  const handleQuit = () => {
    quitGame();
    setOpen(false);
  };
  
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to quit?</AlertDialogTitle>
          <AlertDialogDescription>
            If you quit now, you'll take home {getCurrentPrize()}.
            Are you sure you want to end the game?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Continue Playing</AlertDialogCancel>
          <AlertDialogAction onClick={handleQuit}>
            Yes, Quit & Take Prize
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default QuitConfirmation;
