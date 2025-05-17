
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface PrizeLevel {
  level: number;
  amount: string;
  guaranteed?: boolean;
}

export interface GameState {
  currentQuestionIndex: number;
  currentLevel: number;
  selectedOption: number | null;
  revealAnswer: boolean;
  isAnswerCorrect: boolean | null;
  gameStatus: 'not_started' | 'in_progress' | 'won' | 'lost' | 'quit';
  usedLifelines: {
    fiftyFifty: boolean;
    audiencePoll: boolean;
    phoneAFriend: boolean;
    flipQuestion: boolean;
  };
  eliminations?: number[];
  audienceResults?: number[];
  phoneAFriendSuggestion?: number;
  timerActive: boolean;
  timeRemaining: number;
}
