import React, { useEffect } from 'react';
import { CheckCircle2, Clock, Moon, Target, Sparkles } from 'lucide-react';
import { GOAL_OPTIONS } from '../../data/goalOptions';
import { formatTime } from '../../utils/dateUtils';
import confetti from 'canvas-confetti';

export const SummaryStep = ({
  wakeUpTime,
  bedTime,
  selectedGoalId,
  firstHabit
}) => {
  useEffect(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#0B1728', '#10B981', '#EAF2FF']
      });
    } catch (e) {}
  }, []);

  const goalObj = GOAL_OPTIONS.find(g => g.id === selectedGoalId) || GOAL_OPTIONS[0];

  return (
    <div className="anim-fade-in">
      <div className="step-header">
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-light-blue)',
            color: 'var(--primary-blue)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.75rem'
          }}
        >
          <CheckCircle2 size={28} />
        </div>
        <h2 className="step-title">You're ready.</h2>
        <p className="step-subtitle">Here is a snapshot of your personalized daily routine baseline.</p>
      </div>

      <div className="summary-container">
        <div className="summary-tile">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Clock size={18} color="var(--primary-blue)" />
            <span className="summary-tile-label">Wake-up time</span>
          </div>
          <span className="summary-tile-value">{formatTime(wakeUpTime)}</span>
        </div>

        <div className="summary-tile">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Moon size={18} color="var(--primary-blue)" />
            <span className="summary-tile-label">End-of-day time</span>
          </div>
          <span className="summary-tile-value">{formatTime(bedTime)}</span>
        </div>

        <div className="summary-tile">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Target size={18} color="var(--primary-blue)" />
            <span className="summary-tile-label">Target Focus</span>
          </div>
          <span className="summary-tile-value">{goalObj?.title || 'Live healthier'}</span>
        </div>

        <div className="summary-tile">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sparkles size={18} color="var(--primary-blue)" />
            <span className="summary-tile-label">First Habit</span>
          </div>
          <span className="summary-tile-value">{firstHabit?.name || 'Daily Routine'}</span>
        </div>
      </div>
    </div>
  );
};
