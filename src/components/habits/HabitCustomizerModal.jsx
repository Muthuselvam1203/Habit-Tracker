import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Sun,
  Moon,
  Clock,
  Zap,
  Footprints,
  Dumbbell,
  Droplet,
  Flame,
  Brain,
  PenTool,
  BookOpen,
  Target,
  ShieldCheck,
  Smile,
  Users,
  Coffee,
  HeartPulse,
  Sparkles,
  Ban,
  Bike,
  Check
} from 'lucide-react';
import { HABIT_COLORS, MEASURABLE_UNITS } from '../../data/habitOptions';

const ICON_PICKER_LIST = [
  { id: 'Footprints', icon: Footprints },
  { id: 'Dumbbell', icon: Dumbbell },
  { id: 'Droplet', icon: Droplet },
  { id: 'Bike', icon: Bike },
  { id: 'Sun', icon: Sun },
  { id: 'Moon', icon: Moon },
  { id: 'Brain', icon: Brain },
  { id: 'PenTool', icon: PenTool },
  { id: 'BookOpen', icon: BookOpen },
  { id: 'Target', icon: Target },
  { id: 'Smile', icon: Smile },
  { id: 'ShieldCheck', icon: ShieldCheck },
  { id: 'HeartPulse', icon: HeartPulse },
  { id: 'Coffee', icon: Coffee },
  { id: 'Sparkles', icon: Sparkles },
  { id: 'Ban', icon: Ban }
];

export const HabitCustomizerModal = ({
  initialHabit,
  onSave,
  onClose
}) => {
  const [name, setName] = useState(initialHabit?.name || 'Walking');
  const [icon, setIcon] = useState(initialHabit?.icon || 'Footprints');
  const [color, setColor] = useState(initialHabit?.color || '#06B6D4');
  const [repeat, setRepeat] = useState(initialHabit?.frequencyType || 'Everyday');
  const [goalType, setGoalType] = useState(initialHabit?.habitType || 'timer');
  const [timerMins, setTimerMins] = useState(initialHabit?.timerTargetMinutes || 30);
  const [measurableTarget, setMeasurableTarget] = useState(initialHabit?.measurableTarget || 2000);
  const [measurableUnit, setMeasurableUnit] = useState(initialHabit?.measurableUnit || 'ml');
  const [timePeriod, setTimePeriod] = useState(initialHabit?.timeOfDay || 'anytime');

  // Sub-sheets toggles
  const [showIconSheet, setShowIconSheet] = useState(false);
  const [showColorSheet, setShowColorSheet] = useState(false);
  const [showGoalSheet, setShowGoalSheet] = useState(false);
  const [showRepeatSheet, setShowRepeatSheet] = useState(false);

  const CurrentIconComp = ICON_PICKER_LIST.find(i => i.id === icon)?.icon || Footprints;

  const handleSave = () => {
    onSave({
      name: name.trim() || 'New Habit',
      icon,
      color,
      timeOfDay: timePeriod,
      habitType: goalType,
      timerTargetMinutes: Number(timerMins) || 30,
      measurableTarget: Number(measurableTarget) || 1,
      measurableUnit,
      frequencyType: repeat === 'Everyday' ? 'daily' : 'specific_days'
    });
    onClose();
  };

  const getGoalDisplay = () => {
    if (goalType === 'timer') return `${timerMins} min`;
    if (goalType === 'measurable') return `${measurableTarget} ${measurableUnit}`;
    return 'Yes / No Check';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content anim-scale-in"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '440px',
          backgroundColor: '#0F1115',
          borderRadius: '28px',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#FFFFFF'
        }}
      >
        {/* Top Header: Back Arrow + Editable Habit Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.25rem'
            }}
          >
            <ArrowLeft size={24} />
          </button>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Habit Name"
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.65rem',
              fontWeight: '900',
              color: '#FFFFFF',
              outline: 'none',
              flex: 1,
              letterSpacing: '-0.02em'
            }}
            autoFocus
          />
        </div>

        {/* 100% CUSTOMIZABLE Dark Card matching Screenshot 1 */}
        <div className="tickit-customizer-card">
          {/* Row 1: Change Icon */}
          <div
            className="tickit-customizer-row"
            onClick={() => {
              setShowIconSheet(!showIconSheet);
              setShowColorSheet(false);
              setShowGoalSheet(false);
              setShowRepeatSheet(false);
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  backgroundColor: `${color}20`,
                  color: color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <CurrentIconComp size={22} />
              </div>
              <span className="row-label">Change Icon</span>
            </div>
            <ChevronRight size={18} color="#6B7280" />
          </div>

          {/* Row 2: Color */}
          <div
            className="tickit-customizer-row"
            onClick={() => {
              setShowColorSheet(!showColorSheet);
              setShowIconSheet(false);
              setShowGoalSheet(false);
              setShowRepeatSheet(false);
            }}
          >
            <span className="row-label">Color</span>
            <div className="row-value">
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: color,
                  border: '2px solid rgba(255, 255, 255, 0.4)'
                }}
              />
              <ChevronRight size={18} color="#6B7280" />
            </div>
          </div>

          {/* Row 3: Repeat */}
          <div
            className="tickit-customizer-row"
            onClick={() => {
              setShowRepeatSheet(!showRepeatSheet);
              setShowColorSheet(false);
              setShowIconSheet(false);
              setShowGoalSheet(false);
            }}
          >
            <span className="row-label">Repeat</span>
            <div className="row-value">
              <span>{repeat}</span>
              <ChevronRight size={18} color="#6B7280" />
            </div>
          </div>

          {/* Row 4: Goal */}
          <div
            className="tickit-customizer-row"
            onClick={() => {
              setShowGoalSheet(!showGoalSheet);
              setShowColorSheet(false);
              setShowIconSheet(false);
              setShowRepeatSheet(false);
            }}
          >
            <span className="row-label">Goal</span>
            <div className="row-value">
              <span>{getGoalDisplay()}</span>
              <ChevronRight size={18} color="#6B7280" />
            </div>
          </div>
        </div>

        {/* BOTTOM ICON SHEET */}
        {showIconSheet && (
          <div style={{ marginTop: '0.85rem', padding: '1rem', backgroundColor: '#14171E', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#9CA3AF', textTransform: 'uppercase', marginBottom: '0.65rem' }}>Select Icon</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
              {ICON_PICKER_LIST.map(item => {
                const IIcon = item.icon;
                const isSelected = icon === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setIcon(item.id);
                      setShowIconSheet(false);
                    }}
                    style={{
                      height: '48px',
                      borderRadius: '12px',
                      backgroundColor: isSelected ? color : '#1C2029',
                      color: isSelected ? '#FFFFFF' : '#9CA3AF',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    <IIcon size={22} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* BOTTOM COLOR SHEET matching Screenshot 1 Swatches */}
        {showColorSheet && (
          <div style={{ marginTop: '0.85rem', padding: '1rem', backgroundColor: '#14171E', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#9CA3AF', textTransform: 'uppercase', marginBottom: '0.65rem' }}>Select Color</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
              {HABIT_COLORS.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setColor(c.hex);
                    setShowColorSheet(false);
                  }}
                  style={{
                    height: '46px',
                    borderRadius: '12px',
                    backgroundColor: c.hex,
                    border: color === c.hex ? '3px solid #FFFFFF' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                  }}
                >
                  {color === c.hex && <Check size={18} color="#FFFFFF" strokeWidth={3} />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* BOTTOM GOAL SHEET */}
        {showGoalSheet && (
          <div style={{ marginTop: '0.85rem', padding: '1rem', backgroundColor: '#14171E', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#9CA3AF', textTransform: 'uppercase' }}>Target Goal Mode</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
              {[
                { id: 'timer', label: '⏱️ Duration' },
                { id: 'measurable', label: '🎯 Count' },
                { id: 'boolean', label: '✓ Yes/No' }
              ].map(g => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoalType(g.id)}
                  style={{
                    padding: '0.6rem 0.3rem',
                    borderRadius: '10px',
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    backgroundColor: goalType === g.id ? '#2563EB' : '#1C2029',
                    color: goalType === g.id ? '#FFFFFF' : '#9CA3AF',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {g.label}
                </button>
              ))}
            </div>

            {goalType === 'timer' && (
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.35rem' }}>
                {[15, 20, 30, 45, 60].map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setTimerMins(m);
                      setShowGoalSheet(false);
                    }}
                    style={{
                      flex: 1,
                      padding: '0.45rem 0',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      backgroundColor: timerMins === m ? color : '#1C2029',
                      color: '#FFFFFF',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            )}

            {goalType === 'measurable' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.35rem' }}>
                <input
                  type="number"
                  value={measurableTarget}
                  onChange={e => setMeasurableTarget(Number(e.target.value))}
                  style={{ padding: '0.5rem', backgroundColor: '#1C2029', border: '1px solid #374151', color: '#FFF', borderRadius: '8px', fontSize: '0.85rem' }}
                />
                <select
                  value={measurableUnit}
                  onChange={e => setMeasurableUnit(e.target.value)}
                  style={{ padding: '0.5rem', backgroundColor: '#1C2029', border: '1px solid #374151', color: '#FFF', borderRadius: '8px', fontSize: '0.85rem' }}
                >
                  {MEASURABLE_UNITS.map(u => (
                    <option key={u.id} value={u.id}>{u.label}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* TIME PERIOD SECTION matching Screenshot 1 */}
        <div style={{ marginTop: '1.25rem' }}>
          <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '0.25rem' }}>
            Time Period
          </div>

          <div className="tickit-time-period-grid">
            <button
              type="button"
              onClick={() => setTimePeriod('anytime')}
              className={`tickit-time-btn ${timePeriod === 'anytime' ? 'active' : ''}`}
            >
              Anytime
            </button>

            <button
              type="button"
              onClick={() => setTimePeriod('morning')}
              className={`tickit-time-btn ${timePeriod === 'morning' ? 'active' : ''}`}
            >
              <Sun size={18} /> Morning
            </button>

            <button
              type="button"
              onClick={() => setTimePeriod('afternoon')}
              className={`tickit-time-btn ${timePeriod === 'afternoon' ? 'active' : ''}`}
            >
              <Zap size={18} /> Afternoon
            </button>

            <button
              type="button"
              onClick={() => setTimePeriod('evening')}
              className={`tickit-time-btn ${timePeriod === 'evening' ? 'active' : ''}`}
            >
              <Moon size={18} /> Evening
            </button>
          </div>
        </div>

        {/* Bottom Action Save Button */}
        <div style={{ marginTop: '1.75rem', display: 'flex', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: '0.9rem',
              borderRadius: '16px',
              backgroundColor: '#1E222B',
              color: '#9CA3AF',
              fontWeight: '800',
              fontSize: '0.95rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            style={{
              flex: 2,
              padding: '0.9rem',
              borderRadius: '16px',
              backgroundColor: color,
              color: '#FFFFFF',
              fontWeight: '900',
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: `0 4px 16px ${color}50`
            }}
          >
            Save Habit ✓
          </button>
        </div>
      </div>
    </div>
  );
};
