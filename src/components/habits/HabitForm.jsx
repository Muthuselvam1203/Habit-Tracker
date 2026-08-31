import React, { useState } from 'react';
import { Button } from '../common/Button';
import { HABIT_CATEGORIES, HABIT_ICONS, HABIT_COLORS, getHabitColor } from '../../data/habitOptions';
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
  Check
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
  const [color, setColor] = useState(initialData?.color || getHabitColor(initialData) || '#10B981');
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

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    // If color hasn't been explicitly customized, suggest category color
    if (!initialData?.color) {
      const catObj = HABIT_CATEGORIES.find(c => c.id === newCat);
      if (catObj?.color) setColor(catObj.color);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name: name.trim(),
      category,
      icon,
      color,
      timeOfDay,
      targetDays,
      reminderTime,
      description: description.trim()
    });
  };

  const PreviewIcon = ICON_MAP[icon] || Sparkles;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Activity Name & Live Preview Banner */}
      <div className="form-group">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <label className="form-label" htmlFor="habit-name-input" style={{ margin: 0 }}>
            <span>Activity / Habit Name *</span>
          </label>
          {/* Live Preview Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.2rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: `${color}18`,
              color: color,
              border: `1px solid ${color}35`,
              fontSize: '0.775rem',
              fontWeight: '700'
            }}
          >
            <PreviewIcon size={14} />
            <span>{name.trim() || 'Preview'}</span>
          </div>
        </div>
        <input
          id="habit-name-input"
          type="text"
          className="form-input"
          placeholder="e.g. Walking, Sleep over 8h, Meditation, Read 20 pages..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />
      </div>

      {/* Category & Time of Day */}
      <div className="form-row-2col">
        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
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

      {/* Activity Color Picker Swatches */}
      <div className="form-group">
        <label className="form-label">Activity Color</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem', marginTop: '0.25rem' }}>
          {HABIT_COLORS.map(c => {
            const isSelected = color.toLowerCase() === c.hex.toLowerCase();
            return (
              <button
                type="button"
                key={c.id}
                onClick={() => setColor(c.hex)}
                title={c.label}
                style={{
                  height: '38px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: c.hex,
                  border: isSelected ? '2.5px solid var(--color-black)' : '1px solid rgba(0,0,0,0.1)',
                  boxShadow: isSelected ? `0 0 0 2px ${c.hex}80` : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transform: isSelected ? 'scale(1.06)' : 'scale(1)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {isSelected && <Check size={16} color="#FFFFFF" strokeWidth={3} />}
              </button>
            );
          })}
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
                  backgroundColor: isSelected ? `${color}25` : 'var(--color-light-grey)',
                  color: isSelected ? color : 'var(--color-text-grey)',
                  border: `1.5px solid ${isSelected ? color : 'var(--border-subtle)'}`,
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
