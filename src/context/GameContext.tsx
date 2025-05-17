import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GameState, Question } from '../types/quiz';
import { questions, getRandomQuestionByDifficulty } from '../data/questions';
import { getGuaranteedAmount, prizeLevels } from '../data/prizeData';
import { useToast } from '@/hooks/use-toast';

interface GameContextProps {
  gameState: GameState;
  currentQuestion: Question | null;
  startGame: () => void;
  selectOption: (optionIndex: number) => void;
  confirmAnswer: () => void;
  quitGame: () => void;
  restartGame: () => void;
  nextQuestion: () => void;
  useFiftyFifty: () => void;
  useAudiencePoll: () => void;
  usePhoneAFriend: () => void;
  useDoubleDip: () => void;
  getCurrentPrize: () => string;
  getFinalPrize: () => string;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

const initialGameState: GameState = {
  currentQuestionIndex: 0,
  currentLevel: 0,
  selectedOption: null,
  revealAnswer: false,
  isAnswerCorrect: null,
  gameStatus: 'not_started',
  usedLifelines: {
    fiftyFifty: false,
    audiencePoll: false,
    phoneAFriend: false,
    doubleDip: false,
  },
  timerActive: false,
  timeRemaining: 30,
  doubleDipActive: false,
  firstAttemptWrong: false,
};

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const useGame = (): GameContextProps => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
  const [usedQuestionIds, setUsedQuestionIds] = useState<number[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const timer = gameState.timerActive && gameState.timeRemaining > 0
      ? setInterval(() => {
          setGameState(prev => ({
            ...prev,
            timeRemaining: prev.timeRemaining - 1,
          }));
        }, 1000)
      : null;

    if (gameState.timeRemaining === 0 && gameState.timerActive) {
      handleTimerEnd();
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState.timerActive, gameState.timeRemaining]);

  const handleTimerEnd = () => {
    if (gameState.gameStatus === 'in_progress') {
      toast({
        title: "Time's up!",
        description: "You ran out of time for this question.",
        variant: "destructive",
      });
      setGameState(prev => ({
        ...prev,
        timerActive: false,
        gameStatus: 'lost',
      }));
    }
  };

  const startTimer = () => {
    setGameState(prev => ({
      ...prev,
      timerActive: true,
    }));
  };

  const stopTimer = () => {
    setGameState(prev => ({
      ...prev,
      timerActive: false,
    }));
  };

  const resetTimer = () => {
    setGameState(prev => ({
      ...prev,
      timeRemaining: 30,
      timerActive: false,
    }));
  };

  const selectRandomQuestions = (): Question[] => {
    // Keep track of selected question IDs to avoid repetition
    const selectedQuestionIds: number[] = [...usedQuestionIds];
    const selectedQuestions: Question[] = [];
    
    // Select 5 easy questions
    const easyQuestions = questions.filter(q => 
      q.difficulty === 'easy' && !selectedQuestionIds.includes(q.id)
    );
    for (let i = 0; i < 5 && easyQuestions.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * easyQuestions.length);
      const question = easyQuestions.splice(randomIndex, 1)[0];
      selectedQuestions.push(question);
      selectedQuestionIds.push(question.id);
    }
    
    // Select 5 medium questions
    const mediumQuestions = questions.filter(q => 
      q.difficulty === 'medium' && !selectedQuestionIds.includes(q.id)
    );
    for (let i = 0; i < 5 && mediumQuestions.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * mediumQuestions.length);
      const question = mediumQuestions.splice(randomIndex, 1)[0];
      selectedQuestions.push(question);
      selectedQuestionIds.push(question.id);
    }
    
    // Select 5 hard questions
    const hardQuestions = questions.filter(q => 
      q.difficulty === 'hard' && !selectedQuestionIds.includes(q.id)
    );
    for (let i = 0; i < 5 && hardQuestions.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * hardQuestions.length);
      const question = hardQuestions.splice(randomIndex, 1)[0];
      selectedQuestions.push(question);
      selectedQuestionIds.push(question.id);
    }
    
    // Update the used question IDs
    setUsedQuestionIds(selectedQuestionIds);
    
    return selectedQuestions;
  };

  const startGame = () => {
    const selectedQuestions = selectRandomQuestions();
    setGameQuestions(selectedQuestions);
    setGameState({
      ...initialGameState,
      gameStatus: 'in_progress',
      currentLevel: 1,
      currentQuestionIndex: 0,
      timeRemaining: 30,
      timerActive: true,
    });
  };

  const selectOption = (optionIndex: number) => {
    if (gameState.revealAnswer || gameState.selectedOption !== null) return;

    setGameState(prev => ({
      ...prev,
      selectedOption: optionIndex,
    }));
  };

  const confirmAnswer = () => {
    if (gameState.selectedOption === null || gameState.revealAnswer) return;

    const currentQuestion = gameQuestions[gameState.currentQuestionIndex];
    const isCorrect = gameState.selectedOption === currentQuestion.correctAnswer;

    // Special handling for double dip
    if (gameState.doubleDipActive && !isCorrect && !gameState.firstAttemptWrong) {
      // First attempt was wrong in double dip
      setGameState(prev => ({
        ...prev,
        selectedOption: null,
        firstAttemptWrong: true,
      }));
      
      toast({
        title: "First attempt incorrect",
        description: "You have one more attempt with Double Dip.",
      });
      
      return;
    }

    setGameState(prev => ({
      ...prev,
      revealAnswer: true,
      isAnswerCorrect: isCorrect,
      timerActive: false,
    }));

    // Let the user see the correct answer for a moment
    setTimeout(() => {
      if (isCorrect) {
        if (gameState.currentLevel === 15) {
          // Won the game
          setGameState(prev => ({
            ...prev,
            gameStatus: 'won',
          }));
          toast({
            title: "Congratulations!",
            description: "You've won the grand prize of ₹1 Crore!",
          });
        } else {
          // Proceed to next question directly without showing the popup
          nextQuestion();
        }
      } else {
        // Lost the game
        setGameState(prev => ({
          ...prev,
          gameStatus: 'lost',
        }));
        toast({
          variant: "destructive",
          title: "Wrong Answer!",
          description: `You'll take home ${getFinalPrize()}.`,
        });
      }
    }, 2000);
  };

  const nextQuestion = () => {
    if (gameState.currentLevel >= 15) return;

    setGameState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      currentLevel: prev.currentLevel + 1,
      selectedOption: null,
      revealAnswer: false,
      isAnswerCorrect: null,
      eliminations: undefined,
      audienceResults: undefined,
      phoneAFriendSuggestion: undefined,
      timeRemaining: 30,
      timerActive: true,
      doubleDipActive: false,
      firstAttemptWrong: false,
    }));
  };

  const quitGame = () => {
    setGameState(prev => ({
      ...prev,
      gameStatus: 'quit',
      timerActive: false,
    }));
    
    toast({
      title: "You decided to quit",
      description: `You'll take home ${getCurrentPrize()}.`,
    });
  };

  const restartGame = () => {
    startGame();
  };

  const useFiftyFifty = () => {
    if (
      gameState.usedLifelines.fiftyFifty || 
      gameState.revealAnswer || 
      gameState.selectedOption !== null
    ) return;

    const currentQuestion = gameQuestions[gameState.currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;
    
    // Get indexes of wrong options
    const wrongIndexes = [0, 1, 2, 3].filter(idx => idx !== correctAnswer);
    
    // Randomly select 2 wrong options to eliminate
    const shuffled = wrongIndexes.sort(() => 0.5 - Math.random());
    const eliminations = shuffled.slice(0, 2);
    
    setGameState(prev => ({
      ...prev,
      usedLifelines: {
        ...prev.usedLifelines,
        fiftyFifty: true,
      },
      eliminations,
    }));
    
    toast({
      title: "50:50 Lifeline Used",
      description: "Two incorrect options have been eliminated.",
    });
  };

  const useAudiencePoll = () => {
    if (
      gameState.usedLifelines.audiencePoll || 
      gameState.revealAnswer
    ) return;

    const currentQuestion = gameQuestions[gameState.currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;
    
    // Simulate audience poll results
    // The correct answer gets a higher percentage
    let results = [10, 10, 10, 10];
    
    // Give correct answer 40-70% of votes
    const correctAnswerPercentage = Math.floor(Math.random() * 31) + 40;
    results[correctAnswer] = correctAnswerPercentage;
    
    // Distribute remaining votes
    const remainingPercentage = 100 - correctAnswerPercentage;
    let distributed = 0;
    
    for (let i = 0; i < 4; i++) {
      if (i !== correctAnswer) {
        if (i === 3 || i === results.length - 1) {
          // Last option gets the remainder to ensure total is 100%
          results[i] = remainingPercentage - distributed;
        } else {
          // Random distribution for other options
          const value = Math.floor(Math.random() * (remainingPercentage - distributed - (3 - i - 1) * 5));
          results[i] = Math.max(value, 5); // Ensure at least 5% for each option
          distributed += results[i];
        }
      }
    }
    
    // If there are eliminated options from 50:50, set their values to 0
    if (gameState.eliminations) {
      gameState.eliminations.forEach(idx => {
        results[idx] = 0;
      });
      
      // Recalculate to ensure total is 100%
      const total = results.reduce((acc, val) => acc + val, 0);
      if (total < 100) {
        // Add the difference to the correct answer
        results[correctAnswer] += (100 - total);
      }
    }
    
    setGameState(prev => ({
      ...prev,
      usedLifelines: {
        ...prev.usedLifelines,
        audiencePoll: true,
      },
      audienceResults: results,
    }));
    
    toast({
      title: "Audience Poll Used",
      description: "The audience has voted on their answers.",
    });
  };

  const usePhoneAFriend = () => {
    if (
      gameState.usedLifelines.phoneAFriend || 
      gameState.revealAnswer
    ) return;

    const currentQuestion = gameQuestions[gameState.currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;
    
    // 80% chance the friend knows the correct answer
    const friendIsCorrect = Math.random() <= 0.8;
    
    let suggestion;
    if (friendIsCorrect) {
      suggestion = correctAnswer;
    } else {
      // Friend gives a wrong answer
      const wrongOptions = [0, 1, 2, 3].filter(idx => 
        idx !== correctAnswer && 
        (!gameState.eliminations || !gameState.eliminations.includes(idx))
      );
      suggestion = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
    }
    
    setGameState(prev => ({
      ...prev,
      usedLifelines: {
        ...prev.usedLifelines,
        phoneAFriend: true,
      },
      phoneAFriendSuggestion: suggestion,
    }));
    
    toast({
      title: "Phone A Friend Used",
      description: "Your friend thinks the answer might be " + String.fromCharCode(65 + suggestion) + ".",
    });
  };

  const useDoubleDip = () => {
    if (
      gameState.usedLifelines.doubleDip || 
      gameState.revealAnswer || 
      gameState.selectedOption !== null
    ) return;
    
    setGameState(prev => ({
      ...prev,
      usedLifelines: {
        ...prev.usedLifelines,
        doubleDip: true,
      },
      doubleDipActive: true,
    }));
    
    toast({
      title: "Double Dip Activated!",
      description: "You can now make two attempts on this question.",
    });
  };

  const getCurrentPrize = (): string => {
    const level = gameState.currentLevel;
    const prize = prizeLevels.find(p => p.level === level);
    return prize ? prize.amount : "₹0";
  };

  const getFinalPrize = (): string => {
    if (gameState.gameStatus === 'won') {
      return "₹1 Crore";
    } else if (gameState.gameStatus === 'quit') {
      return getCurrentPrize();
    } else if (gameState.gameStatus === 'lost') {
      return getGuaranteedAmount(gameState.currentLevel);
    }
    return "₹0";
  };

  // Get the current question
  const currentQuestion = gameQuestions[gameState.currentQuestionIndex] || null;

  return (
    <GameContext.Provider value={{
      gameState,
      currentQuestion,
      startGame,
      selectOption,
      confirmAnswer,
      quitGame,
      restartGame,
      nextQuestion,
      useFiftyFifty,
      useAudiencePoll,
      usePhoneAFriend,
      useDoubleDip,
      getCurrentPrize,
      getFinalPrize,
      startTimer,
      stopTimer,
      resetTimer,
    }}>
      {children}
    </GameContext.Provider>
  );
};
