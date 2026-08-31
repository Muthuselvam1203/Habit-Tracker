import { useState, useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { formatDateKey, getPastDays } from '../utils/dateUtils';
import { calculateOverallStreaks, calculateHabitStreak } from '../utils/streakUtils';
import { evaluateAchievements } from '../utils/achievementUtils';
import { createNotification } from '../utils/notificationUtils';
import { getHabitColor } from '../data/habitOptions';
import confetti from 'canvas-confetti';

const DEMO_HABITS = [
  {
    id: 'habit-1',
    name: 'Practice meditation',
    category: 'personal',
    icon: 'Sparkles',
    color: '#8B5CF6', // Purple
    timeOfDay: 'morning',
    targetDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    reminderTime: '07:00',
    description: '10 minutes of breath focus and mental clarity to start the morning.',
    longestStreak: 12,
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString()
  },
  {
    id: 'habit-2',
    name: 'Walking',
    category: 'health',
    icon: 'Footprints',
    color: '#10B981', // Emerald
    timeOfDay: 'morning',
    targetDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    reminderTime: '07:30',
    description: '20-minute brisk walk outdoors to absorb morning sunlight.',
    longestStreak: 8,
    createdAt: new Date(Date.now() - 12 * 86400000).toISOString()
  },
  {
    id: 'habit-3',
    name: 'Brain dump',
    category: 'productivity',
    icon: 'Brain',
    color: '#F59E0B', // Amber
    timeOfDay: 'morning',
    targetDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    reminderTime: '09:00',
    description: 'Write down top priorities and clear cognitive overload.',
    longestStreak: 6,
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString()
  },
  {
    id: 'habit-4',
    name: 'Keep a journal',
    category: 'personal',
    icon: 'PenTool',
    color: '#EC4899', // Pink
    timeOfDay: 'evening',
    targetDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    reminderTime: '21:30',
    description: 'Reflect on 3 wins and meaningful learnings from today.',
    longestStreak: 14,
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString()
  },
  {
    id: 'habit-5',
    name: 'Sleep over 8h',
    category: 'sleep',
    icon: 'Moon',
    color: '#6366F1', // Indigo
    timeOfDay: 'evening',
    targetDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    reminderTime: '22:30',
    description: 'Protect 8 hours of uninterrupted restorative sleep.',
    longestStreak: 9,
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString()
  }
];

const generateDemoCompletions = () => {
  const completions = {
    'habit-1': {},
    'habit-2': {},
    'habit-3': {},
    'habit-4': {},
    'habit-5': {}
  };

  const past14 = getPastDays(14);
  
  past14.forEach((day, index) => {
    // Habit 1: 12-day streak
    if (index >= 2) completions['habit-1'][day.dateKey] = { completedAt: day.dateKey };
    
    // Habit 2: Mon-Sun completions
    if (index >= 4) {
      completions['habit-2'][day.dateKey] = { completedAt: day.dateKey };
    }
    
    // Habit 3: Mon-Fri
    if (['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day.dayName) && index >= 3) {
      completions['habit-3'][day.dateKey] = { completedAt: day.dateKey };
    }
    
    // Habit 4: 14-day full streak
    completions['habit-4'][day.dateKey] = { completedAt: day.dateKey };
    
    // Habit 5: 9-day streak
    if (index >= 5) {
      completions['habit-5'][day.dateKey] = { completedAt: day.dateKey };
    }
  });

  return completions;
};

const STREAK_MILESTONES = [3, 7, 14, 30, 60, 100];

export const useHabits = () => {
  const [habits, setHabits] = useLocalStorage('habits', DEMO_HABITS);
  const [completions, setCompletions] = useLocalStorage('completions', generateDemoCompletions);
  const [unlockedAchievements, setUnlockedAchievements] = useLocalStorage('unlocked_achievements', ['first-step', 'streak-3', 'week-warrior']);
  
  // Modals & alerts
  const [newAchievementAlert, setNewAchievementAlert] = useState(null);
  const [activeMilestone, setActiveMilestone] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Evaluate achievements whenever habits or completions change
  useEffect(() => {
    const { newlyUnlockedIds, achievements } = evaluateAchievements(habits, completions, unlockedAchievements);
    if (newlyUnlockedIds.length > 0) {
      const updated = [...new Set([...unlockedAchievements, ...newlyUnlockedIds])];
      setUnlockedAchievements(updated);

      const latest = achievements.find(a => a.id === newlyUnlockedIds[0]);
      if (latest) {
        setNewAchievementAlert(latest);
        createNotification('Achievement Unlocked!', `You've earned "${latest.name}" (${latest.points} pts)`, 'achievement');
        try {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch (e) {}
      }
    }
  }, [habits, completions, unlockedAchievements, setUnlockedAchievements]);

  // Add a new habit
  const addHabit = useCallback((habitData) => {
    const habitColor = habitData.color || getHabitColor(habitData);
    const newHabit = {
      id: `habit-${Date.now()}`,
      name: habitData.name.trim(),
      category: habitData.category || 'health',
      icon: habitData.icon || 'Sparkles',
      color: habitColor,
      timeOfDay: habitData.timeOfDay || 'morning',
      targetDays: habitData.targetDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      reminderTime: habitData.reminderTime || '08:00',
      description: habitData.description || '',
      longestStreak: 0,
      createdAt: new Date().toISOString(),
      archived: false
    };

    setHabits(prev => [newHabit, ...prev]);
    createNotification('Habit Created', `"${newHabit.name}" was added to your routine.`);
    return newHabit;
  }, [setHabits]);

  // Update existing habit
  const updateHabit = useCallback((id, updatedData) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, ...updatedData } : h));
    createNotification('Habit Updated', `Changes to your habit were saved.`);
  }, [setHabits]);

  // Delete habit
  const deleteHabit = useCallback((id) => {
    setHabits(prev => prev.filter(h => h.id !== id));
    setCompletions(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    createNotification('Habit Deleted', 'Habit and completion history were removed.');
  }, [setHabits, setCompletions]);

  // Archive / Unarchive habit
  const toggleArchiveHabit = useCallback((id) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, archived: !h.archived } : h));
  }, [setHabits]);

  // Toggle habit completion on a specific date (defaults to today) with undo support
  const toggleHabitCompletion = useCallback((habitId, dateKey = formatDateKey(new Date())) => {
    let wasCompleted = false;
    let habitName = '';

    const habit = habits.find(h => h.id === habitId);
    if (habit) habitName = habit.name;

    setCompletions(prev => {
      const habitLogs = { ...(prev[habitId] || {}) };
      if (habitLogs[dateKey]) {
        delete habitLogs[dateKey];
        wasCompleted = false;
      } else {
        habitLogs[dateKey] = {
          completedAt: new Date().toISOString()
        };
        wasCompleted = true;
      }
      return {
        ...prev,
        [habitId]: habitLogs
      };
    });

    if (wasCompleted) {
      try {
        confetti({
          particleCount: 35,
          spread: 50,
          origin: { y: 0.8 },
          colors: ['#2563EB', '#0B1728', '#10B981', '#EAF2FF']
        });
      } catch (e) {}

      // Calculate streak to check for milestone
      if (habit) {
        const nextCompletions = {
          ...completions,
          [habitId]: { ...(completions[habitId] || {}), [dateKey]: { completedAt: new Date().toISOString() } }
        };
        const { currentStreak } = calculateHabitStreak(habit, nextCompletions);
        
        if (STREAK_MILESTONES.includes(currentStreak)) {
          setActiveMilestone({
            streak: currentStreak,
            habitName: habit.name
          });
          createNotification('Streak Milestone!', `You hit a ${currentStreak}-day streak on "${habit.name}"! 🔥`, 'milestone');
        } else {
          createNotification('Habit Completed', `"${habitName}" marked as done for today.`, 'completion');
        }
      }

      setToastMessage({
        title: 'Habit Completed',
        message: `"${habitName}" completed!`,
        undoAction: () => {
          setCompletions(prev => {
            const nextLogs = { ...(prev[habitId] || {}) };
            delete nextLogs[dateKey];
            return { ...prev, [habitId]: nextLogs };
          });
        }
      });
    } else {
      setToastMessage({
        title: 'Completion Undone',
        message: `"${habitName}" unmarked for today.`
      });
    }

    return wasCompleted;
  }, [habits, completions, setCompletions]);

  // Reset to sample demo data
  const seedDemoData = useCallback(() => {
    setHabits(DEMO_HABITS);
    setCompletions(generateDemoCompletions());
    setUnlockedAchievements(['first-step', 'streak-3', 'week-warrior']);
    createNotification('Demo Data Reset', 'Reset to initial sample habit profile.');
  }, [setHabits, setCompletions, setUnlockedAchievements]);

  // Clear all habit data
  const clearHabits = useCallback(() => {
    setHabits([]);
    setCompletions({});
    setUnlockedAchievements([]);
    createNotification('Data Cleared', 'All habits and streak logs were wiped.');
  }, [setHabits, setCompletions, setUnlockedAchievements]);

  const stats = calculateOverallStreaks(habits, completions);

  return {
    habits,
    completions,
    stats,
    unlockedAchievements,
    newAchievementAlert,
    setNewAchievementAlert,
    activeMilestone,
    setActiveMilestone,
    toastMessage,
    setToastMessage,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleArchiveHabit,
    toggleHabitCompletion,
    seedDemoData,
    clearHabits
  };
};
