
import React from 'react';
import { useGame } from '@/context/GameContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Phone } from 'lucide-react';

const PhoneAFriend: React.FC = () => {
  const { gameState, currentQuestion } = useGame();
  const { phoneAFriendSuggestion } = gameState;
  
  const [open, setOpen] = React.useState(phoneAFriendSuggestion !== undefined);

  React.useEffect(() => {
    setOpen(phoneAFriendSuggestion !== undefined);
  }, [phoneAFriendSuggestion]);

  if (phoneAFriendSuggestion === undefined || !currentQuestion) return null;

  const optionLetters = ['A', 'B', 'C', 'D'];
  const suggestion = optionLetters[phoneAFriendSuggestion];
  const suggestedAnswer = currentQuestion.options[phoneAFriendSuggestion];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" /> Phone A Friend
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-muted-foreground">Your Friend</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="italic text-muted-foreground">
            "Let me think about this for a moment..."
          </p>
          <p>
            "I'm pretty confident the answer is <span className="font-bold text-quiz-primary">{suggestion}</span>: {suggestedAnswer}"
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Remember that your friend might not always be correct!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneAFriend;
