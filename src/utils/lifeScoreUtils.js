import { formatDateKey } from './dateUtils';

/**
 * Computes a holistic Daily Life Score (0 to 100) and category breakdowns.
 * Components:
 * 1. Habits completion (35%) - weighted by difficulty
 * 2. Morning & Night Routines (20%)
 * 3. Hydration Target (15%)
 * 4. Sleep Quality & Duration (15%)
 * 5. Mood & Energy Balance (15%)
 */
export const calculateLifeScore = ({
  habits = [],
  completions = {},
  routines = {},
  wellness = {},
  dateKey = formatDateKey(new Date())
}) => {
  const activeHabits = habits.filter(h => !h.archived);

  // 1. Habit Score (0 - 100)
  let habitScore = 80;
  if (activeHabits.length > 0) {
    let totalWeight = 0;
    let earnedWeight = 0;

    activeHabits.forEach(h => {
      let weight = 1;
      if (h.difficulty === 'medium') weight = 1.25;
      if (h.difficulty === 'hard') weight = 1.5;
      if (h.difficulty === 'extreme') weight = 2;

      totalWeight += weight;
      const logs = completions[h.id] || {};
      if (logs[dateKey]) {
        earnedWeight += weight;
      }
    });

    habitScore = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;
  }

  // 2. Routine Score (0 - 100)
  const routineLogs = routines[dateKey] || {};
  const morningCompleted = routineLogs.morningCompleted || 0;
  const morningTotal = routineLogs.morningTotal || 10;
  const nightCompleted = routineLogs.nightCompleted || 0;
  const nightTotal = routineLogs.nightTotal || 7;

  const totalRoutineItems = morningTotal + nightTotal;
  const totalRoutineDone = morningCompleted + nightCompleted;
  const routineScore = totalRoutineItems > 0 ? Math.round((totalRoutineDone / totalRoutineItems) * 100) : 75;

  // 3. Hydration Score (0 - 100)
  const dailyWellness = wellness[dateKey] || {};
  const waterMl = dailyWellness.waterMl ?? 1750;
  const waterTargetMl = dailyWellness.waterTargetMl ?? 2000;
  const hydrationScore = Math.min(100, Math.round((waterMl / waterTargetMl) * 100));

  // 4. Sleep Score (0 - 100)
  const sleep = dailyWellness.sleep || { durationMinutes: 465, goalMinutes: 480, rating: 4 };
  const sleepRatio = Math.min(1.2, (sleep.durationMinutes || 465) / (sleep.goalMinutes || 480));
  const sleepScore = Math.min(100, Math.round(sleepRatio * 85 + (sleep.rating || 4) * 3));

  // 5. Mood & Energy Score (0 - 100)
  const mood = dailyWellness.mood || 'great';
  const energy = dailyWellness.energy || 8; // 1-10
  const moodValues = { great: 100, good: 85, okay: 65, low: 45, bad: 30 };
  const moodScore = Math.round(((moodValues[mood] || 85) * 0.5) + (energy * 10 * 0.5));

  // Total Weighted Life Score
  const totalLifeScore = Math.min(100, Math.max(0, Math.round(
    habitScore * 0.35 +
    routineScore * 0.20 +
    hydrationScore * 0.15 +
    sleepScore * 0.15 +
    moodScore * 0.15
  )));

  // Category Breakdown Scores (0 - 100)
  const categories = {
    health: Math.min(100, Math.round((hydrationScore * 0.4) + (sleepScore * 0.3) + (habitScore * 0.3))),
    mind: Math.min(100, Math.round((moodScore * 0.5) + (routineScore * 0.3) + (habitScore * 0.2))),
    learning: Math.min(100, Math.round((habitScore * 0.7) + (energy * 10 * 0.3))),
    productivity: Math.min(100, Math.round((routineScore * 0.4) + (habitScore * 0.4) + (energy * 10 * 0.2))),
    social: Math.min(100, Math.round((moodScore * 0.6) + (habitScore * 0.4))),
    personal: Math.min(100, Math.round((routineScore * 0.5) + (habitScore * 0.5)))
  };

  return {
    totalLifeScore,
    habitScore,
    routineScore,
    hydrationScore,
    sleepScore,
    moodScore,
    categories
  };
};
