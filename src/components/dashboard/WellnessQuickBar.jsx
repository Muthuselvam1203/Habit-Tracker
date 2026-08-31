import React from 'react';
import { Droplets, Moon, Smile, Zap, Plus, Clock, Play } from 'lucide-react';
import { formatDateKey } from '../../utils/dateUtils';

export const WellnessQuickBar = ({
  wellnessLogs = {},
  onAddWater,
  onUpdateWellness,
  onOpenFocus,
  onNavigate
}) => {
  const todayKey = formatDateKey(new Date());
  const todayData = wellnessLogs[todayKey] || {
    waterMl: 1500,
    waterTargetMl: 2000,
    mood: 'great',
    energy: 9,
    sleep: { durationMinutes: 475, rating: 5 }
  };

  const waterMl = todayData.waterMl || 0;
  const waterTarget = todayData.waterTargetMl || 2000;
  const glasses = Math.floor(waterMl / 250);
  const targetGlasses = Math.floor(waterTarget / 250);
  const waterPercent = Math.min(100, Math.round((waterMl / waterTarget) * 100));

  const MOODS = [
    { id: 'great', emoji: '😄', label: 'Great' },
    { id: 'good', emoji: '🙂', label: 'Good' },
    { id: 'okay', emoji: '😐', label: 'Okay' },
    { id: 'low', emoji: '😔', label: 'Low' },
    { id: 'bad', emoji: '😡', label: 'Bad' }
  ];

  const sleepHours = Math.floor((todayData.sleep?.durationMinutes || 475) / 60);
  const sleepMins = (todayData.sleep?.durationMinutes || 475) % 60;

  return (
    <div
      className="card"
      style={{
        padding: '1.25rem',
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--border-subtle)',
        marginBottom: '1.5rem'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--color-black)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Zap size={16} color="var(--primary-blue)" /> Daily Life & Wellness Vitals
        </h4>
        <button
          type="button"
          onClick={() => onNavigate && onNavigate('wellness')}
          style={{
            fontSize: '0.78rem',
            color: 'var(--primary-blue)',
            fontWeight: '700',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
        >
          View Full Wellness Hub →
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem'
        }}
      >
        {/* 1. Hydration Card */}
        <div
          style={{
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(6, 182, 212, 0.08)',
            border: '1px solid rgba(6, 182, 212, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '0.5rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Droplets size={16} color="#0891B2" />
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0891B2' }}>Hydration</span>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#0891B2' }}>
              {waterMl}ml ({waterPercent}%)
            </span>
          </div>

          {/* Glasses visual display */}
          <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {Array.from({ length: targetGlasses }).map((_, i) => (
              <span
                key={i}
                style={{
                  fontSize: '1rem',
                  opacity: i < glasses ? 1 : 0.25,
                  filter: i < glasses ? 'none' : 'grayscale(1)',
                  transition: 'all 0.2s'
                }}
              >
                💧
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.2rem' }}>
            <button
              type="button"
              onClick={() => onAddWater(250)}
              style={waterBtnStyle}
            >
              +250ml
            </button>
            <button
              type="button"
              onClick={() => onAddWater(500)}
              style={waterBtnStyle}
            >
              +500ml
            </button>
          </div>
        </div>

        {/* 2. Mood & Energy Card */}
        <div
          style={{
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '0.5rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Smile size={16} color="#D97706" />
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#D97706' }}>Mood & Energy</span>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#D97706' }}>
              ⚡ {todayData.energy || 8}/10
            </span>
          </div>

          {/* Mood Emoji Selectors */}
          <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'space-between' }}>
            {MOODS.map(m => {
              const isSelected = todayData.mood === m.id;
              return (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => onUpdateWellness({ mood: m.id })}
                  title={m.label}
                  style={{
                    flex: 1,
                    padding: '0.25rem 0',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isSelected ? '#FEF3C7' : 'rgba(255, 255, 255, 0.6)',
                    border: isSelected ? '1.5px solid #F59E0B' : '1px solid transparent',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    transform: isSelected ? 'scale(1.15)' : 'none',
                    transition: 'all 0.15s'
                  }}
                >
                  {m.emoji}
                </button>
              );
            })}
          </div>

          {/* Quick Energy Slider / Buttons */}
          <div style={{ display: 'flex', gap: '0.2rem', alignItems: 'center' }}>
            {[2, 4, 6, 8, 10].map(val => (
              <button
                key={val}
                type="button"
                onClick={() => onUpdateWellness({ energy: val })}
                style={{
                  flex: 1,
                  padding: '0.15rem 0',
                  fontSize: '0.675rem',
                  fontWeight: '700',
                  borderRadius: '4px',
                  backgroundColor: todayData.energy === val ? '#D97706' : 'rgba(245, 158, 11, 0.15)',
                  color: todayData.energy === val ? '#FFFFFF' : '#92400E',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Sleep & Focus Card */}
        <div
          style={{
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(99, 102, 241, 0.08)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '0.5rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Moon size={16} color="#4F46E5" />
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#4F46E5' }}>Sleep & Focus</span>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#4F46E5' }}>
              {sleepHours}h {sleepMins}m ⭐⭐⭐⭐⭐
            </span>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-grey)' }}>
            Restorative sleep logged: {todayData.sleep?.bedtime || '23:00'} → {todayData.sleep?.wakeTime || '06:45'}
          </div>

          <button
            type="button"
            onClick={onOpenFocus}
            style={{
              width: '100%',
              padding: '0.4rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: '#4F46E5',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '0.75rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              boxShadow: '0 2px 8px rgba(79, 70, 229, 0.3)'
            }}
          >
            <Play size={13} fill="#FFFFFF" /> Launch Focus Pomodoro
          </button>
        </div>
      </div>
    </div>
  );
};

const waterBtnStyle = {
  flex: 1,
  padding: '0.3rem 0.5rem',
  fontSize: '0.725rem',
  fontWeight: '700',
  borderRadius: 'var(--radius-xs)',
  backgroundColor: '#0891B2',
  color: '#FFFFFF',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.2rem'
};
