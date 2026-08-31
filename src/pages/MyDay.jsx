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
  Award
} from 'lucide-react';
import { formatDateKey, formatDisplayDate, formatTime, getGreeting } from '../utils/dateUtils';
import { Button } from '../components/common/Button';
import { calculateHabitStreak } from '../utils/streakUtils';
import { getHabitColor } from '../data/habitOptions';
import { TimelineView } from '../components/dashboard/TimelineView';

export const MyDay = ({
  userProfile = {},
  habits = [],
  completions = {},
  tasks = [],
  morningRoutine = [],
  nightRoutine = [],
  routineLogs = {},
  wellnessLogs = {},
  lifeScore = {},
  onToggleHabit,
  onToggleTask,
  onToggleRoutine,
  onAddWater,
  onUpdateWellness,
  onOpenFocus,
  onOpenNewHabit,
  onOpenNewTask,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'habits' | 'tasks' | 'timeline'
  const todayKey = formatDateKey(new Date());
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

  const MOOD_EMOJIS = {
    great: '😄',
    good: '🙂',
    okay: '😐',
    low: '😔',
    bad: '😡'
  };

  return (
    <div className="anim-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3.5rem' }}>
      {/* Header Banner */}
      <div
        className="card anim-scale-in"
        style={{
          background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-surface) 100%)',
          border: '1px solid var(--border-subtle)',
          padding: '1.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                backgroundColor: 'var(--primary-blue-light)',
                color: 'var(--primary-blue)'
              }}
            >
              ⭐ Signature Daily Operating Hub
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
              <Calendar size={13} style={{ display: 'inline', marginRight: '3px' }} /> {currentDate}
            </span>
          </div>

          <h1 style={{ fontSize: '1.9rem', fontWeight: '900', color: 'var(--text-primary)', margin: '0.2rem 0' }}>
            {greeting}, {userName} 👋
          </h1>
          <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', margin: 0 }}>
            Your complete daily command center: Habits, tasks, biological vitals, and reflection in one place.
          </p>
        </div>

        {/* Life Score & Overall Day Progress Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div
            style={{
              padding: '0.65rem 1.15rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-xs)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Day Progress
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--primary-blue)' }}>
              {habitCompletionRate}%
            </div>
          </div>

          <div
            style={{
              padding: '0.65rem 1.15rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-xs)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Life Score
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: '900', color: '#059669' }}>
              {lifeScore.totalLifeScore ?? 87} / 100
            </div>
          </div>

          <Button variant="primary" onClick={onOpenFocus} icon={Play}>
            Focus Sprint
          </Button>
        </div>
      </div>

      {/* Quick Vitals Row (Water, Sleep, Mood, Energy, Journal) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
        {/* Water */}
        <div className="card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.725rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              💧 Hydration
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0891B2', marginTop: '2px' }}>
              {todayWellness.waterMl || 0}ml ({waterPercent}%)
            </div>
          </div>
          <button
            type="button"
            onClick={() => onAddWater(250)}
            className="btn btn-sm"
            style={{ backgroundColor: '#0891B2', color: '#FFFFFF', fontWeight: '700', padding: '0.3rem 0.6rem' }}
          >
            +250ml
          </button>
        </div>

        {/* Mood & Energy */}
        <div className="card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.725rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Mood & Energy
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#D97706', marginTop: '2px' }}>
              {MOOD_EMOJIS[todayWellness.mood] || '😄'} • ⚡ {todayWellness.energy || 9}/10
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('wellness')}
            className="btn btn-ghost btn-sm"
            style={{ fontSize: '0.75rem', fontWeight: '700' }}
          >
            Log →
          </button>
        </div>

        {/* Sleep */}
        <div className="card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.725rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              😴 Restorative Sleep
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#6366F1', marginTop: '2px' }}>
              {Math.floor((todayWellness.sleep?.durationMinutes || 465) / 60)}h {(todayWellness.sleep?.durationMinutes || 465) % 60}m ⭐⭐⭐⭐⭐
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('wellness')}
            className="btn btn-ghost btn-sm"
            style={{ fontSize: '0.75rem', fontWeight: '700' }}
          >
            Details →
          </button>
        </div>

        {/* Daily Journal */}
        <div className="card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.725rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              📔 Daily Journal
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>
              {todayWellness.journal?.wentWell ? 'Entry Logged ✓' : 'Prompt Ready'}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('journal')}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.75rem', fontWeight: '700' }}
          >
            Reflect
          </button>
        </div>
      </div>

      {/* Sub-view navigation tabs */}
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
          <Sparkles size={14} /> Unified Day
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('habits')}
          style={subTabStyle(activeTab === 'habits')}
        >
          <CheckSquare size={14} /> Habits ({todayCompletedHabits.length}/{todayHabits.length})
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

      {/* Habits Tab / Unified View Habits Section */}
      {(activeTab === 'all' || activeTab === 'habits') && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckSquare size={18} color="var(--primary-blue)" /> Today's Core Habits & Rituals
            </h3>
            <Button variant="secondary" size="sm" onClick={onOpenNewHabit} icon={Plus}>
              New Habit
            </Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {todayHabits.map(habit => {
              const isDone = !!completions[habit.id]?.[todayKey];
              const { currentStreak } = calculateHabitStreak(habit, completions);
              const habitColor = getHabitColor(habit);

              return (
                <div
                  key={habit.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isDone ? 'var(--bg-surface)' : 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderLeft: `4px solid ${habitColor}`,
                    opacity: isDone ? 0.75 : 1,
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => onToggleHabit(habit.id)}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        backgroundColor: isDone ? habitColor : 'transparent',
                        border: `2px solid ${isDone ? habitColor : 'var(--border-medium)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        cursor: 'pointer'
                      }}
                    >
                      {isDone && <CheckCircle2 size={14} />}
                    </button>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', textDecoration: isDone ? 'line-through' : 'none' }}>
                        {habit.name}
                      </div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>
                        {habit.category} • {habit.timeOfDay} {habit.reminderTime ? `• ⏰ ${formatTime(habit.reminderTime)}` : ''}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#F97316' }}>
                      🔥 {currentStreak}d
                    </span>
                    <button
                      type="button"
                      onClick={() => onToggleHabit(habit.id)}
                      className={`btn btn-sm ${isDone ? 'btn-secondary' : 'btn-primary'}`}
                      style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                    >
                      {isDone ? 'Done ✓' : 'Complete'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tasks Tab / Unified View Tasks Section */}
      {(activeTab === 'all' || activeTab === 'tasks') && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={18} color="var(--primary-blue)" /> Today's Action Items & Tasks
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
