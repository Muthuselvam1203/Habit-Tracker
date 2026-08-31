import React, { useEffect } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Flame, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MilestoneModal = ({
  milestone,
  onClose
}) => {
  useEffect(() => {
    if (milestone) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.5 },
          colors: ['#2563EB', '#07111F', '#10B981', '#EAF2FF']
        });
      } catch (e) {}
    }
  }, [milestone]);

  if (!milestone) return null;

  const { streak = 7, habitName = 'Daily Habit' } = milestone;

  const getMilestoneTagline = (s) => {
    switch (s) {
      case 3: return 'The hardest part is starting. You are forming momentum.';
      case 7: return "You're building unstoppable momentum.";
      case 14: return 'Two full weeks of relentless dedication.';
      case 30: return 'A full month of excellence. This habit is now part of you.';
      case 60: return '60 days of mastery. True consistency in action.';
      case 100: return '100-day milestone achieved. You are a legendary habit architect.';
      default: return 'Keep up the incredible consistency.';
    }
  };

  return (
    <Modal isOpen={!!milestone} onClose={onClose} maxWidth="420px">
      <div style={{ textAlign: 'center', padding: '1rem 0.5rem 0.5rem 0.5rem' }}>
        {/* Milestone Flame Icon */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-light-blue)',
            color: 'var(--color-blue)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
            boxShadow: 'var(--shadow-blue)'
          }}
        >
          <Flame size={36} />
        </div>

        {/* Milestone Title */}
        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-blue)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
          Streak Milestone Unlocked
        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--color-black)', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
          {streak} DAY STREAK
        </h2>

        <p style={{ fontSize: '0.95rem', color: 'var(--color-text-grey)', maxWidth: '320px', margin: '0 auto 1.5rem auto', lineHeight: '1.5' }}>
          "{getMilestoneTagline(streak)}"
        </p>

        <div style={{ backgroundColor: 'var(--color-light-grey)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--color-black)', fontWeight: '600' }}>
          Routine: <span style={{ color: 'var(--color-blue)' }}>{habitName}</span>
        </div>

        {/* Action Button */}
        <Button variant="navy" size="lg" onClick={onClose} style={{ width: '100%' }}>
          Keep Going
        </Button>
      </div>
    </Modal>
  );
};
