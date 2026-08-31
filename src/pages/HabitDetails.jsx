import React from 'react';
import {
  ArrowLeft,
  Edit3,
  Archive,
  Trash2,
  Calendar,
  Check,
  Flame,
  Trophy,
  Percent,
  Clock,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Moon,
  Footprints,
  Wind,
  Brain,
  PenTool,
  PhoneCall,
  Sun,
  Dumbbell,
  BookOpen,
  Target,
  Droplet,
  HeartPulse,
  Users,
  Smile,
  Coffee,
  CheckSquare
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { formatTime, getPastDays, formatDateKey } from '../utils/dateUtils';
import { calculateHabitStreak } from '../utils/streakUtils';
import { getHabitColor } from '../data/habitOptions';

const ICON_MAP = {
  Sparkles,
  Moon,
  Footprints,
  Wind,
  Brain,
  PenTool,
  PhoneCall,
  Sun,
  Dumbbell,
  BookOpen,
  Target,
  Droplet,
  HeartPulse,
  Users,
  Smile,
  Coffee,
  CheckSquare,
  Flame
};

export const HabitDetails = ({
  habit,
  completions = {},
  onBack,
  onEdit,
  onToggleArchive,
  onDelete,
  onToggleCompletion
}) => {
  if (!habit) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <p>Habit not found.</p>
        <Button variant="secondary" onClick={onBack} style={{ marginTop: '1rem' }}>
          Back to Habits
        </Button>
      </div>
    );
  }

  const habitColor = getHabitColor(habit);
  const IconComp = ICON_MAP[habit.icon] || Sparkles;
  const { currentStreak, longestStreak, isCompletedToday } = calculateHabitStreak(habit, completions);
  const past30Days = getPastDays(30);
  const habitLogs = completions[habit.id] || {};
  const totalCompletions = Object.keys(habitLogs).length;
  const targetDays = habit.targetDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Calculate 30-day rate
  let due30 = 0;
  let done30 = 0;
  past30Days.forEach(d => {
    if (targetDays.includes(d.dayName)) {
      due30++;
      if (habitLogs[d.dateKey]) done30++;
    }
  });
  const rate30 = due30 > 0 ? Math.round((done30 / due30) * 100) : 0;

  return (
    <div className="anim-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', paddingBottom: '2.5rem' }}>
      {/* Top Back Navigation & Action Buttons */}
      <div className="page-header-row">
        <Button variant="ghost" onClick={onBack} icon={ArrowLeft}>
          Back to Habits
        </Button>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button variant="secondary" onClick={() => onEdit(habit)} icon={Edit3}>
            Edit
          </Button>
          <Button variant="secondary" onClick={() => onToggleArchive(habit.id)} icon={Archive}>
            {habit.archived ? 'Unarchive' : 'Archive'}
          </Button>
          <Button variant="danger" onClick={() => onDelete(habit.id)} icon={Trash2}>
            Delete
          </Button>
        </div>
      </div>

      {/* Habit Hero Card */}
      <div
        className="card"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
          backgroundColor: 'var(--color-white)',
          borderLeft: `5px solid ${habitColor}`
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <div
            style={{
              width: '58px',
              height: '58px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: habitColor,
              color: 'var(--color-white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 4px 20px ${habitColor}45`,
              flexShrink: 0
            }}
          >
            <IconComp size={28} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--color-black)' }}>
                {habit.name}
              </h2>
              <span
                style={{
                  backgroundColor: `${habitColor}15`,
                  color: habitColor,
                  padding: '0.15rem 0.55rem',
                  borderRadius: 'var(--radius-xs)',
                  fontWeight: '700',
                  fontSize: '0.75rem',
                  textTransform: 'capitalize'
                }}
              >
                {habit.category}
              </span>
              {habit.archived && (
                <span className="badge-navy">Archived</span>
              )}
            </div>
            <p style={{ color: 'var(--color-text-grey)', fontSize: '0.9rem' }}>
              {habit.description || 'No description provided.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onToggleCompletion(habit.id)}
          className={`btn ${isCompletedToday ? 'btn-secondary' : 'btn-primary'} btn-lg`}
          style={{
            backgroundColor: isCompletedToday ? undefined : habitColor,
            borderColor: isCompletedToday ? undefined : habitColor,
            boxShadow: isCompletedToday ? undefined : `0 4px 14px ${habitColor}40`
          }}
        >
          <Check size={18} />
          <span>{isCompletedToday ? 'Completed Today ✓' : 'Mark Done Today'}</span>
        </button>
      </div>

      {/* 4 Stat Cards for this Habit */}
      <div className="habit-details-stats-grid">
        <div style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-sm)', backgroundColor: `${habitColor}18`, color: habitColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Flame size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.725rem', color: 'var(--color-text-grey)', fontWeight: '600', textTransform: 'uppercase' }}>Current Streak</div>
            <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--color-black)' }}>{currentStreak} Days</div>
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-light-grey)', color: 'var(--color-black)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Trophy size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.725rem', color: 'var(--color-text-grey)', fontWeight: '600', textTransform: 'uppercase' }}>Longest Streak</div>
            <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--color-black)' }}>{longestStreak} Days</div>
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-sm)', backgroundColor: `${habitColor}18`, color: habitColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Percent size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.725rem', color: 'var(--color-text-grey)', fontWeight: '600', textTransform: 'uppercase' }}>30-Day Rate</div>
            <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--color-black)' }}>{rate30}%</div>
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--status-success-bg)', color: 'var(--status-success-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.725rem', color: 'var(--color-text-grey)', fontWeight: '600', textTransform: 'uppercase' }}>Total Check-ins</div>
            <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--color-black)' }}>{totalCompletions} Logs</div>
          </div>
        </div>
      </div>

      {/* 30-Day Activity Heatmap Grid */}
      <div className="card">
        <div className="card-header">
          <div>
            <h4 className="card-title">
              <Calendar size={18} color={habitColor} /> 30-Day Activity Grid
            </h4>
            <p className="card-subtitle">
              Schedule: {targetDays.length === 7 ? 'Every Day' : targetDays.join(', ')} • Click any date cell to log or toggle completion
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(36px, 1fr))',
            gap: '0.5rem',
            padding: '0.5rem 0'
          }}
        >
          {past30Days.map((day) => {
            const isDone = !!habitLogs[day.dateKey];
            const isDue = targetDays.includes(day.dayName);

            return (
              <div
                key={day.dateKey}
                onClick={() => onToggleCompletion(habit.id, day.dateKey)}
                title={`${day.dateKey} (${day.dayName}) - ${isDone ? 'Completed ✓' : isDue ? 'Missed / Scheduled' : 'Rest Day'}`}
                style={{
                  height: '42px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isDone
                    ? habitColor
                    : isDue
                    ? 'var(--color-light-grey)'
                    : '#FFFFFF',
                  border: `1px solid ${isDone ? habitColor : 'var(--border-subtle)'}`,
                  boxShadow: isDone ? `0 2px 8px ${habitColor}40` : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.775rem',
                  fontWeight: '700',
                  color: isDone ? 'var(--color-white)' : isDue ? 'var(--color-black)' : 'var(--color-text-grey)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {day.dayNumber}
              </div>
            );
          })}
        </div>
      </div>

      {/* Routine Configuration Details */}
      <div className="card">
        <h4 className="card-title" style={{ marginBottom: '1.25rem' }}>
          Routine Configuration
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-grey)', fontWeight: '700', textTransform: 'uppercase' }}>Activity Color</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '6px' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: 'var(--radius-full)', backgroundColor: habitColor, border: '1px solid rgba(0,0,0,0.1)' }} />
              <span style={{ fontSize: '0.925rem', fontWeight: '700', color: 'var(--color-black)' }}>{habitColor}</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-grey)', fontWeight: '700', textTransform: 'uppercase' }}>Category</div>
            <div style={{ fontSize: '0.95rem', fontWeight: '700', textTransform: 'capitalize', marginTop: '4px', color: 'var(--color-black)' }}>
              {habit.category}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-grey)', fontWeight: '700', textTransform: 'uppercase' }}>Time of Day</div>
            <div style={{ fontSize: '0.95rem', fontWeight: '700', textTransform: 'capitalize', marginTop: '4px', color: 'var(--color-black)' }}>
              {habit.timeOfDay}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-grey)', fontWeight: '700', textTransform: 'uppercase' }}>Reminder Time</div>
            <div style={{ fontSize: '0.95rem', fontWeight: '700', marginTop: '4px', color: 'var(--color-black)' }}>
              {habit.reminderTime ? formatTime(habit.reminderTime) : 'No reminder'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-grey)', fontWeight: '700', textTransform: 'uppercase' }}>Target Days</div>
            <div style={{ fontSize: '0.95rem', fontWeight: '700', marginTop: '4px', color: 'var(--color-black)' }}>
              {targetDays.length === 7 ? 'Every Day' : targetDays.join(', ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
