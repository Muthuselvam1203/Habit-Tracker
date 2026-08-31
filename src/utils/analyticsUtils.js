import { formatDateKey, getPastDays, DAY_NAMES, parseDateKey } from './dateUtils';
import { calculateHabitStreak } from './streakUtils';

export const getWeeklyTrends = (habits = [], completions = {}) => {
  const days = getPastDays(7); // Last 7 days including today
  
  return days.map(day => {
    let due = 0;
    let completed = 0;
    
    habits.forEach(habit => {
      if (habit.archived) return;
      const targetDays = habit.targetDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      if (targetDays.includes(day.dayName)) {
        due++;
        if (completions[habit.id]?.[day.dateKey]) {
          completed++;
        }
      }
    });

    const rate = due > 0 ? Math.round((completed / due) * 100) : 0;
    
    return {
      dateKey: day.dateKey,
      dayName: day.dayName,
      dayNumber: day.dayNumber,
      isToday: day.isToday,
      due,
      completed,
      rate
    };
  });
};

export const get30DayTrends = (habits = [], completions = {}) => {
  const days = getPastDays(30);
  
  return days.map(day => {
    let due = 0;
    let completed = 0;
    
    habits.forEach(habit => {
      if (habit.archived) return;
      const targetDays = habit.targetDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      if (targetDays.includes(day.dayName)) {
        due++;
        if (completions[habit.id]?.[day.dateKey]) {
          completed++;
        }
      }
    });

    const rate = due > 0 ? Math.round((completed / due) * 100) : 0;
    
    return {
      date: `${day.dayNumber} ${day.dayName}`,
      rate,
      completed,
      due
    };
  });
};

export const getCategoryBreakdown = (habits = [], completions = {}) => {
  const categories = {};

  habits.forEach(habit => {
    if (habit.archived) return;
    const cat = habit.category || 'other';
    if (!categories[cat]) {
      categories[cat] = {
        name: cat.charAt(0).toUpperCase() + cat.slice(1),
        categoryKey: cat,
        totalHabits: 0,
        totalCompletions: 0
      };
    }
    categories[cat].totalHabits++;
    const logs = completions[habit.id] || {};
    categories[cat].totalCompletions += Object.keys(logs).length;
  });

  return Object.values(categories);
};

export const getHabitPerformanceList = (habits = [], completions = {}) => {
  const past30 = getPastDays(30);

  return habits
    .filter(h => !h.archived)
    .map(habit => {
      const { currentStreak, longestStreak } = calculateHabitStreak(habit, completions);
      const habitLogs = completions[habit.id] || {};
      const totalCompletions = Object.keys(habitLogs).length;
      
      let scheduled30 = 0;
      let completed30 = 0;
      
      past30.forEach(d => {
        const targetDays = habit.targetDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        if (targetDays.includes(d.dayName)) {
          scheduled30++;
          if (habitLogs[d.dateKey]) {
            completed30++;
          }
        }
      });

      const rate30 = scheduled30 > 0 ? Math.round((completed30 / scheduled30) * 100) : 0;

      return {
        ...habit,
        currentStreak,
        longestStreak,
        totalCompletions,
        completed30,
        scheduled30,
        rate30
      };
    })
    .sort((a, b) => b.rate30 - a.rate30);
};

export const getDayOfWeekPerformance = (habits = [], completions = {}) => {
  const dayStats = DAY_NAMES.map(name => ({ day: name, due: 0, completed: 0 }));
  const past30 = getPastDays(30);

  past30.forEach(day => {
    const dayStat = dayStats.find(s => s.day === day.dayName);
    if (!dayStat) return;

    habits.forEach(habit => {
      if (habit.archived) return;
      const targetDays = habit.targetDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      if (targetDays.includes(day.dayName)) {
        dayStat.due++;
        if (completions[habit.id]?.[day.dateKey]) {
          dayStat.completed++;
        }
      }
    });
  });

  return dayStats.map(stat => ({
    ...stat,
    rate: stat.due > 0 ? Math.round((stat.completed / stat.due) * 100) : 0
  }));
};

/**
 * Return detailed analytics overview object
 */
export const getAnalyticsSummary = (habits = [], completions = {}) => {
  const performanceList = getHabitPerformanceList(habits, completions);
  const dayOfWeekList = getDayOfWeekPerformance(habits, completions);
  const weeklyTrends = getWeeklyTrends(habits, completions);

  const bestHabit = performanceList.length > 0 ? performanceList[0] : null;
  const mostMissedHabit = performanceList.length > 1 ? performanceList[performanceList.length - 1] : null;

  // Best day of week
  const sortedDays = [...dayOfWeekList].sort((a, b) => b.rate - a.rate);
  const bestDay = sortedDays.length > 0 && sortedDays[0].due > 0 ? sortedDays[0].day : 'N/A';

  // Weekly average completion
  const totalWeeklyDue = weeklyTrends.reduce((acc, curr) => acc + curr.due, 0);
  const totalWeeklyDone = weeklyTrends.reduce((acc, curr) => acc + curr.completed, 0);
  const weeklyRate = totalWeeklyDue > 0 ? Math.round((totalWeeklyDone / totalWeeklyDue) * 100) : 0;

  return {
    bestHabit,
    mostMissedHabit,
    bestDay,
    weeklyRate,
    performanceList,
    dayOfWeekList,
    weeklyTrends
  };
};
