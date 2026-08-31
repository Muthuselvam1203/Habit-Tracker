import { formatDateKey, getDayOfWeek, isToday, isYesterday } from './dateUtils';

/**
 * Calculates current streak and longest streak for a single habit.
 * Handles custom target days (e.g. Mon-Fri or daily).
 */
export const calculateHabitStreak = (habit, completions = {}) => {
  const habitCompletions = completions[habit.id] || {};
  const targetDays = habit.targetDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const today = new Date();
  const todayKey = formatDateKey(today);
  const todayDayName = getDayOfWeek(todayKey);
  const isTargetToday = targetDays.includes(todayDayName);
  const doneToday = !!habitCompletions[todayKey];
  
  let currentStreak = 0;
  let longestStreak = habit.longestStreak || 0;
  
  // If completed today, streak starts with 1
  if (doneToday) {
    currentStreak = 1;
  }
  
  // Check backwards from yesterday
  let checkDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
  let streakAlive = true;
  let daysChecked = 0;
  const maxDays = 730; // 2 years safety limit
  
  while (streakAlive && daysChecked < maxDays) {
    daysChecked++;
    const dateKey = formatDateKey(checkDate);
    const dayName = getDayOfWeek(dateKey);
    const isTargetDay = targetDays.includes(dayName);
    
    if (isTargetDay) {
      if (habitCompletions[dateKey]) {
        currentStreak++;
      } else {
        // If today is a target day and NOT done yet, we maintain the streak from yesterday
        // But if yesterday wasn't done, streak is broken
        streakAlive = false;
      }
    }
    
    // Move to previous day
    checkDate.setDate(checkDate.getDate() - 1);
  }
  
  if (currentStreak > longestStreak) {
    longestStreak = currentStreak;
  }
  
  return {
    currentStreak,
    longestStreak,
    isCompletedToday: doneToday,
    isTargetToday
  };
};

/**
 * Calculate overall stats across all habits.
 */
export const calculateOverallStreaks = (habits = [], completions = {}) => {
  const activeHabits = habits.filter(h => !h.archived);
  
  const todayKey = formatDateKey(new Date());
  const todayDayName = getDayOfWeek(todayKey);
  
  if (activeHabits.length === 0) {
    return {
      totalActive: 0,
      dueToday: 0,
      completedToday: 0,
      todayCompletionRate: 0,
      currentStreak: 0,
      bestStreak: 0,
      totalCompletions: 0
    };
  }

  let dueTodayCount = 0;
  let completedTodayCount = 0;
  let maxCurrentStreak = 0;
  let maxLongestStreak = 0;
  let totalCompletions = 0;

  activeHabits.forEach(habit => {
    const targetDays = habit.targetDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const isDue = targetDays.includes(todayDayName);
    if (isDue) dueTodayCount++;

    const habitLogs = completions[habit.id] || {};
    if (habitLogs[todayKey]) completedTodayCount++;

    totalCompletions += Object.keys(habitLogs).length;

    const { currentStreak, longestStreak } = calculateHabitStreak(habit, completions);
    if (currentStreak > maxCurrentStreak) maxCurrentStreak = currentStreak;
    if (longestStreak > maxLongestStreak) maxLongestStreak = longestStreak;
  });

  const rate = dueTodayCount > 0 ? Math.round((completedTodayCount / dueTodayCount) * 100) : 0;

  return {
    totalActive: activeHabits.length,
    dueToday: dueTodayCount,
    completedToday: completedTodayCount,
    todayCompletionRate: rate,
    currentStreak: maxCurrentStreak,
    bestStreak: Math.max(maxCurrentStreak, maxLongestStreak),
    totalCompletions
  };
};
