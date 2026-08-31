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
  Check,
  Play
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
  const [habitType, setHabitType] = useState(initialData?.habitType || 'boolean');
  const [timerTargetMinutes, setTimerTargetMinutes] = useState(initialData?.timerTargetMinutes || 30);
  const [measurableUnit, setMeasurableUnit] = useState(initialData?.measurableUnit || 'pages');
  const [measurableTarget, setMeasurableTarget] = useState(initialData?.measurableTarget || 20);
  const [difficulty, setDifficulty] = useState(initialData?.difficulty || 'medium');
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
      habitType,
      timerTargetMinutes: Number(timerTargetMinutes) || 30,
      measurableUnit,
      measurableTarget: Number(measurableTarget) || 1,
      difficulty,
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
            <span>Habit / Action Name *</span>
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
          placeholder="e.g. Walking, Deep Work & Coding, Read 20 pages, Meditation..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />
      </div>

      {/* Habit Type Selector (Boolean / Timer / Measurable) */}
      <div className="form-group">
        <label className="form-label">Tracking Mode</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
          {[
            { id: 'boolean', label: '✓ Yes / No', desc: 'Standard check-in' },
            { id: 'timer', label: '⏱️ Timed', desc: 'Target duration' },
            { id: 'measurable', label: '🎯 Measurable', desc: 'Pages, glasses, etc' }
          ].map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setHabitType(t.id)}
              style={{
                padding: '0.65rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: habitType === t.id ? 'var(--primary-blue-light)' : 'var(--color-light-grey)',
                border: habitType === t.id ? '2px solid var(--primary-blue)' : '1px solid var(--border-subtle)',
                color: habitType === t.id ? 'var(--primary-blue)' : 'var(--color-black)',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '0.85rem', fontWeight: '800' }}>{t.label}</div>
              <div style={{ fontSize: '0.675rem', color: 'var(--color-text-grey)', marginTop: '2px' }}>{t.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Conditional Inputs based on Habit Type */}
      {habitType === 'timer' && (
        <div className="form-group anim-scale-in">
          <label className="form-label">Target Duration (Minutes)</label>
          <input
            type="number"
            min="1"
            max="720"
            className="form-input"
            value={timerTargetMinutes}
            onChange={(e) => setTimerTargetMinutes(e.target.value)}
          />
        </div>
      )}

      {habitType === 'measurable' && (
        <div className="form-row-2col anim-scale-in">
          <div className="form-group">
            <label className="form-label">Target Value</label>
            <input
              type="number"
              min="1"
              max="100000"
              className="form-input"
              value={measurableTarget}
              onChange={(e) => setMeasurableTarget(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Unit of Measure</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. pages, steps, glasses"
              value={measurableUnit}
              onChange={(e) => setMeasurableUnit(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Difficulty Rating */}
      <div className="form-group">
        <label className="form-label">Difficulty Level (Influences XP & Life Score)</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem' }}>
          {[
            { id: 'easy', label: 'Easy', xp: '+20 XP', color: '#10B981' },
            { id: 'medium', label: 'Medium', xp: '+25 XP', color: '#3B82F6' },
            { id: 'hard', label: 'Hard', xp: '+35 XP', color: '#F59E0B' },
            { id: 'extreme', label: 'Extreme', xp: '+50 XP', color: '#EF4444' }
          ].map(d => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDifficulty(d.id)}
              style={{
                padding: '0.5rem 0.25rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: difficulty === d.id ? `${d.color}20` : 'var(--color-light-grey)',
                border: difficulty === d.id ? `2px solid ${d.color}` : '1px solid var(--border-subtle)',
                color: difficulty === d.id ? d.color : 'var(--color-black)',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '0.8rem', fontWeight: '800' }}>{d.label}</div>
              <div style={{ fontSize: '0.675rem', fontWeight: '700', opacity: 0.85 }}>{d.xp}</div>
            </button>
          ))}
        </div>
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
