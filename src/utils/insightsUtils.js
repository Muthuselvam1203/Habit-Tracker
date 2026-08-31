import { getAnalyticsSummary } from './analyticsUtils';
import { calculateOverallStreaks } from './streakUtils';

export const generateLocalInsights = (habits = [], completions = {}) => {
  const insights = [];
  const activeHabits = habits.filter(h => !h.archived);

  if (activeHabits.length === 0) {
    return [
      {
        id: 'no-habits',
        type: 'info',
        text: 'Create your first habit to unlock personalized consistency insights.',
        icon: 'Sparkles'
      }
    ];
  }

  const overall = calculateOverallStreaks(habits, completions);
  const analytics = getAnalyticsSummary(habits, completions);

  // 1. Weekly completion insight
  if (analytics.weeklyRate > 0) {
    insights.push({
      id: 'weekly-rate',
      type: 'rate',
      text: `You completed ${analytics.weeklyRate}% of your habits this week.`,
      icon: 'TrendingUp'
    });
  }

  // 2. Strongest habit insight
  if (analytics.bestHabit && analytics.bestHabit.rate30 > 0) {
    insights.push({
      id: 'best-habit',
      type: 'habit',
      text: `${analytics.bestHabit.name} is your strongest habit (${analytics.bestHabit.rate30}% 30-day rate).`,
      icon: 'Award'
    });
  }

  // 3. Best day of week
  const validDays = analytics.dayOfWeekList.filter(d => d.due > 0);
  if (validDays.length > 0) {
    const bestDayObj = [...validDays].sort((a, b) => b.rate - a.rate)[0];
    if (bestDayObj && bestDayObj.rate > 0) {
      const fullDayName = {
        Mon: 'Mondays',
        Tue: 'Tuesdays',
        Wed: 'Wednesdays',
        Thu: 'Thursdays',
        Fri: 'Fridays',
        Sat: 'Saturdays',
        Sun: 'Sundays'
      }[bestDayObj.day] || bestDayObj.day;

      insights.push({
        id: 'best-day',
        type: 'day',
        text: `You're most consistent on ${fullDayName} (${bestDayObj.rate}% completion).`,
        icon: 'Calendar'
      });
    }
  }

  // 4. Streak proximity to personal best
  if (overall.bestStreak > 0 && overall.currentStreak > 0) {
    const gap = overall.bestStreak - overall.currentStreak;
    if (gap > 0 && gap <= 5) {
      insights.push({
        id: 'streak-gap',
        type: 'streak',
        text: `Your current streak is only ${gap} ${gap === 1 ? 'day' : 'days'} away from your all-time personal best!`,
        icon: 'Flame'
      });
    } else if (gap === 0 && overall.currentStreak >= 3) {
      insights.push({
        id: 'streak-record',
        type: 'streak',
        text: `You are currently at your all-time record streak of ${overall.currentStreak} days!`,
        icon: 'Trophy'
      });
    }
  }

  // 5. Time of day comparison (morning vs evening)
  let morningDue = 0, morningDone = 0, eveningDue = 0, eveningDone = 0;
  const last7 = analytics.weeklyTrends;
  last7.forEach(d => {
    activeHabits.forEach(h => {
      const targetDays = h.targetDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      if (targetDays.includes(d.dayName)) {
        if (h.timeOfDay === 'morning') {
          morningDue++;
          if (completions[h.id]?.[d.dateKey]) morningDone++;
        } else if (h.timeOfDay === 'evening') {
          eveningDue++;
          if (completions[h.id]?.[d.dateKey]) eveningDone++;
        }
      }
    });
  });

  const morningRate = morningDue > 0 ? (morningDone / morningDue) * 100 : 0;
  const eveningRate = eveningDue > 0 ? (eveningDone / eveningDue) * 100 : 0;

  if (morningDue >= 3 && eveningDue >= 3) {
    if (morningRate > eveningRate + 20) {
      insights.push({
        id: 'time-contrast',
        type: 'time',
        text: 'Your morning habits have a higher completion rate than your evening habits.',
        icon: 'Sunrise'
      });
    } else if (eveningRate > morningRate + 20) {
      insights.push({
        id: 'time-contrast',
        type: 'time',
        text: 'Your evening routines are currently more consistent than your morning habits.',
        icon: 'Moon'
      });
    }
  }

  // Fallback if low data
  if (insights.length === 0) {
    insights.push({
      id: 'building-momentum',
      type: 'info',
      text: 'Keep checking in habits daily to unlock smart pattern analytics.',
      icon: 'Target'
    });
  }

  return insights;
};
