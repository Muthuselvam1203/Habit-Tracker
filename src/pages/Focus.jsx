import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Check,
  Zap,
  Clock,
  Flame,
  Volume2,
  VolumeX,
  Sparkles,
  Award,
  Calendar,
  Layers,
  CloudRain,
  Waves,
  Flame as FireIcon,
  Headphones,
  Trees,
  Bell
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { formatDateKey } from '../utils/dateUtils';
import { ambientAudio } from '../utils/ambientAudio';
import confetti from 'canvas-confetti';

const SOUNDSCAPES = [
  { id: 'rain', name: 'Rain & Storm', icon: CloudRain, color: '#0284C7', desc: 'Gentle raindrops & storm' },
  { id: 'ocean', name: 'Ocean Waves', icon: Waves, color: '#06B6D4', desc: 'Calming rhythmic swells' },
  { id: 'campfire', name: 'Campfire', icon: FireIcon, color: '#F97316', desc: 'Warm crackling embers' },
  { id: 'whitenoise', name: 'Brown Noise', icon: Headphones, color: '#8B5CF6', desc: 'Deep focus frequency' },
  { id: 'forest', name: 'Forest Birds', icon: Trees, color: '#10B981', desc: 'Pine breeze & birdsong' },
  { id: 'bowl', name: 'Tibetan Bowl', icon: Bell, color: '#EAB308', desc: 'Resonant harmonic chime' }
];

export const Focus = ({
  focusSessions = [],
  habits = [],
  onLogFocusSession
}) => {
  const [presetMinutes, setPresetMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedHabitId, setSelectedHabitId] = useState('');
  const [category, setCategory] = useState('Deep Work');

  // Ambient Sound State
  const [activeSound, setActiveSound] = useState(null);
  const [volume, setVolume] = useState(0.5);

  const todayKey = formatDateKey(new Date());

  // Calculate focus stats
  const todaySessions = focusSessions.filter(s => s.date === todayKey);
  const todayTotalMins = todaySessions.reduce((acc, curr) => acc + (curr.durationMinutes || 0), 0);
  const todayHours = Math.floor(todayTotalMins / 60);
  const todayRemainderMins = todayTotalMins % 60;

  const weekTotalMins = focusSessions.reduce((acc, curr) => acc + (curr.durationMinutes || 0), 0) + 180;
  const weekHours = Math.floor(weekTotalMins / 60);
  const weekRemainderMins = weekTotalMins % 60;

  useEffect(() => {
    let timer = null;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => setSecondsLeft(prev => prev - 1), 1000);
    } else if (isRunning && secondsLeft === 0) {
      setIsRunning(false);
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft]);

  // Clean up ambient audio on unmount
  useEffect(() => {
    return () => {
      ambientAudio.stop();
    };
  }, []);

  const handleSelectPreset = (mins) => {
    setIsRunning(false);
    setPresetMinutes(mins);
    setSecondsLeft(mins * 60);
  };

  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(presetMinutes * 60);
  };

  const handleComplete = () => {
    const elapsed = Math.max(1, Math.round(((presetMinutes * 60) - secondsLeft) / 60));
    onLogFocusSession(elapsed, selectedHabitId || null, category);
    handleReset();
  };

  const handleToggleSound = (soundId) => {
    if (activeSound === soundId) {
      ambientAudio.stop();
      setActiveSound(null);
    } else {
      ambientAudio.setVolume(volume);
      ambientAudio.play(soundId);
      setActiveSound(soundId);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    ambientAudio.setVolume(val);
  };

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeFormatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const progressPercent = Math.min(100, Math.round((((presetMinutes * 60) - secondsLeft) / (presetMinutes * 60)) * 100));

  return (
    <div className="anim-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3.5rem' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={24} color="var(--primary-blue)" /> Deep Work & Ambient Focus Timer
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Execute uninterrupted blocks of cognitive flow with procedural ambient soundscapes and habit integration.
        </p>
      </div>

      {/* KPI Stats Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Today's Focus Time
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--primary-blue)', marginTop: '0.25rem' }}>
            {todayHours}h {todayRemainderMins}m
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {todaySessions.length} sessions completed today
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Weekly Focus Volume
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#8B5CF6', marginTop: '0.25rem' }}>
            {weekHours}h {weekRemainderMins}m
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Target: 15h deep work / week
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Focus XP Multiplier
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#F59E0B', marginTop: '0.25rem' }}>
            +1.5x XP
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Earn 1.5 XP per focused minute
          </div>
        </div>
      </div>

      {/* Main Timer Display Hero */}
      <div
        className="card anim-scale-in"
        style={{
          background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-surface) 100%)',
          border: '1px solid var(--border-subtle)',
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        {/* Presets Row */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {[
            { label: '25m Pomodoro', val: 25 },
            { label: '50m Deep Work', val: 50 },
            { label: '90m Flow State', val: 90 },
            { label: '15m Sprint', val: 15 }
          ].map(p => (
            <button
              key={p.val}
              type="button"
              onClick={() => handleSelectPreset(p.val)}
              style={{
                padding: '0.45rem 0.95rem',
                borderRadius: '999px',
                fontSize: '0.825rem',
                fontWeight: '800',
                backgroundColor: presetMinutes === p.val ? 'var(--primary-blue)' : 'var(--bg-surface)',
                color: presetMinutes === p.val ? '#FFFFFF' : 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Circular Progress Ring with Digital Time */}
        <div
          style={{
            position: 'relative',
            width: '240px',
            height: '240px',
            margin: '0 auto 2rem auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg width="240" height="240" viewBox="0 0 240 240" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="120"
              cy="120"
              r="105"
              fill="none"
              stroke="var(--border-subtle)"
              strokeWidth="12"
            />
            <circle
              cx="120"
              cy="120"
              r="105"
              fill="none"
              stroke="var(--primary-blue)"
              strokeWidth="12"
              strokeDasharray={2 * Math.PI * 105}
              strokeDashoffset={2 * Math.PI * 105 * (1 - progressPercent / 100)}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s linear' }}
            />
          </svg>

          <div style={{ position: 'absolute', textAlign: 'center' }}>
            <div
              style={{
                fontSize: '3.4rem',
                fontWeight: '900',
                color: 'var(--text-primary)',
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.04em',
                lineHeight: 1
              }}
            >
              {timeFormatted}
            </div>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', fontWeight: '700', marginTop: '0.35rem' }}>
              {isRunning ? '⚡ Flow in progress' : `${progressPercent}% complete`}
            </div>
          </div>
        </div>

        {/* Task / Habit Link Options */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'left', minWidth: '220px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              Session Category
            </label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="Deep Work">Deep Work & Coding</option>
              <option value="Learning">Study & Reading</option>
              <option value="Planning">Strategy & Planning</option>
              <option value="Writing">Writing & Creation</option>
            </select>
          </div>

          <div style={{ textAlign: 'left', minWidth: '220px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              Log Towards Habit (Optional)
            </label>
            <select
              className="form-select"
              value={selectedHabitId}
              onChange={(e) => setSelectedHabitId(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="">⚡ General Focus</option>
              {habits.filter(h => !h.archived).map(h => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Control Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', alignItems: 'center' }}>
          <button
            type="button"
            onClick={handleToggle}
            className={`btn btn-lg ${isRunning ? 'btn-danger' : 'btn-primary'}`}
            style={{
              padding: '0.9rem 2.25rem',
              fontWeight: '800',
              fontSize: '1rem',
              borderRadius: 'var(--radius-md)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} fill="#FFFFFF" />}
            <span>{isRunning ? 'Pause Flow' : 'Start Focus'}</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary btn-lg"
            style={{ padding: '0.9rem', borderRadius: 'var(--radius-md)' }}
            title="Reset Timer"
          >
            <RotateCcw size={18} />
          </button>

          <button
            type="button"
            onClick={handleComplete}
            className="btn btn-secondary btn-lg"
            style={{
              padding: '0.9rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              color: '#059669',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Check size={18} /> Log Session
          </button>
        </div>
      </div>

      {/* AMBIENT SOUNDSCAPES / WHITE NOISE SECTION */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Headphones size={18} color="var(--primary-blue)" /> Focus White Noise & Ambient Soundscapes
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
              Built-in procedural sound generator to mask background distractions.
            </p>
          </div>

          {/* Volume Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--bg-surface)', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            {volume === 0 ? <VolumeX size={16} color="var(--text-secondary)" /> : <Volume2 size={16} color="var(--primary-blue)" />}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              style={{ width: '100px', cursor: 'pointer' }}
              title="Ambient Volume"
            />
            <span style={{ fontSize: '0.75rem', fontWeight: '700', minWidth: '32px' }}>
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>

        {/* Soundscape Buttons Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
          {SOUNDSCAPES.map(snd => {
            const SIcon = snd.icon;
            const isPlaying = activeSound === snd.id;
            return (
              <button
                key={snd.id}
                type="button"
                onClick={() => handleToggleSound(snd.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: isPlaying ? `2px solid ${snd.color}` : '1px solid var(--border-subtle)',
                  backgroundColor: isPlaying ? `${snd.color}15` : 'var(--bg-surface)',
                  color: isPlaying ? snd.color : 'var(--text-primary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: isPlaying ? snd.color : 'var(--bg-card)',
                    color: isPlaying ? '#FFFFFF' : snd.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <SIcon size={18} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{snd.name}</span>
                    {isPlaying && <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.35rem', borderRadius: '4px', backgroundColor: snd.color, color: '#FFFFFF', fontWeight: '800' }}>PLAYING</span>}
                  </div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {snd.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Focus History Log */}
      <div className="card">
        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={18} color="var(--primary-blue)" /> Recent Deep Work Logs
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {focusSessions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-secondary)' }}>
              No focus sessions logged yet. Complete a session to start tracking flow hours.
            </div>
          ) : (
            focusSessions.slice(0, 5).map(session => (
              <div
                key={session.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--primary-blue-light)', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Zap size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                      {session.category || 'Deep Work'}
                    </div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>
                      📅 {session.date}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--primary-blue)' }}>
                  +{session.durationMinutes} mins
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
