import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Check, X, Sparkles, Zap, Flame, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FocusModal = ({
  isOpen,
  onClose,
  habits = [],
  initialHabit = null,
  onLogFocus
}) => {
  const [selectedHabitId, setSelectedHabitId] = useState(initialHabit?.id || '');
  const [targetMinutes, setTargetMinutes] = useState(25);
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (initialHabit) {
      setSelectedHabitId(initialHabit.id);
      if (initialHabit.timerTargetMinutes) {
        setTargetMinutes(initialHabit.timerTargetMinutes);
        setSecondsRemaining(initialHabit.timerTargetMinutes * 60);
      }
    }
  }, [initialHabit]);

  useEffect(() => {
    let interval = null;
    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (isActive && secondsRemaining === 0) {
      setIsActive(false);
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
    return () => clearInterval(interval);
  }, [isActive, secondsRemaining]);

  if (!isOpen) return null;

  const handleSelectPreset = (mins) => {
    setIsActive(false);
    setIsCompleted(false);
    setTargetMinutes(mins);
    setSecondsRemaining(mins * 60);
  };

  const handleToggleTimer = () => {
    setIsActive(!isActive);
  };

  const handleResetTimer = () => {
    setIsActive(false);
    setIsCompleted(false);
    setSecondsRemaining(targetMinutes * 60);
  };

  const handleFinishEarly = () => {
    const elapsedSeconds = (targetMinutes * 60) - secondsRemaining;
    const elapsedMinutes = Math.max(1, Math.round(elapsedSeconds / 60));
    if (onLogFocus) {
      onLogFocus(elapsedMinutes, selectedHabitId || null);
    }
    onClose();
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const progressPercent = Math.min(100, Math.round((((targetMinutes * 60) - secondsRemaining) / (targetMinutes * 60)) * 100));

  return (
    <div
      className="anim-fade-in"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 17, 31, 0.85)',
        backdropFilter: 'blur(16px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      <div
        className="anim-scale-in"
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          borderRadius: '24px',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
          position: 'relative',
          textAlign: 'center'
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: '#94A3B8',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Title */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#60A5FA', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
          <Zap size={14} /> Streakly Deep Focus Mode
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '900', margin: 0, color: '#FFFFFF' }}>
          {isCompleted ? '🎉 Session Complete!' : isActive ? '⚡ Deep Focus In Progress' : 'Ready to Lock In?'}
        </h2>

        {/* Preset Selectors */}
        <div style={{ display: 'flex', gap: '0.45rem', justifyContent: 'center', marginTop: '1.25rem' }}>
          {[
            { label: '25m Pomodoro', val: 25 },
            { label: '50m Deep Work', val: 50 },
            { label: '90m Flow', val: 90 }
          ].map(p => (
            <button
              key={p.val}
              type="button"
              onClick={() => handleSelectPreset(p.val)}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: '700',
                backgroundColor: targetMinutes === p.val ? '#2563EB' : 'rgba(255, 255, 255, 0.08)',
                color: targetMinutes === p.val ? '#FFFFFF' : '#CBD5E1',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Large Visual Pulse Ring & Timer Display */}
        <div
          style={{
            position: 'relative',
            width: '220px',
            height: '220px',
            margin: '2rem auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Animated pulse background */}
          <div
            style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, transparent 70%)',
              animation: isActive ? 'pulse 2s infinite' : 'none'
            }}
          />

          <svg width="220" height="220" viewBox="0 0 220 220" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="110"
              cy="110"
              r="95"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="10"
            />
            <circle
              cx="110"
              cy="110"
              r="95"
              fill="none"
              stroke="#2563EB"
              strokeWidth="10"
              strokeDasharray={2 * Math.PI * 95}
              strokeDashoffset={2 * Math.PI * 95 * (1 - progressPercent / 100)}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s linear' }}
            />
          </svg>

          <div style={{ position: 'absolute', textAlign: 'center' }}>
            <div
              style={{
                fontSize: '3rem',
                fontWeight: '900',
                color: '#FFFFFF',
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.03em'
              }}
            >
              {timeFormatted}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: '700' }}>
              {progressPercent}% Complete
            </div>
          </div>
        </div>

        {/* Linked Habit Selector */}
        <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.35rem' }}>
            Log session towards habit:
          </label>
          <select
            value={selectedHabitId}
            onChange={(e) => setSelectedHabitId(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '10px',
              color: '#FFFFFF',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          >
            <option value="" style={{ background: '#0F172A' }}>⚡ General Deep Work</option>
            {habits.filter(h => !h.archived).map(h => (
              <option key={h.id} value={h.id} style={{ background: '#0F172A' }}>
                {h.name} ({h.category})
              </option>
            ))}
          </select>
        </div>

        {/* Control Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            type="button"
            onClick={handleToggleTimer}
            style={{
              flex: 1,
              padding: '0.85rem 1.5rem',
              borderRadius: '14px',
              backgroundColor: isActive ? '#EF4444' : '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '0.95rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 16px rgba(37, 99, 235, 0.4)'
            }}
          >
            {isActive ? <Pause size={18} /> : <Play size={18} fill="#FFFFFF" />}
            <span>{isActive ? 'Pause Focus' : 'Start Focus'}</span>
          </button>

          <button
            type="button"
            onClick={handleResetTimer}
            style={{
              padding: '0.85rem',
              borderRadius: '14px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              cursor: 'pointer'
            }}
            title="Reset Timer"
          >
            <RotateCcw size={18} />
          </button>

          <button
            type="button"
            onClick={handleFinishEarly}
            style={{
              padding: '0.85rem 1.15rem',
              borderRadius: '14px',
              backgroundColor: '#10B981',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
            title="Finish and log elapsed minutes"
          >
            <Check size={16} /> Log
          </button>
        </div>
      </div>
    </div>
  );
};
