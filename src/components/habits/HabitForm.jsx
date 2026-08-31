import React, { useState } from 'react';
import { Button } from '../common/Button';
import { HABIT_CATEGORIES, HABIT_ICONS } from '../../data/habitOptions';
import {
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
  Calendar
} from 'lucide-react';

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

const ALL_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const HabitForm = ({ initialData, onSave, onCancel }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [category, setCategory] = useState(initialData?.category || 'health');
  const [icon, setIcon] = useState(initialData?.icon || 'Sparkles');
  const [timeOfDay, setTimeOfDay] = useState(initialData?.timeOfDay || 'morning');
  const [targetDays, setTargetDays] = useState(initialData?.targetDays || ALL_DAYS);
  const [reminderTime, setReminderTime] = useState(initialData?.reminderTime || '08:00');
  const [description, setDescription] = useState(initialData?.description || '');

  const toggleDay = (day) => {
    if (targetDays.includes(day)) {
      if (targetDays.length > 1) {
        setTargetDays(targetDays.filter(d => d !== day));
      }
    } else {
      setTargetDays([...targetDays, day]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name: name.trim(),
      category,
      icon,
      timeOfDay,
      targetDays,
      reminderTime,
      description: description.trim()
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Habit Name */}
      <div className="form-group">
        <label className="form-label" htmlFor="habit-name-input">
          <span>Habit Name *</span>
        </label>
        <input
          id="habit-name-input"
          type="text"
          className="form-input"
          placeholder="e.g. Read 20 pages, Morning Run..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />
      </div>

      {/* Category & Time of Day */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {HABIT_CATEGORIES.filter(c => c.id !== 'all').map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Time of Day</label>
          <select
            className="form-select"
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value)}
          >
            <option value="morning">Morning 🌅</option>
            <option value="afternoon">Afternoon ☀️</option>
            <option value="evening">Evening 🌙</option>
            <option value="anytime">Anytime ⏱️</option>
          </select>
        </div>
      </div>

      {/* Icon Picker */}
      <div className="form-group">
        <label className="form-label">Select Icon</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
          {HABIT_ICONS.map(iconKey => {
            const IconComp = ICON_MAP[iconKey] || Sparkles;
            const isSelected = icon === iconKey;

            return (
              <button
                type="button"
                key={iconKey}
                onClick={() => setIcon(iconKey)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isSelected ? 'var(--color-deep-navy)' : 'var(--color-light-grey)',
                  color: isSelected ? 'var(--color-white)' : 'var(--color-text-grey)',
                  border: `1.5px solid ${isSelected ? 'var(--color-deep-navy)' : 'var(--border-subtle)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <IconComp size={18} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Schedule Days */}
      <div className="form-group">
        <label className="form-label">Repeat Schedule</label>
        <div className="day-selector-group">
          {ALL_DAYS.map(day => (
            <button
              type="button"
              key={day}
              className={`day-chip ${targetDays.includes(day) ? 'active' : ''}`}
              onClick={() => toggleDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Reminder Time */}
      <div className="form-group">
        <label className="form-label">
          <span>Reminder Time</span>
          <span className="form-hint">Optional</span>
        </label>
        <div className="input-with-icon">
          <Clock className="input-icon-left" size={16} />
          <input
            type="time"
            className="form-input"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
          />
        </div>
      </div>

      {/* Notes / Description */}
      <div className="form-group">
        <label className="form-label">Why does this habit matter?</label>
        <textarea
          className="form-textarea"
          rows={2}
          placeholder="e.g. Clears my mind and prepares me for deep work."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
        {onCancel && (
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button variant="primary" type="submit" disabled={!name.trim()}>
          {initialData ? 'Save Changes' : 'Create Habit'}
        </Button>
      </div>
    </form>
  );
};
