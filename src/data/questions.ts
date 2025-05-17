
import { Question } from "../types/quiz";

// Questions are categorized by difficulty level
export const questions: Question[] = [
  // Easy Questions (1-5)
  {
    id: 1,
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    difficulty: "easy",
    category: "Science"
  },
  {
    id: 2,
    text: "What is the capital city of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: 2,
    difficulty: "easy",
    category: "Geography"
  },
  {
    id: 3,
    text: "Who wrote the play 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: 1,
    difficulty: "easy",
    category: "Literature"
  },
  {
    id: 4,
    text: "Which element has the chemical symbol 'O'?",
    options: ["Osmium", "Oxygen", "Oganesson", "Gold"],
    correctAnswer: 1,
    difficulty: "easy",
    category: "Science"
  },
  {
    id: 5,
    text: "Which famous scientist developed the theory of relativity?",
    options: ["Isaac Newton", "Galileo Galilei", "Albert Einstein", "Stephen Hawking"],
    correctAnswer: 2,
    difficulty: "easy",
    category: "Science"
  },
  
  // Medium Questions (6-10)
  {
    id: 6,
    text: "In which year did World War II end?",
    options: ["1943", "1945", "1947", "1950"],
    correctAnswer: 1,
    difficulty: "medium",
    category: "History"
  },
  {
    id: 7,
    text: "Which country is the largest by land area?",
    options: ["China", "United States", "Canada", "Russia"],
    correctAnswer: 3,
    difficulty: "medium",
    category: "Geography"
  },
  {
    id: 8,
    text: "What is the currency of Japan?",
    options: ["Yuan", "Won", "Yen", "Ringgit"],
    correctAnswer: 2,
    difficulty: "medium",
    category: "Geography"
  },
  {
    id: 9,
    text: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correctAnswer: 1,
    difficulty: "medium",
    category: "Art"
  },
  {
    id: 10,
    text: "Which of these is NOT a programming language?",
    options: ["Python", "Java", "Cougar", "Ruby"],
    correctAnswer: 2,
    difficulty: "medium",
    category: "Technology"
  },
  
  // Hard Questions (11-15)
  {
    id: 11,
    text: "What is the smallest bone in the human body?",
    options: ["Stapes", "Femur", "Radius", "Tibia"],
    correctAnswer: 0,
    difficulty: "hard",
    category: "Biology"
  },
  {
    id: 12,
    text: "Which composer was deaf when he completed his Ninth Symphony?",
    options: ["Mozart", "Bach", "Beethoven", "Tchaikovsky"],
    correctAnswer: 2,
    difficulty: "hard",
    category: "Music"
  },
  {
    id: 13,
    text: "What is the hardest natural substance on Earth?",
    options: ["Platinum", "Diamond", "Titanium", "Graphene"],
    correctAnswer: 1,
    difficulty: "hard",
    category: "Science"
  },
  {
    id: 14,
    text: "Who was the first woman to win a Nobel Prize?",
    options: ["Marie Curie", "Rosalind Franklin", "Dorothy Hodgkin", "Ada Lovelace"],
    correctAnswer: 0,
    difficulty: "hard",
    category: "History"
  },
  {
    id: 15,
    text: "What is the capital city of Bhutan?",
    options: ["Thimphu", "Kathmandu", "Dhaka", "Ulaanbaatar"],
    correctAnswer: 0,
    difficulty: "hard",
    category: "Geography"
  }
];

export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): Question[] => {
  return questions.filter(q => q.difficulty === difficulty);
};

export const getQuestionsByCategory = (category: string): Question[] => {
  return questions.filter(q => q.category === category);
};

export const getRandomQuestionByDifficulty = (difficulty: 'easy' | 'medium' | 'hard', excludeIds: number[] = []): Question => {
  const filteredQuestions = getQuestionsByDifficulty(difficulty).filter(q => !excludeIds.includes(q.id));
  const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
  return filteredQuestions[randomIndex];
};
