import React, { useState } from 'react';
import { Button } from '../common/Button';
import {
  HABIT_CATEGORIES,
  HABIT_ICONS,
  HABIT_COLORS,
  MEASURABLE_UNITS,
  FREQUENCY_TYPES,
  TIME_OF_DAY_OPTIONS,
  PRESET_LIBRARY,
  getHabitColor
} from '../../data/habitOptions';
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
  Play,
  Zap,
  ShieldCheck,
  Award,
  Layers,
  ChevronDown
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
  Flame,
  ShieldCheck,
  Clock,
  Zap,
  Layers,
  Award
};

const ALL_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const HabitForm = ({ initialData, onSave, onCancel }) => {
  const [activeTab, setActiveTab] = useState(initialData ? 'custom' : 'presets');
  const [name, setName] = useState(initialData?.name || '');
  const [category, setCategory] = useState(initialData?.category || 'health');
  const [icon, setIcon] = useState(initialData?.icon || 'Sparkles');
  const [color, setColor] = useState(initialData?.color || getHabitColor(initialData) || '#10B981');
  const [timeOfDay, setTimeOfDay] = useState(initialData?.timeOfDay || 'anytime');
  const [habitType, setHabitType] = useState(initialData?.habitType || 'boolean');
  const [timerTargetMinutes, setTimerTargetMinutes] = useState(initialData?.timerTargetMinutes || 30);
  const [measurableUnit, setMeasurableUnit] = useState(initialData?.measurableUnit || 'ml');
  const [measurableTarget, setMeasurableTarget] = useState(initialData?.measurableTarget || 2000);
  const [measurableStep, setMeasurableStep] = useState(initialData?.measurableStep || 250);
  const [frequencyType, setFrequencyType] = useState(initialData?.frequencyType || 'daily');
  const [weeklyTargetDays, setWeeklyTargetDays] = useState(initialData?.weeklyTargetDays || 3);
  const [intervalDays, setIntervalDays] = useState(initialData?.intervalDays || 2);
  const [difficulty, setDifficulty] = useState(initialData?.difficulty || 'medium');
  const [targetDays, setTargetDays] = useState(initialData?.targetDays || ALL_DAYS);
  const [reminderTime, setReminderTime] = useState(initialData?.reminderTime || '08:00');
  const [description, setDescription] = useState(initialData?.description || '');

  const applyPreset = (preset) => {
    setName(preset.name);
    setCategory(preset.category || 'health');
    setIcon(preset.icon || 'Sparkles');
    setColor(preset.color || '#10B981');
    setTimeOfDay(preset.timeOfDay || 'anytime');
    setHabitType(preset.habitType || 'boolean');
    if (preset.timerTargetMinutes) setTimerTargetMinutes(preset.timerTargetMinutes);
    if (preset.measurableUnit) setMeasurableUnit(preset.measurableUnit);
    if (preset.measurableTarget) setMeasurableTarget(preset.measurableTarget);
    if (preset.measurableStep) setMeasurableStep(preset.measurableStep);
    if (preset.difficulty) setDifficulty(preset.difficulty);
    if (preset.reminderTime) setReminderTime(preset.reminderTime);
    if (preset.description) setDescription(preset.description);
    setActiveTab('custom');
  };

  const toggleDay = (day) => {
    if (targetDays.includes(day)) {
      if (targetDays.length > 1) {
        setTargetDays(targetDays.filter(d => d !== day));
      }
    } else {
      setTargetDays([...targetDays, day]);
    }
  };

  const handleUnitChange = (uId) => {
    setMeasurableUnit(uId);
    const unitObj = MEASURABLE_UNITS.find(u => u.id === uId);
    if (unitObj) {
      setMeasurableTarget(unitObj.defaultTarget);
      setMeasurableStep(unitObj.defaultStep);
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
      measurableStep: Number(measurableStep) || 1,
      frequencyType,
      weeklyTargetDays: Number(weeklyTargetDays) || 3,
      intervalDays: Number(intervalDays) || 2,
      difficulty,
      targetDays,
      reminderTime,
      description: description.trim()
    });
  };

  const PreviewIcon = ICON_MAP[icon] || Sparkles;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Tab Bar: Preset Library vs Custom Form */}
      {!initialData && (
        <div style={{ display: 'flex', backgroundColor: 'var(--bg-surface)', padding: '0.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`btn btn-sm ${activeTab === 'presets' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ flex: 1, fontWeight: '800', fontSize: '0.8rem' }}
          >
            ✨ Popular Presets
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('custom')}
            className={`btn btn-sm ${activeTab === 'custom' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ flex: 1, fontWeight: '800', fontSize: '0.8rem' }}
          >
            ⚙️ Custom Habit
          </button>
        </div>
      )}

      {activeTab === 'presets' ? (
        /* PRESET LIBRARY BROWSER */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '60vh', overflowY: 'auto', paddingRight: '0.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Choose a scientifically verified habit to populate configuration instantly:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.75rem' }}>
            {PRESET_LIBRARY.map((preset, idx) => {
              const PIcon = ICON_MAP[preset.icon] || Sparkles;
              return (
                <div
                  key={idx}
                  onClick={() => applyPreset(preset)}
                  className="card-hover"
                  style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid var(--border-subtle)`,
                    borderLeft: `4px solid ${preset.color}`,
                    backgroundColor: 'var(--bg-card)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: `${preset.color}15`,
                          color: preset.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <PIcon size={16} />
                      </div>
                      <span style={{ fontWeight: '800', fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                        {preset.name}
                      </span>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    {preset.description}
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.2rem' }}>
                    <span style={{ fontSize: '0.675rem', padding: '0.1rem 0.4rem', borderRadius: '4px', backgroundColor: `${preset.color}12`, color: preset.color, fontWeight: '700' }}>
                      {preset.category}
                    </span>
                    <span style={{ fontSize: '0.675rem', padding: '0.1rem 0.4rem', borderRadius: '4px', backgroundColor: 'var(--bg-surface)', color: 'var(--text-secondary)', fontWeight: '600' }}>
                      {preset.habitType}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* CUSTOM FORM */
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxHeight: '70vh', overflowY: 'auto', paddingRight: '0.25rem' }}>
          {/* Name & Live Badge */}
          <div className="form-group">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label className="form-label" htmlFor="habit-name-input" style={{ margin: 0, fontWeight: '800' }}>
                Habit / Action Name *
              </label>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.2rem 0.65rem',
                  borderRadius: '999px',
                  backgroundColor: `${color}18`,
                  color: color,
                  border: `1px solid ${color}35`,
                  fontSize: '0.775rem',
                  fontWeight: '800'
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
              placeholder="e.g. Walking, Deep Work Block, Drink 2L Water..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </div>

          {/* Tracking Mode: Yes/No, Measurable, Timer */}
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: '800' }}>Tracking Mode</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {[
                { id: 'boolean', label: 'Yes / No Check', icon: Check, desc: 'Simple check-off' },
                { id: 'measurable', label: 'Numeric Goal', icon: Target, desc: 'Count / Target' },
                { id: 'timer', label: 'Focus Timer', icon: Play, desc: 'Timed minutes' }
              ].map(t => {
                const isSelected = habitType === t.id;
                const TIcon = t.icon;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setHabitType(t.id)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.65rem 0.4rem',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected ? `2px solid ${color}` : '1px solid var(--border-subtle)',
                      backgroundColor: isSelected ? `${color}12` : 'var(--bg-surface)',
                      color: isSelected ? color : 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <TIcon size={18} />
                    <span style={{ fontSize: '0.8rem', fontWeight: '800' }}>{t.label}</span>
                    <span style={{ fontSize: '0.65rem', opacity: 0.8 }}>{t.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Details for Measurable / Timer Modes */}
          {habitType === 'measurable' && (
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.6rem' }}>
                <div>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Unit</label>
                  <select
                    className="form-input"
                    value={measurableUnit}
                    onChange={(e) => handleUnitChange(e.target.value)}
                    style={{ fontSize: '0.8rem', padding: '0.4rem' }}
                  >
                    {MEASURABLE_UNITS.map(u => (
                      <option key={u.id} value={u.id}>{u.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Daily Target</label>
                  <input
                    type="number"
                    min="1"
                    className="form-input"
                    value={measurableTarget}
                    onChange={(e) => setMeasurableTarget(Number(e.target.value))}
                    style={{ fontSize: '0.8rem', padding: '0.4rem' }}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Quick Step (+/-)</label>
                  <input
                    type="number"
                    min="1"
                    className="form-input"
                    value={measurableStep}
                    onChange={(e) => setMeasurableStep(Number(e.target.value))}
                    style={{ fontSize: '0.8rem', padding: '0.4rem' }}
                  />
                </div>
              </div>
            </div>
          )}

          {habitType === 'timer' && (
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Target Duration (Minutes)</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                  {[15, 25, 30, 45, 60, 90].map(mins => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setTimerTargetMinutes(mins)}
                      style={{
                        padding: '0.3rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        border: timerTargetMinutes === mins ? `2px solid ${color}` : '1px solid var(--border-subtle)',
                        backgroundColor: timerTargetMinutes === mins ? `${color}15` : 'var(--bg-card)',
                        color: timerTargetMinutes === mins ? color : 'var(--text-secondary)',
                        cursor: 'pointer'
                      }}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ width: '80px' }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Custom</label>
                <input
                  type="number"
                  min="1"
                  className="form-input"
                  value={timerTargetMinutes}
                  onChange={(e) => setTimerTargetMinutes(Number(e.target.value))}
                  style={{ fontSize: '0.8rem', padding: '0.35rem' }}
                />
              </div>
            </div>
          )}

          {/* Time of Day */}
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: '800' }}>Time of Day</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem' }}>
              {TIME_OF_DAY_OPTIONS.map(tod => {
                const isSelected = timeOfDay === tod.id;
                return (
                  <button
                    key={tod.id}
                    type="button"
                    onClick={() => setTimeOfDay(tod.id)}
                    style={{
                      padding: '0.5rem 0.25rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      textAlign: 'center',
                      border: isSelected ? `2px solid ${color}` : '1px solid var(--border-subtle)',
                      backgroundColor: isSelected ? `${color}15` : 'var(--bg-surface)',
                      color: isSelected ? color : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    {tod.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Frequency Type */}
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: '800' }}>Repeat Frequency</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginBottom: '0.65rem' }}>
              {FREQUENCY_TYPES.map(ft => {
                const isSelected = frequencyType === ft.id;
                return (
                  <button
                    key={ft.id}
                    type="button"
                    onClick={() => setFrequencyType(ft.id)}
                    style={{
                      padding: '0.5rem 0.65rem',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected ? `2px solid ${color}` : '1px solid var(--border-subtle)',
                      backgroundColor: isSelected ? `${color}12` : 'var(--bg-surface)',
                      color: isSelected ? color : 'var(--text-secondary)',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '0.775rem', fontWeight: '800' }}>{ft.label}</div>
                    <div style={{ fontSize: '0.675rem', opacity: 0.8 }}>{ft.desc}</div>
                  </button>
                );
              })}
            </div>

            {frequencyType === 'specific_days' && (
              <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'space-between' }}>
                {ALL_DAYS.map(day => {
                  const isDaySelected = targetDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      style={{
                        flex: 1,
                        padding: '0.4rem 0',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        fontWeight: '800',
                        border: isDaySelected ? `2px solid ${color}` : '1px solid var(--border-subtle)',
                        backgroundColor: isDaySelected ? color : 'var(--bg-surface)',
                        color: isDaySelected ? '#FFFFFF' : 'var(--text-secondary)',
                        cursor: 'pointer'
                      }}
                    >
                      {day[0]}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Category, Icon & Color Selectors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label className="form-label" style={{ fontWeight: '800' }}>Category</label>
              <select
                className="form-input"
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                style={{ fontSize: '0.85rem' }}
              >
                {HABIT_CATEGORIES.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label" style={{ fontWeight: '800' }}>Reminder Time</label>
              <input
                type="time"
                className="form-input"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                style={{ fontSize: '0.85rem' }}
              />
            </div>
          </div>

          {/* Icon Picker Strip */}
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: '800' }}>Habit Icon</label>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', maxHeight: '100px', overflowY: 'auto' }}>
              {HABIT_ICONS.map(iName => {
                const IComp = ICON_MAP[iName] || Sparkles;
                const isSelected = icon === iName;
                return (
                  <button
                    key={iName}
                    type="button"
                    onClick={() => setIcon(iName)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected ? `2px solid ${color}` : '1px solid var(--border-subtle)',
                      backgroundColor: isSelected ? `${color}20` : 'var(--bg-surface)',
                      color: isSelected ? color : 'var(--text-secondary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <IComp size={18} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Palette */}
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: '800' }}>Accent Theme Color</label>
            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
              {HABIT_COLORS.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColor(c.hex)}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '999px',
                    backgroundColor: c.hex,
                    border: color === c.hex ? '3px solid var(--text-primary)' : '2px solid transparent',
                    cursor: 'pointer'
                  }}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          {/* Description & Motivation Note */}
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: '800' }}>Why is this habit important? (Motivation Note)</label>
            <textarea
              className="form-input"
              rows={2}
              placeholder="e.g. Build unstoppable momentum and protect my long-term cognitive vitality."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ fontSize: '0.85rem' }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" style={{ backgroundColor: color, borderColor: color }}>
              {initialData ? 'Save Changes' : 'Create Habit 🚀'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
