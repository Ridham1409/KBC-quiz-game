
import React from 'react';
import { useGame } from '@/context/GameContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const QuestionCard: React.FC = () => {
  const {
    currentQuestion,
    gameState,
    selectOption,
    confirmAnswer
  } = useGame();

  if (!currentQuestion) return null;

  const { selectedOption, revealAnswer, eliminations } = gameState;
  const hasSelected = selectedOption !== null;

  const getOptionClassNames = (optionIndex: number) => {
    const isEliminated = eliminations?.includes(optionIndex);
    const isSelected = selectedOption === optionIndex;
    const isCorrect = revealAnswer && optionIndex === currentQuestion.correctAnswer;
    const isIncorrect = revealAnswer && isSelected && optionIndex !== currentQuestion.correctAnswer;

    return cn(
      "w-full p-4 mb-3 border-2 text-left rounded-md transition-all",
      "cursor-pointer hover:option-glow hover:translate-y-[-2px]",
      {
        "opacity-25 pointer-events-none": isEliminated,
        "border-quiz-primary bg-quiz-dark": isSelected && !revealAnswer,
        "border-quiz-correct bg-green-900 option-glow-correct": isCorrect,
        "border-quiz-wrong bg-red-900 option-glow-wrong": isIncorrect,
        "border-muted": !isSelected && !isCorrect && !isIncorrect,
      }
    );
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-card rounded-xl shadow-lg animate-fade-in">
      <h3 className="text-xl md:text-2xl mb-8 font-bold text-center">
        {currentQuestion.text}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => selectOption(index)}
            disabled={revealAnswer || eliminations?.includes(index)}
            className={getOptionClassNames(index)}
          >
            <span className="font-bold mr-2">{optionLetters[index]}:</span> {option}
          </button>
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button 
          onClick={confirmAnswer}
          disabled={selectedOption === null || revealAnswer}
          className="bg-quiz-primary hover:bg-quiz-secondary text-white px-8 py-2"
          size="lg"
        >
          Final Answer
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
