import React, { useState } from 'react';
import {
  Check,
  Flame,
  MoreVertical,
  Edit3,
  Archive,
  Trash2,
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
  Clock,
  Play,
  Layers,
  Plus,
  Minus,
  MessageSquare,
  ShieldCheck,
  Zap,
  Award
} from 'lucide-react';
import { calculateHabitStreak } from '../../utils/streakUtils';
import { getHabitColor } from '../../data/habitOptions';
import { formatDateKey, formatTime } from '../../utils/dateUtils';

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
  Flame,
  Clock,
  Layers,
  ShieldCheck,
  Zap,
  Award
};

export const HabitCard = ({
  habit,
  completions = {},
  dateKey = formatDateKey(new Date()),
  onToggleCompletion,
  onIncrement,
  onLogNote,
  onOpenDetails,
  onOpenEdit,
  onToggleArchive,
  onDelete,
  onStartTimer
}) => {
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [noteText, setNoteText] = useState('');

  const { currentStreak, isCompletedToday } = calculateHabitStreak(habit, completions);
  const IconComp = ICON_MAP[habit.icon] || Sparkles;
  const habitColor = getHabitColor(habit);

  const habitLog = completions[habit.id]?.[dateKey] || {};
  const currentMeasurableValue = habitLog.measurableValue || 0;
  const targetValue = habit.measurableTarget || 1;
  const step = habit.measurableStep || 1;
  const measurablePercent = Math.min(100, Math.round((currentMeasurableValue / targetValue) * 100));

  const targetDays = habit.targetDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  let frequencyLabel = 'Daily';
  if (habit.frequencyType === 'weekly_target') {
    frequencyLabel = `${habit.weeklyTargetDays || 3}x/wk`;
  } else if (habit.frequencyType === 'interval') {
    frequencyLabel = `Every ${habit.intervalDays || 2}d`;
  } else if (targetDays.length < 7) {
    frequencyLabel = `${targetDays.length}d/wk`;
  }

  const difficultyColors = {
    easy: '#10B981',
    medium: '#3B82F6',
    hard: '#F59E0B',
    extreme: '#EF4444'
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (onLogNote) {
      onLogNote(habit.id, dateKey, noteText);
    }
    setIsNoteOpen(false);
  };

  return (
    <div
      className={`habit-card-item anim-scale-in ${isCompletedToday ? 'is-completed' : ''}`}
      style={{
        borderLeft: `4px solid ${habitColor}`,
        position: 'relative'
      }}
    >
      {/* Left Area: Checkbox, Icon, Name & Metadata */}
      <div className="habit-card-left">
        <button
          type="button"
          onClick={() => onToggleCompletion(habit.id, dateKey)}
          className={`habit-checkbox ${isCompletedToday ? 'checked' : ''}`}
          style={{
            backgroundColor: isCompletedToday ? habitColor : 'var(--color-white)',
            borderColor: isCompletedToday ? habitColor : undefined,
            boxShadow: isCompletedToday ? `0 2px 10px ${habitColor}50` : undefined
          }}
          aria-label={`Mark ${habit.name} as ${isCompletedToday ? 'incomplete' : 'complete'}`}
        >
          {isCompletedToday && <Check size={18} strokeWidth={3} />}
        </button>

        <div
          className="habit-icon-avatar"
          style={{
            backgroundColor: `${habitColor}15`,
            color: habitColor,
            border: `1px solid ${habitColor}30`
          }}
        >
          <IconComp size={18} />
        </div>

        <div className="habit-details-box" style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <div
              className="habit-name"
              onClick={() => onOpenDetails && onOpenDetails(habit)}
              title="Click to view details"
            >
              {habit.name}
            </div>

            {habit.difficulty && (
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  padding: '0.1rem 0.35rem',
                  borderRadius: '4px',
                  backgroundColor: `${difficultyColors[habit.difficulty] || '#3B82F6'}15`,
                  color: difficultyColors[habit.difficulty] || '#3B82F6'
                }}
              >
                {habit.difficulty}
              </span>
            )}

            {habit.timeOfDay && habit.timeOfDay !== 'anytime' && (
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  textTransform: 'capitalize',
                  padding: '0.1rem 0.35rem',
                  borderRadius: '4px',
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--text-secondary)'
                }}
              >
                {habit.timeOfDay}
              </span>
            )}
          </div>

          <div className="habit-meta-row" style={{ marginTop: '0.2rem' }}>
            <span
              className="habit-category-tag"
              style={{
                backgroundColor: `${habitColor}12`,
                color: habitColor,
                fontWeight: '700'
              }}
            >
              {habit.category || 'health'}
            </span>
            <span className="habit-schedule-tag">• {frequencyLabel}</span>
            {habit.reminderTime && (
              <span className="habit-schedule-tag">• ⏰ {formatTime(habit.reminderTime)}</span>
            )}
            {habit.habitType === 'timer' && (
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  color: '#6366F1',
                  backgroundColor: '#EEF2FF',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '4px'
                }}
              >
                ⏱️ {habit.timerTargetMinutes || 30}m
              </span>
            )}
            {habit.habitType === 'measurable' && (
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  color: habitColor,
                  backgroundColor: `${habitColor}12`,
                  padding: '0.1rem 0.4rem',
                  borderRadius: '4px'
                }}
              >
                🎯 {currentMeasurableValue} / {habit.measurableTarget} {habit.measurableUnit}
              </span>
            )}
            {habitLog.notes && (
              <span
                title={habitLog.notes}
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-secondary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.2rem'
                }}
              >
                <MessageSquare size={12} /> Note
              </span>
            )}
          </div>

          {/* Measurable Progress Bar */}
          {habit.habitType === 'measurable' && (
            <div style={{ width: '100%', maxWidth: '220px', height: '4px', backgroundColor: 'var(--bg-surface)', borderRadius: '999px', marginTop: '0.35rem', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${measurablePercent}%`,
                  height: '100%',
                  backgroundColor: habitColor,
                  borderRadius: '999px',
                  transition: 'width 0.2s ease'
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Right Area: Stepper / Timer / Actions & Streak */}
      <div className="habit-card-right" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {/* Measurable Counter Controls */}
        {habit.habitType === 'measurable' && onIncrement && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', backgroundColor: 'var(--bg-surface)', padding: '0.2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <button
              type="button"
              onClick={() => onIncrement(habit.id, -step, dateKey)}
              disabled={currentMeasurableValue <= 0}
              className="btn btn-ghost btn-sm"
              style={{ width: '26px', height: '26px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title={`Minus ${step} ${habit.measurableUnit}`}
            >
              <Minus size={13} />
            </button>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', minWidth: '40px', textAlign: 'center', color: habitColor }}>
              {currentMeasurableValue}
            </span>
            <button
              type="button"
              onClick={() => onIncrement(habit.id, step, dateKey)}
              className="btn btn-ghost btn-sm"
              style={{ width: '26px', height: '26px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: habitColor }}
              title={`Add +${step} ${habit.measurableUnit}`}
            >
              <Plus size={13} />
            </button>
          </div>
        )}

        {/* Start Focus Timer Button */}
        {habit.habitType === 'timer' && onStartTimer && (
          <button
            type="button"
            onClick={() => onStartTimer(habit)}
            className="btn btn-secondary btn-sm"
            style={{
              padding: '0.25rem 0.55rem',
              fontSize: '0.725rem',
              fontWeight: '700',
              color: habitColor,
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
            title="Start focus timer for this habit"
          >
            <Play size={12} /> Focus
          </button>
        )}

        {/* Streak Pill */}
        <div
          className="habit-streak-pill"
          style={{
            backgroundColor: `${habitColor}14`,
            color: habitColor,
            border: `1px solid ${habitColor}28`
          }}
          title={`${currentStreak} day streak`}
        >
          <Flame size={14} />
          <span>{currentStreak}d</span>
        </div>

        {/* Hover / Action Icons */}
        <div className="habit-actions-group">
          {onLogNote && (
            <button
              type="button"
              onClick={() => {
                setNoteText(habitLog.notes || '');
                setIsNoteOpen(true);
              }}
              className="btn btn-ghost btn-icon btn-sm"
              title="Add habit reflection note"
            >
              <MessageSquare size={14} />
            </button>
          )}

          {onOpenEdit && (
            <button
              type="button"
              onClick={() => onOpenEdit(habit)}
              className="btn btn-ghost btn-icon btn-sm"
              title="Edit habit"
            >
              <Edit3 size={15} />
            </button>
          )}

          {onToggleArchive && (
            <button
              type="button"
              onClick={() => onToggleArchive(habit.id)}
              className="btn btn-ghost btn-icon btn-sm"
              title={habit.archived ? 'Unarchive' : 'Archive'}
            >
              <Archive size={15} />
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(habit.id)}
              className="btn btn-ghost btn-icon btn-sm"
              style={{ color: '#991B1B' }}
              title="Delete habit"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Habit Reflection Note Popover */}
      {isNoteOpen && (
        <div
          style={{
            position: 'absolute',
            right: '1rem',
            top: '100%',
            marginTop: '0.5rem',
            width: '280px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            padding: '1rem',
            zIndex: 30
          }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{ fontSize: '0.8rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
            📝 Habit Diary Memo
          </div>
          <textarea
            className="form-input"
            rows={3}
            placeholder="How did this habit go today? Reflections, feelings, or notes..."
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
            style={{ width: '100%', fontSize: '0.8rem', resize: 'vertical' }}
            autoFocus
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setIsNoteOpen(false)}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.75rem' }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveNote}
              className="btn btn-primary btn-sm"
              style={{ fontSize: '0.75rem' }}
            >
              Save Memo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
