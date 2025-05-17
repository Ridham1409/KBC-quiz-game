
import { PrizeLevel } from "../types/quiz";

export const prizeLevels: PrizeLevel[] = [
  { level: 15, amount: "₹1 Crore", guaranteed: false },
  { level: 14, amount: "₹50,00,000", guaranteed: false },
  { level: 13, amount: "₹25,00,000", guaranteed: false },
  { level: 12, amount: "₹12,50,000", guaranteed: false },
  { level: 11, amount: "₹6,40,000", guaranteed: false },
  { level: 10, amount: "₹3,20,000", guaranteed: true },
  { level: 9, amount: "₹1,60,000", guaranteed: false },
  { level: 8, amount: "₹80,000", guaranteed: false },
  { level: 7, amount: "₹40,000", guaranteed: false },
  { level: 6, amount: "₹20,000", guaranteed: false },
  { level: 5, amount: "₹10,000", guaranteed: true },
  { level: 4, amount: "₹5,000", guaranteed: false },
  { level: 3, amount: "₹3,000", guaranteed: false },
  { level: 2, amount: "₹2,000", guaranteed: false },
  { level: 1, amount: "₹1,000", guaranteed: false },
];

export const getGuaranteedAmount = (currentLevel: number): string => {
  for (let i = currentLevel - 1; i >= 0; i--) {
    const level = prizeLevels.find(prize => prize.level === i + 1);
    if (level && level.guaranteed) {
      return level.amount;
    }
  }
  return "₹0";
};

export const getCurrentPrize = (level: number): string => {
  const prize = prizeLevels.find(prize => prize.level === level);
  return prize ? prize.amount : "₹0";
};
