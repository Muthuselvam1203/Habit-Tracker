import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Clock,
  CheckCircle2,
  Circle,
  Plus,
  Zap,
  Droplets,
  Heart,
  Smile,
  Target,
  Sparkles,
  Calendar,
  Play,
  ArrowRight,
  Flame,
  CheckSquare,
  PenTool,
  TrendingUp,
  Award,
  Trophy,
  Check,
  Compass
} from 'lucide-react';
import { formatDateKey, formatDisplayDate, formatTime, getGreeting } from '../utils/dateUtils';
import { Button } from '../components/common/Button';
import { calculateHabitStreak } from '../utils/streakUtils';
import { getHabitColor } from '../data/habitOptions';
import { TimelineView } from '../components/dashboard/TimelineView';
import { TickitHabitCard } from '../components/dashboard/TickitHabitCard';
import { WeeklyStreakStrip } from '../components/dashboard/WeeklyStreakStrip';
import { HabitExplorerModal } from '../components/habits/HabitExplorerModal';
import { HabitCustomizerModal } from '../components/habits/HabitCustomizerModal';
import { HabitStatisticsModal } from '../components/habits/HabitStatisticsModal';
import { CHALLENGES_LIST, getStageForDay } from '../data/challengesData';

export const MyDay = ({
  userProfile = {},
  habits = [],
  completions = {},
  tasks = [],
  challengesProgress = {},
  morningRoutine = [],
  nightRoutine = [],
  routineLogs = {},
  wellnessLogs = {},
  lifeScore = {},
  onToggleHabit,
  onIncrementHabit,
  onLogHabitNote,
  onAddHabit,
  onUpdateHabit,
  onToggleTask,
  onToggleRoutine,
  onToggleChallengeDay,
  onAddWater,
  onUpdateWellness,
  onOpenFocus,
  onOpenNewHabit,
  onOpenNewTask,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'habits' | 'tasks' | 'timeline'
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Modal states for the 100% screenshot features
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [statsHabit, setStatsHabit] = useState(null);

  const todayKey = formatDateKey(selectedDate || new Date());
  const currentDate = formatDisplayDate();
  const greeting = getGreeting();
  const userName = userProfile.name || 'Muthuselvam';

  const todayWellness = wellnessLogs[todayKey] || {
    waterMl: 1750,
    waterTargetMl: 2000,
    mood: 'great',
    energy: 9,
    sleep: { durationMinutes: 465, rating: 5 },
    journal: { wentWell: '' }
  };

  const todayHabits = habits.filter(h => !h.archived);
  const todayCompletedHabits = todayHabits.filter(h => !!completions[h.id]?.[todayKey]);
  const habitCompletionRate = todayHabits.length > 0
    ? Math.round((todayCompletedHabits.length / todayHabits.length) * 100)
    : 0;

  const todayTasks = tasks.filter(t => !t.dueDate || t.dueDate === todayKey);
  const completedTasksCount = todayTasks.filter(t => t.completed).length;

  const waterPercent = Math.min(100, Math.round(((todayWellness.waterMl || 0) / (todayWellness.waterTargetMl || 2000)) * 100));

  // Active Challenge Info for Today
  const enrolledChallengeIds = Object.keys(challengesProgress);
  const activeChallenge = CHALLENGES_LIST.find(c => enrolledChallengeIds.includes(c.id));
  const activeChallengeProgress = activeChallenge ? challengesProgress[activeChallenge.id] : null;
  const challengeCompletedDays = activeChallengeProgress?.completedDays || [];
  const challengeCurrentDayNum = Math.min(activeChallenge?.durationDays || 30, challengeCompletedDays.length + 1);
  const isChallengeDayDone = challengeCompletedDays.includes(challengeCurrentDayNum);

  const MOOD_EMOJIS = {
    great: '😄',
    good: '🙂',
    okay: '😐',
    low: '😔',
    bad: '😡'
  };

  const filterHabitsByTime = (list) => {
    if (selectedTimeFilter === 'all') return list;
    return list.filter(h => (h.timeOfDay || 'anytime') === selectedTimeFilter);
  };

  const handleSaveCustomHabit = (data) => {
    if (editingHabit) {
      if (onUpdateHabit) onUpdateHabit(editingHabit.id, data);
    } else {
      if (onAddHabit) onAddHabit(data);
    }
  };

  return (
    <div className="anim-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3.5rem' }}>
      {/* 1. WEEKLY CONNECTED STREAK BAR matching Screenshot 3 */}
      <WeeklyStreakStrip
        currentDate={new Date()}
        selectedDate={selectedDate}
        onSelectDate={d => setSelectedDate(d)}
        onOpenNewHabit={() => setIsExplorerOpen(true)}
        completions={completions}
        habits={habits}
      />

      {/* ACTIVE 30-DAY CHALLENGE STRIP */}
      {activeChallenge && (
        <div
          className="card anim-scale-in"
          style={{
            padding: '1.15rem 1.5rem',
            borderLeft: `5px solid ${activeChallenge.color}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            background: `linear-gradient(90deg, ${activeChallenge.color}10 0%, var(--bg-card) 100%)`
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span style={{ fontSize: '2rem' }}>{activeChallenge.coverEmoji}</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.725rem', fontWeight: '800', textTransform: 'uppercase', color: activeChallenge.color }}>
                  Active 30-Day Journey
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)' }}>
                  • Day {challengeCurrentDayNum} of {activeChallenge.durationDays}
                </span>
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                {activeChallenge.title}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={() => onToggleChallengeDay && onToggleChallengeDay(activeChallenge.id, challengeCurrentDayNum)}
              className={`btn btn-sm ${isChallengeDayDone ? 'btn-secondary' : 'btn-primary'}`}
              style={{
                backgroundColor: isChallengeDayDone ? undefined : activeChallenge.color,
                borderColor: isChallengeDayDone ? undefined : activeChallenge.color,
                fontWeight: '800'
              }}
            >
              {isChallengeDayDone ? <><Check size={14} /> Day {challengeCurrentDayNum} Checked</> : `Check Day ${challengeCurrentDayNum} ✓`}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('challenges')}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)' }}
            >
              View Journey →
            </button>
          </div>
        </div>
      )}

      {/* Sub-view navigation tabs & Time of day filter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div
          style={{
            display: 'flex',
            gap: '0.4rem',
            backgroundColor: 'var(--bg-card)',
            padding: '0.35rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            width: 'fit-content'
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            style={subTabStyle(activeTab === 'all')}
          >
            <Sparkles size={14} /> Daily Habits ({todayCompletedHabits.length}/{todayHabits.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tasks')}
            style={subTabStyle(activeTab === 'tasks')}
          >
            <Target size={14} /> Tasks ({completedTasksCount}/{todayTasks.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('timeline')}
            style={subTabStyle(activeTab === 'timeline')}
          >
            <Clock size={14} /> 24h Timeline
          </button>
        </div>

        {/* Time of Day Filter Bar */}
        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Day' },
            { id: 'morning', label: '🌅 Morning' },
            { id: 'afternoon', label: '☀️ Afternoon' },
            { id: 'evening', label: '🌙 Evening' },
            { id: 'anytime', label: '⚡ Anytime' }
          ].map(f => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelectedTimeFilter(f.id)}
              className={`btn btn-sm ${selectedTimeFilter === f.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.75rem', fontWeight: '700', borderRadius: '999px', padding: '0.25rem 0.65rem' }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* 24h Timeline View Tab */}
      {activeTab === 'timeline' && (
        <TimelineView
          habits={habits}
          morningRoutine={morningRoutine}
          nightRoutine={nightRoutine}
          routineLogs={routineLogs}
          completions={completions}
          onToggleHabit={onToggleHabit}
          onToggleRoutine={onToggleRoutine}
        />
      )}

      {/* 2. PILL-SHAPED HABIT CARDS matching Screenshot 3 */}
      {(activeTab === 'all' || activeTab === 'habits') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {filterHabitsByTime(todayHabits).length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-secondary)' }}>
              <Sparkles size={32} style={{ margin: '0 auto 0.75rem auto', color: 'var(--primary-blue)', opacity: 0.6 }} />
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>No habits scheduled for this period</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Tap below to explore new lifestyles or customize a routine.</p>
              <button
                type="button"
                onClick={() => setIsExplorerOpen(true)}
                className="btn btn-primary"
                style={{ marginTop: '1rem', fontWeight: '800' }}
              >
                <Compass size={16} /> Explore New Lifestyles
              </button>
            </div>
          ) : (
            filterHabitsByTime(todayHabits).map(habit => (
              <TickitHabitCard
                key={habit.id}
                habit={habit}
                completions={completions}
                dateKey={todayKey}
                onToggleCompletion={onToggleHabit}
                onIncrement={onIncrementHabit}
                onOpenDetails={(h) => setStatsHabit(h)}
                onStartTimer={() => onOpenFocus()}
              />
            ))
          )}
        </div>
      )}

      {/* Tasks Tab / Unified View Tasks Section */}
      {(activeTab === 'all' || activeTab === 'tasks') && (
        <div className="card" style={{ marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={18} color="var(--primary-blue)" /> Today's Action Items ({completedTasksCount}/{todayTasks.length})
            </h3>
            <Button variant="secondary" size="sm" onClick={onOpenNewTask} icon={Plus}>
              New Task
            </Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {todayTasks.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                No pending tasks for today. Add a high-priority action item to keep your momentum.
              </div>
            ) : (
              todayTasks.map(task => {
                const priorityColors = {
                  high: '#EF4444',
                  medium: '#F59E0B',
                  low: '#10B981'
                };
                const pColor = priorityColors[task.priority] || '#3B82F6';

                return (
                  <div
                    key={task.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: task.completed ? 'var(--bg-surface)' : 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      opacity: task.completed ? 0.7 : 1,
                      transition: 'all 0.15s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <button
                        type="button"
                        onClick={() => onToggleTask(task.id)}
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '6px',
                          backgroundColor: task.completed ? '#2563EB' : 'transparent',
                          border: `2px solid ${task.completed ? '#2563EB' : 'var(--border-medium)'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          cursor: 'pointer'
                        }}
                      >
                        {task.completed && <CheckCircle2 size={13} />}
                      </button>

                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-primary)', textDecoration: task.completed ? 'line-through' : 'none' }}>
                          {task.title}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '2px' }}>
                          <span style={{ fontSize: '0.675rem', fontWeight: '800', textTransform: 'uppercase', color: pColor, backgroundColor: `${pColor}15`, padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                            {task.priority}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                            • {task.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleTask(task.id)}
                      className={`btn btn-sm ${task.completed ? 'btn-secondary' : 'btn-primary'}`}
                      style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                    >
                      {task.completed ? 'Done ✓' : 'Mark Done'}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* MODAL 1: EXPLORE NEW LIFESTYLE matching Screenshot 4 */}
      {isExplorerOpen && (
        <HabitExplorerModal
          onSelectHabit={(h) => {
            if (onAddHabit) onAddHabit(h);
          }}
          onOpenCustomizer={() => {
            setEditingHabit(null);
            setIsCustomizerOpen(true);
          }}
          onClose={() => setIsExplorerOpen(false)}
        />
      )}

      {/* MODAL 2: 100% CUSTOMIZABLE HABIT EDITOR matching Screenshot 1 */}
      {isCustomizerOpen && (
        <HabitCustomizerModal
          initialHabit={editingHabit}
          onSave={handleSaveCustomHabit}
          onClose={() => {
            setIsCustomizerOpen(false);
            setEditingHabit(null);
          }}
        />
      )}

      {/* MODAL 3: TRACK YOUR PROGRESS & STATISTICS matching Screenshot 2 */}
      {statsHabit && (
        <HabitStatisticsModal
          habit={statsHabit}
          completions={completions}
          onClose={() => setStatsHabit(null)}
          onOpenEdit={(h) => {
            setEditingHabit(h);
            setIsCustomizerOpen(true);
            setStatsHabit(null);
          }}
        />
      )}
    </div>
  );
};

const subTabStyle = (isActive) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.35rem',
  padding: '0.45rem 0.85rem',
  borderRadius: 'var(--radius-sm)',
  border: 'none',
  fontSize: '0.825rem',
  fontWeight: '800',
  backgroundColor: isActive ? 'var(--primary-blue)' : 'transparent',
  color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
  cursor: 'pointer',
  transition: 'all 0.15s'
});
