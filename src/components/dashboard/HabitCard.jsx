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
  CheckSquare
} from 'lucide-react';
import { calculateHabitStreak } from '../../utils/streakUtils';
import { getHabitColor } from '../../data/habitOptions';

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

export const HabitCard = ({
  habit,
  completions = {},
  onToggleCompletion,
  onOpenDetails,
  onOpenEdit,
  onToggleArchive,
  onDelete
}) => {
  const { currentStreak, isCompletedToday } = calculateHabitStreak(habit, completions);
  const IconComp = ICON_MAP[habit.icon] || Sparkles;
  const targetDays = habit.targetDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const frequencyLabel = targetDays.length === 7 ? 'Daily' : `${targetDays.length} days/wk`;
  const habitColor = getHabitColor(habit);

  return (
    <div
      className={`habit-card-item ${isCompletedToday ? 'is-completed' : ''}`}
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
          <div
            className="habit-name"
            onClick={() => onOpenDetails(habit)}
            title="Click to view details"
          >
            {habit.name}
          </div>

          <div className="habit-meta-row">
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
            {habit.timeOfDay && (
              <span className="habit-schedule-tag">• {habit.timeOfDay}</span>
            )}
          </div>
        </div>
      </div>

      {/* Right Area: Streak Pill & Action Buttons */}
      <div className="habit-card-right">
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

