import { useState, useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { formatDateKey, getPastDays } from '../utils/dateUtils';
import { calculateOverallStreaks, calculateHabitStreak } from '../utils/streakUtils';
import { evaluateAchievements } from '../utils/achievementUtils';
import { createNotification } from '../utils/notificationUtils';
import { calculateLifeScore } from '../utils/lifeScoreUtils';
import { calculateUserLevel } from '../data/achievements';
import {
  DEFAULT_MORNING_ROUTINE,
  DEFAULT_NIGHT_ROUTINE,
  DEFAULT_BAD_HABITS,
  DEFAULT_GOALS
} from '../data/routinePresets';
import confetti from 'canvas-confetti';

const DEMO_HABITS = [
  {
    id: 'habit-1',
    name: 'Practice meditation',
    category: 'mind',
    icon: 'Heart',
    color: '#8B5CF6',
    timeOfDay: 'morning',
    habitType: 'timer',
    timerTargetMinutes: 15,
    difficulty: 'medium',
    goalId: 'goal-2',
    targetDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    reminderTime: '07:00',
    description: '15 minutes of breath focus and mental clarity to center the day.',
    longestStreak: 14,
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString()
  },
  {
    id: 'habit-2',
    name: 'Morning workout & run',
    category: 'health',
    icon: 'Dumbbell',
    color: '#10B981',
    timeOfDay: 'morning',
    habitType: 'boolean',
    difficulty: 'hard',
    goalId: 'goal-1',
    targetDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    reminderTime: '06:30',
    description: '30-minute cardio and strength circuit for high daily energy.',
    longestStreak: 12,
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString()
  },
  {
    id: 'habit-3',
    name: 'Deep Work & Coding',
    category: 'learning',
    icon: 'Target',
    color: '#F59E0B',
    timeOfDay: 'afternoon',
    habitType: 'timer',
    timerTargetMinutes: 90,
    difficulty: 'hard',
    goalId: 'goal-3',
    targetDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    reminderTime: '10:00',
    description: 'Uninterrupted 90-minute block for high-leverage software building.',
    longestStreak: 8,
    createdAt: new Date(Date.now() - 12 * 86400000).toISOString()
  },
  {
    id: 'habit-4',
    name: 'Read 20 pages',
    category: 'learning',
    icon: 'BookOpen',
    color: '#3B82F6',
    timeOfDay: 'evening',
    habitType: 'measurable',
    measurableUnit: 'pages',
    measurableTarget: 20,
    difficulty: 'easy',
    goalId: 'goal-3',
    targetDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    reminderTime: '21:00',
    description: 'Read high-impact non-fiction books before winding down.',
    longestStreak: 18,
    createdAt: new Date(Date.now() - 25 * 86400000).toISOString()
  },
  {
    id: 'habit-5',
    name: 'Daily Reflection Journal',
    category: 'mind',
    icon: 'PenTool',
    color: '#EC4899',
    timeOfDay: 'evening',
    habitType: 'boolean',
    difficulty: 'easy',
    goalId: 'goal-2',
    targetDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    reminderTime: '21:45',
    description: 'Review 3 wins, learnings, and gratitude for the day.',
    longestStreak: 21,
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString()
  },
  {
    id: 'habit-6',
    name: 'Sleep 8 hours',
    category: 'health',
    icon: 'Moon',
    color: '#6366F1',
    timeOfDay: 'evening',
    habitType: 'timer',
    timerTargetMinutes: 480,
    difficulty: 'medium',
    goalId: 'goal-1',
    targetDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    reminderTime: '22:30',
    description: 'Protect 8 hours of restorative deep sleep.',
    longestStreak: 11,
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString()
  }
];

const DEFAULT_TASKS = [
  {
    id: 'task-1',
    title: 'Review weekly life goals & active habits',
    category: 'Productivity',
    priority: 'high',
    dueDate: formatDateKey(new Date()),
    completed: false,
    notes: 'Keep habit streaks aligned with quarterly milestones.'
  },
  {
    id: 'task-2',
    title: '50-minute deep work focus block',
    category: 'Focus',
    priority: 'high',
    dueDate: formatDateKey(new Date()),
    completed: true,
    notes: 'Ship key module architecture without distractions.'
  },
  {
    id: 'task-3',
    title: 'Read 1 chapter of high-impact book',
    category: 'Learning',
    priority: 'medium',
    dueDate: formatDateKey(new Date()),
    completed: true,
    notes: 'Reflect on key takeaways in Streakly journal.'
  },
  {
    id: 'task-4',
    title: 'Plan restorative outdoor walk & hydration',
    category: 'Health',
    priority: 'low',
    dueDate: formatDateKey(new Date()),
    completed: false,
    notes: 'Hit 2.5L water intake and get fresh oxygen.'
  }
];

const DEFAULT_FOCUS_SESSIONS = [
  { id: 'f-1', date: formatDateKey(new Date()), durationMinutes: 50, category: 'Coding & Architecture', completed: true },
  { id: 'f-2', date: formatDateKey(new Date()), durationMinutes: 25, category: 'Reading & Notes', completed: true },
  { id: 'f-3', date: formatDateKey(new Date(Date.now() - 86400000)), durationMinutes: 90, category: 'Deep Work', completed: true }
];

const generateDemoCompletions = () => {
  const completions = {
    'habit-1': {},
    'habit-2': {},
    'habit-3': {},
    'habit-4': {},
    'habit-5': {},
    'habit-6': {}
  };

  const past20 = getPastDays(20);
  
  past20.forEach((day, index) => {
    if (index >= 6) completions['habit-1'][day.dateKey] = { completedAt: day.dateKey, timerLoggedMinutes: 15 };
    if (index >= 8) completions['habit-2'][day.dateKey] = { completedAt: day.dateKey };
    if (['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day.dayName) && index >= 5) {
      completions['habit-3'][day.dateKey] = { completedAt: day.dateKey, timerLoggedMinutes: 90 };
    }
    if (index >= 2) completions['habit-4'][day.dateKey] = { completedAt: day.dateKey, measurableValue: 20 };
    completions['habit-5'][day.dateKey] = { completedAt: day.dateKey };
    if (index >= 9) completions['habit-6'][day.dateKey] = { completedAt: day.dateKey };
  });

  return completions;
};

const generateDemoWellness = () => {
  const wellness = {};
  const todayKey = formatDateKey(new Date());
  
  const past30 = getPastDays(30);
  past30.forEach((d, i) => {
    wellness[d.dateKey] = {
      waterMl: (1750 + (i % 4) * 250),
      waterTargetMl: 2000,
      sleep: {
        bedtime: '23:10',
        wakeTime: '07:05',
        durationMinutes: 475,
        rating: 4,
        goalMinutes: 480
      },
      mood: i % 5 === 0 ? 'good' : 'great',
      energy: 8 + (i % 3 === 0 ? 1 : 0),
      stress: 3,
      screenTime: {
        socialMediaMinutes: 45,
        entertainmentMinutes: 30,
        learningMinutes: 120
      },
      journal: {
        wentWell: 'Completed deep work session early in the morning.',
        learned: 'Small consistent habits compound faster than sporadic bursts.',
        difficult: 'Resisted afternoon distraction impulses.',
        gratitude: 'Grateful for good health, focus, and continuous growth.',
        improveTomorrow: 'Start night wind-down 15 minutes earlier.'
      }
    };
  });

  // Current day default
  wellness[todayKey] = {
    waterMl: 1750,
    waterTargetMl: 2000,
    sleep: {
      bedtime: '23:00',
      wakeTime: '06:45',
      durationMinutes: 465,
      rating: 5,
      goalMinutes: 480
    },
    mood: 'great',
    energy: 9,
    stress: 2,
    screenTime: {
      socialMediaMinutes: 35,
      entertainmentMinutes: 20,
      learningMinutes: 90
    },
    journal: {
      wentWell: 'Maintained strong morning momentum and finished core coding milestones.',
      learned: 'Time-blocking prevents cognitive friction throughout the afternoon.',
      difficult: 'Balancing focus sprints with restorative breaks.',
      gratitude: 'Deeply thankful for clear purpose, supportive mentors, and relentless energy.',
      improveTomorrow: 'Drink first 500ml water immediately upon waking.'
    }
  };

  return wellness;
};

const generateDemoRoutines = () => {
  const routines = {};
  const todayKey = formatDateKey(new Date());
  routines[todayKey] = {
    morningCompletedIds: ['mr-1', 'mr-2', 'mr-3', 'mr-4', 'mr-5', 'mr-6', 'mr-7'],
    nightCompletedIds: ['nr-1', 'nr-2', 'nr-3']
  };
  return routines;
};

export const useHabits = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [habits, setHabits] = useLocalStorage('habits', DEMO_HABITS);
  const [tasks, setTasks] = useLocalStorage('tasks', DEFAULT_TASKS);
  const [focusSessions, setFocusSessions] = useLocalStorage('focus_sessions', DEFAULT_FOCUS_SESSIONS);
  const [completions, setCompletions] = useLocalStorage('completions', generateDemoCompletions);
  const [morningRoutine, setMorningRoutine] = useLocalStorage('morning_routine', DEFAULT_MORNING_ROUTINE);
  const [nightRoutine, setNightRoutine] = useLocalStorage('night_routine', DEFAULT_NIGHT_ROUTINE);
  const [routineLogs, setRoutineLogs] = useLocalStorage('routine_logs', generateDemoRoutines);
  const [wellnessLogs, setWellnessLogs] = useLocalStorage('wellness_logs', generateDemoWellness);
  const [badHabits, setBadHabits] = useLocalStorage('bad_habits', DEFAULT_BAD_HABITS);
  const [goals, setGoals] = useLocalStorage('goals', DEFAULT_GOALS);
  const [userXp, setUserXp] = useLocalStorage('user_xp', 3150);
  const [streakFreezes, setStreakFreezes] = useLocalStorage('streak_freezes', 2);
  const [unlockedAchievements, setUnlockedAchievements] = useLocalStorage('unlocked_achievements', [
    'first-step',
    'streak-3',
    'week-warrior',
    'streak-14',
    'early-bird',
    'hydration-hero',
    'mindful-person',
    'reading-master',
    'focus-master',
    'life-optimizer'
  ]);
  
  // Modals & alerts
  const [newAchievementAlert, setNewAchievementAlert] = useState(null);
  const [activeMilestone, setActiveMilestone] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync theme attribute to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  const awardXp = useCallback((amount, reason = 'Activity completed') => {
    setUserXp(prev => (prev || 0) + amount);
  }, [setUserXp]);

  // Evaluate achievements
  useEffect(() => {
    const { newlyUnlockedIds, achievements } = evaluateAchievements(habits, completions, unlockedAchievements);
    if (newlyUnlockedIds.length > 0) {
      const updated = [...new Set([...unlockedAchievements, ...newlyUnlockedIds])];
      setUnlockedAchievements(updated);

      const latest = achievements.find(a => a.id === newlyUnlockedIds[0]);
      if (latest) {
        setNewAchievementAlert(latest);
        awardXp(latest.points || 100, `Badge: ${latest.name}`);
        createNotification('Achievement Unlocked!', `You've earned "${latest.name}" (+${latest.points} XP) 🏆`, 'achievement');
        try {
          confetti({
            particleCount: 70,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {}
      }
    }
  }, [habits, completions, unlockedAchievements, setUnlockedAchievements, awardXp]);

  // Habit CRUD
  const addHabit = useCallback((habitData) => {
    const newHabit = {
      id: `habit-${Date.now()}`,
      name: habitData.name.trim(),
      category: habitData.category || 'health',
      icon: habitData.icon || 'Sparkles',
      color: habitData.color || '#2563EB',
      timeOfDay: habitData.timeOfDay || 'morning',
      habitType: habitData.habitType || 'boolean',
      timerTargetMinutes: habitData.timerTargetMinutes || 30,
      measurableUnit: habitData.measurableUnit || '',
      measurableTarget: habitData.measurableTarget || 1,
      difficulty: habitData.difficulty || 'medium',
      goalId: habitData.goalId || null,
      targetDays: habitData.targetDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      reminderTime: habitData.reminderTime || '08:00',
      description: habitData.description || '',
      longestStreak: 0,
      createdAt: new Date().toISOString(),
      archived: false
    };

    setHabits(prev => [newHabit, ...prev]);
    awardXp(25, 'Habit created');
    createNotification('Habit Created', `"${newHabit.name}" was added to your Life OS.`);
    return newHabit;
  }, [setHabits, awardXp]);

  const updateHabit = useCallback((id, updatedData) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, ...updatedData } : h));
    createNotification('Habit Updated', 'Changes saved.');
  }, [setHabits]);

  const deleteHabit = useCallback((id) => {
    setHabits(prev => prev.filter(h => h.id !== id));
    setCompletions(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    createNotification('Habit Deleted', 'Habit removed.');
  }, [setHabits, setCompletions]);

  const toggleArchiveHabit = useCallback((id) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, archived: !h.archived } : h));
  }, [setHabits]);

  const toggleHabitCompletion = useCallback((habitId, dateKey = formatDateKey(new Date()), extraData = {}) => {
    let wasCompleted = false;
    let habitName = '';

    const habit = habits.find(h => h.id === habitId);
    if (habit) habitName = habit.name;

    setCompletions(prev => {
      const habitLogs = { ...(prev[habitId] || {}) };
      if (habitLogs[dateKey] && !extraData.forceComplete) {
        delete habitLogs[dateKey];
        wasCompleted = false;
      } else {
        habitLogs[dateKey] = {
          completedAt: new Date().toISOString(),
          timerLoggedMinutes: extraData.timerMinutes || habit?.timerTargetMinutes || 0,
          measurableValue: extraData.measurableValue || habit?.measurableTarget || 1,
          notes: extraData.notes || ''
        };
        wasCompleted = true;
      }
      return {
        ...prev,
        [habitId]: habitLogs
      };
    });

    if (wasCompleted) {
      const xpGain = habit?.difficulty === 'extreme' ? 40 : habit?.difficulty === 'hard' ? 30 : 20;
      awardXp(xpGain, `Habit completed: ${habitName}`);

      try {
        confetti({
          particleCount: 35,
          spread: 50,
          origin: { y: 0.8 },
          colors: ['#2563EB', '#10B981', '#8B5CF6', '#F59E0B']
        });
      } catch (e) {}

      if (habit) {
        const nextCompletions = {
          ...completions,
          [habitId]: { ...(completions[habitId] || {}), [dateKey]: { completedAt: new Date().toISOString() } }
        };
        const { currentStreak } = calculateHabitStreak(habit, nextCompletions);
        
        if ([3, 7, 14, 30, 60, 100].includes(currentStreak)) {
          setActiveMilestone({
            streak: currentStreak,
            habitName: habit.name
          });
          createNotification('Streak Milestone!', `You hit a ${currentStreak}-day streak on "${habit.name}"! 🔥`, 'milestone');
        } else {
          createNotification('Habit Completed', `"${habitName}" completed (+${xpGain} XP).`, 'completion');
        }
      }

      setToastMessage({
        title: 'Habit Completed',
        message: `"${habitName}" marked as done! (+XP)`,
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
        message: `"${habitName}" unmarked.`
      });
    }

    return wasCompleted;
  }, [habits, completions, setCompletions, awardXp]);

  // Routine Step Toggle
  const toggleRoutineStep = useCallback((type, stepId, dateKey = formatDateKey(new Date())) => {
    setRoutineLogs(prev => {
      const dayLogs = { ...(prev[dateKey] || { morningCompletedIds: [], nightCompletedIds: [] }) };
      const key = type === 'morning' ? 'morningCompletedIds' : 'nightCompletedIds';
      const list = dayLogs[key] || [];

      let updatedList;
      if (list.includes(stepId)) {
        updatedList = list.filter(id => id !== stepId);
      } else {
        updatedList = [...list, stepId];
        awardXp(15, `${type} routine step`);
      }

      return {
        ...prev,
        [dateKey]: {
          ...dayLogs,
          [key]: updatedList
        }
      };
    });
  }, [setRoutineLogs, awardXp]);

  // Tasks CRUD
  const addTask = useCallback((taskData) => {
    const newTask = {
      id: `task-${Date.now()}`,
      title: taskData.title.trim(),
      category: taskData.category || 'Productivity',
      priority: taskData.priority || 'medium', // 'high' | 'medium' | 'low'
      dueDate: taskData.dueDate || formatDateKey(new Date()),
      completed: false,
      notes: taskData.notes || '',
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
    awardXp(15, 'Task created');
    createNotification('Task Added', `"${newTask.title}" added to tasks list.`);
    return newTask;
  }, [setTasks, awardXp]);

  const updateTask = useCallback((id, updatedData) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updatedData } : t));
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    createNotification('Task Removed', 'Task deleted.');
  }, [setTasks]);

  const toggleTaskCompletion = useCallback((id) => {
    let isDone = false;
    let taskTitle = '';
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        isDone = !t.completed;
        taskTitle = t.title;
        return { ...t, completed: isDone };
      }
      return t;
    }));

    if (isDone) {
      awardXp(20, `Task completed: ${taskTitle}`);
      setToastMessage({
        title: 'Task Done',
        message: `"${taskTitle}" completed! (+20 XP)`
      });
    }
  }, [setTasks, awardXp]);

  // Wellness Logging
  const updateDailyWellness = useCallback((updatePayload, dateKey = formatDateKey(new Date())) => {
    setWellnessLogs(prev => {
      const dayData = { ...(prev[dateKey] || {}) };
      const nextDay = {
        ...dayData,
        ...updatePayload,
        sleep: { ...(dayData.sleep || {}), ...(updatePayload.sleep || {}) },
        screenTime: { ...(dayData.screenTime || {}), ...(updatePayload.screenTime || {}) },
        journal: { ...(dayData.journal || {}), ...(updatePayload.journal || {}) }
      };
      return {
        ...prev,
        [dateKey]: nextDay
      };
    });
    awardXp(10, 'Wellness logged');
  }, [setWellnessLogs, awardXp]);

  const addWater = useCallback((mlToAdd, dateKey = formatDateKey(new Date())) => {
    setWellnessLogs(prev => {
      const dayData = prev[dateKey] || { waterMl: 0, waterTargetMl: 2000 };
      const current = dayData.waterMl || 0;
      const next = Math.max(0, current + mlToAdd);
      return {
        ...prev,
        [dateKey]: {
          ...dayData,
          waterMl: next
        }
      };
    });
    awardXp(5, 'Hydration logged');
  }, [setWellnessLogs, awardXp]);

  // Goals CRUD
  const addGoal = useCallback((goalData) => {
    const newGoal = {
      id: `goal-${Date.now()}`,
      title: goalData.title,
      description: goalData.description || '',
      icon: goalData.icon || 'Target',
      category: goalData.category || 'health',
      color: goalData.color || '#10B981',
      targetDate: goalData.targetDate || '2026-12-31',
      habitIds: goalData.habitIds || []
    };
    setGoals(prev => [newGoal, ...prev]);
    awardXp(50, 'New Goal Set');
    createNotification('Goal Created', `"${newGoal.title}" established! 🎯`);
    return newGoal;
  }, [setGoals, awardXp]);

  const updateGoal = useCallback((id, data) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, ...data } : g));
  }, [setGoals]);

  const deleteGoal = useCallback((id) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  }, [setGoals]);

  // Bad Habits CRUD
  const resetBadHabit = useCallback((id) => {
    setBadHabits(prev => prev.map(bh => bh.id === id ? {
      ...bh,
      cleanSince: new Date().toISOString()
    } : bh));
    createNotification('Relapse Logged', 'Clean streak reset. Fresh start today!');
  }, [setBadHabits]);

  const addBadHabit = useCallback((data) => {
    const newBh = {
      id: `bh-${Date.now()}`,
      name: data.name,
      category: data.category || 'productivity',
      icon: data.icon || 'ShieldCheck',
      cleanSince: new Date().toISOString(),
      bestCleanDays: 0,
      reason: data.reason || ''
    };
    setBadHabits(prev => [newBh, ...prev]);
    createNotification('Quit Goal Added', `Tracking abstinence from "${newBh.name}"`);
  }, [setBadHabits]);

  const deleteBadHabit = useCallback((id) => {
    setBadHabits(prev => prev.filter(bh => bh.id !== id));
  }, [setBadHabits]);

  // Streak Freeze Usage
  const useStreakFreeze = useCallback(() => {
    if (streakFreezes <= 0) {
      setToastMessage({
        title: 'No Freezes Available',
        message: 'You have 0 Streak Freezes left for this month.'
      });
      return false;
    }

    setStreakFreezes(prev => prev - 1);
    setToastMessage({
      title: 'Streak Freeze Activated! 🛡️',
      message: 'Your streak has been shielded from yesterday.'
    });
    createNotification('Streak Freeze Used', 'Your unbroken streak is protected! ❄️');
    return true;
  }, [streakFreezes, setStreakFreezes]);

  // Focus Session Log
  const logFocusSession = useCallback((minutes, habitId = null, category = 'Deep Work') => {
    if (habitId) {
      toggleHabitCompletion(habitId, formatDateKey(new Date()), {
        forceComplete: true,
        timerMinutes: minutes
      });
    }

    const newSession = {
      id: `focus-${Date.now()}`,
      date: formatDateKey(new Date()),
      durationMinutes: minutes,
      habitId,
      category,
      completed: true,
      completedAt: new Date().toISOString()
    };

    setFocusSessions(prev => [newSession, ...(prev || [])]);
    const xp = Math.round(minutes * 1.5);
    awardXp(xp, `Focus session (${minutes}m)`);
    createNotification('Focus Session Complete!', `Logged ${minutes} minutes of deep focus (+${xp} XP) ⏱️`);
  }, [toggleHabitCompletion, awardXp, setFocusSessions]);

  // Reset to full demo data
  const seedDemoData = useCallback(() => {
    setHabits(DEMO_HABITS);
    setTasks(DEFAULT_TASKS);
    setFocusSessions(DEFAULT_FOCUS_SESSIONS);
    setCompletions(generateDemoCompletions());
    setMorningRoutine(DEFAULT_MORNING_ROUTINE);
    setNightRoutine(DEFAULT_NIGHT_ROUTINE);
    setRoutineLogs(generateDemoRoutines());
    setWellnessLogs(generateDemoWellness());
    setBadHabits(DEFAULT_BAD_HABITS);
    setGoals(DEFAULT_GOALS);
    setUserXp(3500);
    setStreakFreezes(2);
    setUnlockedAchievements([
      'first-step',
      'streak-3',
      'week-warrior',
      'streak-14',
      'early-bird',
      'hydration-hero',
      'mindful-person',
      'reading-master',
      'focus-master',
      'life-optimizer'
    ]);
    createNotification('Streakly Ready', 'Loaded full Life OS profile.');
  }, [
    setHabits,
    setTasks,
    setFocusSessions,
    setCompletions,
    setMorningRoutine,
    setNightRoutine,
    setRoutineLogs,
    setWellnessLogs,
    setBadHabits,
    setGoals,
    setUserXp,
    setStreakFreezes,
    setUnlockedAchievements
  ]);

  // Clear all data
  const clearHabits = useCallback(() => {
    setHabits([]);
    setTasks([]);
    setFocusSessions([]);
    setCompletions({});
    setRoutineLogs({});
    setWellnessLogs({});
    setBadHabits([]);
    setGoals([]);
    setUserXp(0);
    setStreakFreezes(2);
    setUnlockedAchievements([]);
    createNotification('Data Cleared', 'All personal records wiped.');
  }, [
    setHabits,
    setTasks,
    setFocusSessions,
    setCompletions,
    setRoutineLogs,
    setWellnessLogs,
    setBadHabits,
    setGoals,
    setUserXp,
    setStreakFreezes,
    setUnlockedAchievements
  ]);

  const stats = calculateOverallStreaks(habits, completions);
  const userLevel = calculateUserLevel(userXp);
  
  const todayKey = formatDateKey(new Date());
  const todayRoutines = routineLogs[todayKey] || { morningCompletedIds: [], nightCompletedIds: [] };
  const lifeScore = calculateLifeScore({
    habits,
    completions,
    routines: {
      [todayKey]: {
        morningCompleted: todayRoutines.morningCompletedIds?.length || 0,
        morningTotal: morningRoutine.length,
        nightCompleted: todayRoutines.nightCompletedIds?.length || 0,
        nightTotal: nightRoutine.length
      }
    },
    wellness: wellnessLogs,
    dateKey: todayKey
  });

  return {
    theme,
    toggleTheme,
    habits,
    tasks,
    focusSessions,
    completions,
    stats,
    morningRoutine,
    nightRoutine,
    routineLogs,
    wellnessLogs,
    badHabits,
    goals,
    userXp,
    userLevel,
    streakFreezes,
    lifeScore,
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
    toggleRoutineStep,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    setMorningRoutine,
    setNightRoutine,
    updateDailyWellness,
    addWater,
    addGoal,
    updateGoal,
    deleteGoal,
    addBadHabit,
    resetBadHabit,
    deleteBadHabit,
    useStreakFreeze,
    logFocusSession,
    awardXp,
    seedDemoData,
    clearHabits
  };
};
