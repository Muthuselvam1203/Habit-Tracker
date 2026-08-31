import React, { useState } from 'react';
import {
  Droplets,
  Moon,
  Smile,
  Zap,
  Smartphone,
  Plus,
  Minus,
  Sparkles,
  TrendingUp,
  Star,
  Activity,
  Heart,
  Clock
} from 'lucide-react';
import { formatDateKey } from '../utils/dateUtils';
import { getBehavioralCorrelations } from '../utils/correlationUtils';

export const Wellness = ({
  wellnessLogs = {},
  habits = [],
  completions = {},
  onAddWater,
  onUpdateWellness
}) => {
  const todayKey = formatDateKey(new Date());
  const todayData = wellnessLogs[todayKey] || {
    waterMl: 1500,
    waterTargetMl: 2000,
    mood: 'great',
    energy: 9,
    stress: 2,
    sleep: {
      bedtime: '23:00',
      wakeTime: '06:45',
      durationMinutes: 465,
      rating: 5,
      goalMinutes: 480
    },
    screenTime: {
      socialMediaMinutes: 35,
      entertainmentMinutes: 20,
      learningMinutes: 90
    }
  };

  const correlations = getBehavioralCorrelations(habits, completions, wellnessLogs);

  // Water calculations
  const waterMl = todayData.waterMl || 0;
  const targetMl = todayData.waterTargetMl || 2000;
  const totalGlasses = Math.floor(targetMl / 250);
  const currentGlasses = Math.floor(waterMl / 250);
  const waterPercent = Math.min(100, Math.round((waterMl / targetMl) * 100));

  // Sleep calculations
  const sleepDurationMins = todayData.sleep?.durationMinutes || 465;
  const sleepHours = Math.floor(sleepDurationMins / 60);
  const sleepRemainderMins = sleepDurationMins % 60;
  const sleepRating = todayData.sleep?.rating || 5;

  // Screen time calculations
  const socialMins = todayData.screenTime?.socialMediaMinutes || 0;
  const entMins = todayData.screenTime?.entertainmentMinutes || 0;
  const learnMins = todayData.screenTime?.learningMinutes || 0;
  const totalScreenMins = socialMins + entMins + learnMins;
  const screenHours = Math.floor(totalScreenMins / 60);
  const screenMins = totalScreenMins % 60;

  const MOOD_OPTIONS = [
    { id: 'great', emoji: '😄', label: 'Great' },
    { id: 'good', emoji: '🙂', label: 'Good' },
    { id: 'okay', emoji: '😐', label: 'Okay' },
    { id: 'low', emoji: '😔', label: 'Low' },
    { id: 'bad', emoji: '😡', label: 'Bad' }
  ];

  return (
    <div className="anim-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', paddingBottom: '3rem' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--color-black)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={24} color="var(--primary-blue)" /> Daily Life & Wellness Operating Hub
        </h2>
        <p style={{ color: 'var(--color-text-grey)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Quantify your internal state: Hydration, sleep architecture, emotional valence, energy voltage, and digital screen hygiene.
        </p>
      </div>

      {/* Grid of 4 Wellness Trackers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* 1. 💧 Hydration System */}
        <div
          className="card anim-scale-in"
          style={{
            backgroundColor: 'var(--color-white)',
            border: '1px solid var(--border-subtle)',
            borderTop: '4px solid #06B6D4',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.25rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(6, 182, 212, 0.15)', color: '#0891B2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Droplets size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, color: 'var(--color-black)' }}>
                    Hydration Tracker
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#0891B2', fontWeight: '700' }}>
                    Target: {targetMl}ml / day
                  </span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0891B2' }}>
                  {waterMl} <span style={{ fontSize: '0.85rem' }}>ml</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-grey)', fontWeight: '700' }}>
                  {waterPercent}% of target
                </div>
              </div>
            </div>

            {/* Visual Glasses Display */}
            <div
              style={{
                backgroundColor: 'rgba(6, 182, 212, 0.06)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                margin: '1rem 0'
              }}
            >
              {Array.from({ length: totalGlasses }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: '1.5rem',
                    opacity: i < currentGlasses ? 1 : 0.25,
                    filter: i < currentGlasses ? 'none' : 'grayscale(1)',
                    transform: i < currentGlasses ? 'scale(1.1)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  💧
                </div>
              ))}
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-grey)', textAlign: 'center', fontWeight: '600' }}>
              {currentGlasses} of {totalGlasses} glasses consumed
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => onAddWater(250)}
              style={actionBtnStyle('#0891B2')}
            >
              +250ml (1 Glass)
            </button>
            <button
              type="button"
              onClick={() => onAddWater(500)}
              style={actionBtnStyle('#0891B2')}
            >
              +500ml (Bottle)
            </button>
            <button
              type="button"
              onClick={() => onAddWater(-250)}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-light-grey)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--color-text-grey)',
                cursor: 'pointer'
              }}
              title="Undo 250ml"
            >
              <Minus size={14} />
            </button>
          </div>
        </div>

        {/* 2. 😴 Sleep Architecture */}
        <div
          className="card anim-scale-in"
          style={{
            backgroundColor: 'var(--color-white)',
            border: '1px solid var(--border-subtle)',
            borderTop: '4px solid #6366F1',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.25rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(99, 102, 241, 0.15)', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Moon size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, color: 'var(--color-black)' }}>
                    Sleep Tracker
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#4F46E5', fontWeight: '700' }}>
                    Goal: 8.0h restorative sleep
                  </span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#4F46E5' }}>
                  {sleepHours}h {sleepRemainderMins}m
                </div>
                <div style={{ display: 'flex', gap: '2px', justifyContent: 'flex-end', marginTop: '2px' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      fill={i < sleepRating ? '#F59E0B' : 'transparent'}
                      color={i < sleepRating ? '#F59E0B' : '#CBD5E1'}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bedtime and Wake time editors */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', margin: '1rem 0' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: '700', color: 'var(--color-text-grey)', marginBottom: '0.25rem' }}>
                  Bedtime
                </label>
                <input
                  type="time"
                  className="form-input"
                  value={todayData.sleep?.bedtime || '23:00'}
                  onChange={(e) => onUpdateWellness({
                    sleep: { bedtime: e.target.value }
                  })}
                  style={{ fontSize: '0.85rem', padding: '0.4rem 0.6rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: '700', color: 'var(--color-text-grey)', marginBottom: '0.25rem' }}>
                  Wake-Up Time
                </label>
                <input
                  type="time"
                  className="form-input"
                  value={todayData.sleep?.wakeTime || '06:45'}
                  onChange={(e) => onUpdateWellness({
                    sleep: { wakeTime: e.target.value }
                  })}
                  style={{ fontSize: '0.85rem', padding: '0.4rem 0.6rem' }}
                />
              </div>
            </div>

            {/* Rating Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: '700', color: 'var(--color-text-grey)', marginBottom: '0.35rem' }}>
                Sleep Quality Rating
              </label>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {[1, 2, 3, 4, 5].map(starVal => (
                  <button
                    key={starVal}
                    type="button"
                    onClick={() => onUpdateWellness({
                      sleep: { rating: starVal }
                    })}
                    style={{
                      flex: 1,
                      padding: '0.35rem 0',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: sleepRating >= starVal ? '#FEF3C7' : 'var(--color-light-grey)',
                      border: sleepRating === starVal ? '1px solid #F59E0B' : '1px solid transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Star size={14} fill={sleepRating >= starVal ? '#F59E0B' : 'none'} color="#F59E0B" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. 😊 Mood & ⚡ Energy Tracker */}
        <div
          className="card anim-scale-in"
          style={{
            backgroundColor: 'var(--color-white)',
            border: '1px solid var(--border-subtle)',
            borderTop: '4px solid #F59E0B',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.25rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Smile size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, color: 'var(--color-black)' }}>
                    Mood & Energy Voltage
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#D97706', fontWeight: '700' }}>
                    Mindset & Biological Vitality
                  </span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#D97706' }}>
                  ⚡ {todayData.energy || 9}/10
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-grey)', fontWeight: '700' }}>
                  Stress: {todayData.stress || 2}/10
                </div>
              </div>
            </div>

            {/* Mood selector buttons */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: '700', color: 'var(--color-text-grey)', marginBottom: '0.35rem' }}>
                Today's Dominant Mood
              </label>
              <div style={{ display: 'flex', gap: '0.45rem' }}>
                {MOOD_OPTIONS.map(m => {
                  const isSel = todayData.mood === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => onUpdateWellness({ mood: m.id })}
                      style={{
                        flex: 1,
                        padding: '0.45rem 0',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: isSel ? '#FEF3C7' : 'var(--color-light-grey)',
                        border: isSel ? '2px solid #F59E0B' : '1px solid var(--border-subtle)',
                        fontSize: '1.25rem',
                        cursor: 'pointer',
                        transform: isSel ? 'scale(1.1)' : 'none',
                        transition: 'all 0.15s'
                      }}
                      title={m.label}
                    >
                      {m.emoji}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Energy Slider Buttons */}
            <div>
              <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: '700', color: 'var(--color-text-grey)', marginBottom: '0.35rem' }}>
                Energy Rating (1 = Exhausted, 10 = Supercharged)
              </label>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(eVal => (
                  <button
                    key={eVal}
                    type="button"
                    onClick={() => onUpdateWellness({ energy: eVal })}
                    style={{
                      flex: 1,
                      padding: '0.35rem 0',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      backgroundColor: todayData.energy === eVal ? '#D97706' : 'var(--color-light-grey)',
                      color: todayData.energy === eVal ? '#FFFFFF' : 'var(--color-black)',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {eVal}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. 📱 Screen Time & Digital Hygiene */}
        <div
          className="card anim-scale-in"
          style={{
            backgroundColor: 'var(--color-white)',
            border: '1px solid var(--border-subtle)',
            borderTop: '4px solid #EC4899',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.25rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(236, 72, 153, 0.15)', color: '#DB2777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Smartphone size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, color: 'var(--color-black)' }}>
                    Screen Time Tracker
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#DB2777', fontWeight: '700' }}>
                    Digital Wellbeing & Focus
                  </span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#DB2777' }}>
                  {screenHours}h {screenMins}m
                </div>
                <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '700' }}>
                  ↓ 18% lower than last week
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: '1rem 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-black)' }}>
                  📱 Social Media
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#EF4444' }}>
                  {socialMins} mins
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-black)' }}>
                  🎬 Entertainment
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#F59E0B' }}>
                  {entMins} mins
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-black)' }}>
                  📚 Learning & Deep Work
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#10B981' }}>
                  {learnMins} mins
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Behavioral Correlation Engine Insights */}
      <div className="card" style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--border-subtle)', padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={20} color="var(--primary-blue)" /> Behavioral Correlation Engine
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {correlations.insightsList.map(item => (
            <div
              key={item.id}
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-light-grey)',
                borderLeft: `4px solid ${item.color}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--color-black)' }}>
                  {item.title}
                </span>
                <span style={{ fontSize: '0.725rem', fontWeight: '800', color: item.color, backgroundColor: `${item.color}15`, padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                  {item.statHighlight}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-grey)', margin: 0, lineHeight: '1.45' }}>
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const actionBtnStyle = (color) => ({
  flex: 1,
  padding: '0.55rem 0.75rem',
  borderRadius: 'var(--radius-sm)',
  backgroundColor: color,
  color: '#FFFFFF',
  border: 'none',
  fontSize: '0.8rem',
  fontWeight: '800',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.35rem',
  boxShadow: `0 2px 8px ${color}35`
});
