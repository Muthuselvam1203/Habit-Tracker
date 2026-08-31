import React from 'react';
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
  Layers
} from 'lucide-react';
import { calculateHabitStreak } from '../../utils/streakUtils';
import { getHabitColor } from '../../data/habitOptions';
import { formatTime } from '../../utils/dateUtils';

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
  Layers
};

export const HabitCard = ({
  habit,
  completions = {},
  onToggleCompletion,
  onOpenDetails,
  onOpenEdit,
  onToggleArchive,
  onDelete,
  onStartTimer
}) => {
  const { currentStreak, isCompletedToday } = calculateHabitStreak(habit, completions);
  const IconComp = ICON_MAP[habit.icon] || Sparkles;
  const targetDays = habit.targetDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const frequencyLabel = targetDays.length === 7 ? 'Daily' : `${targetDays.length}d/wk`;
  const habitColor = getHabitColor(habit);

  const difficultyColors = {
    easy: '#10B981',
    medium: '#3B82F6',
    hard: '#F59E0B',
    extreme: '#EF4444'
  };

  return (
    <div
      className={`habit-card-item anim-scale-in ${isCompletedToday ? 'is-completed' : ''}`}
      style={{
        borderLeft: `4px solid ${habitColor}`
      }}
    >
      {/* Left Area: Checkbox, Icon, Name & Metadata */}
      <div className="habit-card-left">
        <button
          type="button"
          onClick={() => onToggleCompletion(habit.id)}
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

        <div className="habit-details-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <div
              className="habit-name"
              onClick={() => onOpenDetails(habit)}
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
                  color: '#0891B2',
                  backgroundColor: '#ECFEFF',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '4px'
                }}
              >
                🎯 {habit.measurableTarget} {habit.measurableUnit}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right Area: Action Buttons & Streak */}
      <div className="habit-card-right">
        {habit.habitType === 'timer' && onStartTimer && (
          <button
            type="button"
            onClick={() => onStartTimer(habit)}
            className="btn btn-secondary btn-sm"
            style={{
              padding: '0.25rem 0.5rem',
              fontSize: '0.725rem',
              fontWeight: '700',
              color: habitColor
            }}
            title="Start timer for this habit"
          >
            <Play size={12} /> Start
          </button>
        )}

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

        {/* Hover Action Buttons */}
        <div className="habit-actions-group">
          {onOpenEdit && (
            <button
              onClick={() => onOpenEdit(habit)}
              className="btn btn-ghost btn-icon btn-sm"
              title="Edit habit"
            >
              <Edit3 size={15} />
            </button>
          )}

          {onToggleArchive && (
            <button
              onClick={() => onToggleArchive(habit.id)}
              className="btn btn-ghost btn-icon btn-sm"
              title={habit.archived ? 'Unarchive' : 'Archive'}
            >
              <Archive size={15} />
            </button>
          )}

          {onDelete && (
            <button
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
    </div>
  );
};
