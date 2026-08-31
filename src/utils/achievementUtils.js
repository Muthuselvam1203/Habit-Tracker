import { ACHIEVEMENTS_DATA } from '../data/achievements';
import { calculateHabitStreak, calculateOverallStreaks } from './streakUtils';
import { getPastDays, formatDateKey, getDayOfWeek } from './dateUtils';

export const evaluateAchievements = (habits = [], completions = {}, currentUnlocked = []) => {
  const overall = calculateOverallStreaks(habits, completions);
  const activeHabits = habits.filter(h => !h.archived);
  
  // Calculate max streak across all habits
  let maxStreak = 0;
  activeHabits.forEach(h => {
    const { longestStreak, currentStreak } = calculateHabitStreak(h, completions);
    if (longestStreak > maxStreak) maxStreak = longestStreak;
    if (currentStreak > maxStreak) maxStreak = currentStreak;
  });

  // Calculate consecutive perfect days (for Perfect Week)
  const past7Days = getPastDays(7);
  let perfectDaysCount = 0;
  past7Days.forEach(day => {
    let due = 0;
    let done = 0;
    activeHabits.forEach(h => {
      const targetDays = h.targetDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      if (targetDays.includes(day.dayName)) {
        due++;
        if (completions[h.id]?.[day.dateKey]) done++;
      }
    });
    if (due > 0 && done >= due) {
      perfectDaysCount++;
    }
  });

  // Evaluate each achievement
  const results = ACHIEVEMENTS_DATA.map(achievement => {
    let currentVal = 0;
    let threshold = achievement.threshold || 1;
    let unlocked = false;

    switch (achievement.id) {
      case 'first-step':
        currentVal = overall.totalCompletions;
        unlocked = currentVal >= 1;
        break;

      case 'streak-3':
        currentVal = maxStreak;
        threshold = 3;
        unlocked = currentVal >= 3;
        break;

      case 'week-warrior':
        currentVal = maxStreak;
        threshold = 7;
        unlocked = currentVal >= 7;
        break;

      case 'streak-14':
        currentVal = maxStreak;
        threshold = 14;
        unlocked = currentVal >= 14;
        break;

      case 'streak-30':
        currentVal = maxStreak;
        threshold = 30;
        unlocked = currentVal >= 30;
        break;

      case 'consistency-king':
        threshold = 50;
        currentVal = Math.max(overall.totalCompletions, maxStreak);
        unlocked = maxStreak >= 60 || overall.totalCompletions >= 50;
        break;

      case 'legend-100':
        currentVal = maxStreak;
        threshold = 100;
        unlocked = currentVal >= 100;
        break;

      case 'habit-master':
        currentVal = activeHabits.length;
        threshold = 5;
        unlocked = currentVal >= 5;
        break;

      case 'perfect-week':
        currentVal = perfectDaysCount;
        threshold = 7;
        unlocked = currentVal >= 7;
        break;

      default:
        currentVal = 0;
        unlocked = false;
    }

    const alreadyUnlocked = currentUnlocked.includes(achievement.id);
    const isUnlocked = unlocked || alreadyUnlocked;
    const progress = Math.min(100, Math.round((currentVal / threshold) * 100));

    return {
      ...achievement,
      currentVal,
      threshold,
      progress,
      isUnlocked
    };
  });

  const newlyUnlocked = results.filter(
    r => r.isUnlocked && !currentUnlocked.includes(r.id)
  );

  return {
    achievements: results,
    newlyUnlockedIds: newlyUnlocked.map(a => a.id),
    totalPoints: results.filter(r => r.isUnlocked).reduce((acc, curr) => acc + curr.points, 0),
    unlockedCount: results.filter(r => r.isUnlocked).length,
    totalCount: ACHIEVEMENTS_DATA.length
  };
};
