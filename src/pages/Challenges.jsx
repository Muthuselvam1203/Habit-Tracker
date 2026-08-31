import React, { useState } from 'react';
import {
  Trophy,
  Flame,
  CheckCircle2,
  Circle,
  Plus,
  Play,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Droplet,
  Sun,
  Moon,
  Target,
  Dumbbell,
  BookOpen,
  Calendar,
  Check,
  Lock,
  ChevronRight,
  RefreshCw,
  Info
} from 'lucide-react';
import { CHALLENGES_LIST, getStageForDay } from '../data/challengesData';
import { Button } from '../components/common/Button';

const ICON_MAP = {
  Sun,
  Droplet,
  Target,
  Dumbbell,
  Sparkles,
  Moon,
  ShieldCheck,
  BookOpen
};

export const Challenges = ({
  challengesProgress = {},
  habits = [],
  completions = {},
  onJoinChallenge,
  onLeaveChallenge,
  onToggleChallengeDay,
  onOpenHabitDetails,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeChallengeModal, setActiveChallengeModal] = useState(null);
  const [previewChallenge, setPreviewChallenge] = useState(null);

  const enrolledIds = Object.keys(challengesProgress);
  const activeChallenges = CHALLENGES_LIST.filter(c => enrolledIds.includes(c.id));
  const availableChallenges = CHALLENGES_LIST.filter(c => !enrolledIds.includes(c.id));

  const filteredAvailable = availableChallenges.filter(c => {
    if (selectedCategory === 'all') return true;
    return c.category === selectedCategory;
  });

  const categories = [
    { id: 'all', label: 'All Journeys' },
    { id: 'productivity', label: 'Productivity' },
    { id: 'health', label: 'Health' },
    { id: 'fitness', label: 'Fitness' },
    { id: 'personal', label: 'Mindfulness & Detox' }
  ];

  return (
    <div className="anim-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '3.5rem' }}>
      {/* Header Banner */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(239, 68, 68, 0.05) 50%, var(--bg-card) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          padding: '1.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0.65rem', borderRadius: '999px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#D97706', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
            <Trophy size={13} /> Scientifically Proven 3-Stage Method
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: '900', color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
            30-Day Habit Journeys & Challenges
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginTop: '0.35rem', lineHeight: '1.55' }}>
            Transform your baseline habits through structured 3-stage neuro-conditioning: 
            <strong> Stage 1 (Initiation)</strong> → <strong>Stage 2 (Conditioning)</strong> → <strong>Stage 3 (Automaticity)</strong>.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '700', textTransform: 'uppercase' }}>Active Journeys</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#F59E0B' }}>{activeChallenges.length}</div>
          </div>
          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '700', textTransform: 'uppercase' }}>Available</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary-blue)' }}>{availableChallenges.length}</div>
          </div>
        </div>
      </div>

      {/* ACTIVE ENROLLED CHALLENGES SECTION */}
      {activeChallenges.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <Flame size={20} color="#F59E0B" /> Your Active 30-Day Journeys ({activeChallenges.length})
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {activeChallenges.map(challenge => {
              const progress = challengesProgress[challenge.id] || { completedDays: [], status: 'active' };
              const completedCount = (progress.completedDays || []).length;
              const percent = Math.min(100, Math.round((completedCount / challenge.durationDays) * 100));
              const currentDayNum = Math.min(challenge.durationDays, completedCount + 1);
              const stageInfo = getStageForDay(currentDayNum);
              const currentStageData = challenge.stages.find(s => s.stage === stageInfo.stage) || challenge.stages[0];

              const isDayCompleted = (d) => (progress.completedDays || []).includes(d);

              return (
                <div
                  key={challenge.id}
                  className="card anim-scale-in"
                  style={{
                    borderLeft: `5px solid ${challenge.color}`,
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem'
                  }}
                >
                  {/* Top Row: Title, Stage Badge, and Progress */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>{challenge.coverEmoji}</span>
                        <h4 style={{ fontSize: '1.35rem', fontWeight: '900', color: 'var(--text-primary)', margin: 0 }}>
                          {challenge.title}
                        </h4>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>
                        {challenge.subtitle}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span
                        style={{
                          padding: '0.3rem 0.75rem',
                          borderRadius: '999px',
                          backgroundColor: `${challenge.color}15`,
                          color: challenge.color,
                          border: `1px solid ${challenge.color}30`,
                          fontSize: '0.8rem',
                          fontWeight: '800'
                        }}
                      >
                        ⚡ Stage {stageInfo.stage}: {stageInfo.name}
                      </span>
                      <button
                        onClick={() => onLeaveChallenge(challenge.id)}
                        className="btn btn-ghost btn-sm"
                        style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}
                      >
                        Reset / Leave
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar & Stage Roadmap Pill */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>
                        Day {completedCount} of {challenge.durationDays} Completed
                      </span>
                      <span style={{ color: challenge.color }}>{percent}% Complete</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-surface)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${percent}%`,
                          height: '100%',
                          backgroundColor: challenge.color,
                          borderRadius: '999px',
                          transition: 'width 0.4s ease'
                        }}
                      />
                    </div>
                  </div>

                  {/* Stage Focus Callout */}
                  <div
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.85rem 1.15rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.75rem'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.725rem', fontWeight: '800', color: challenge.color, textTransform: 'uppercase' }}>
                        Current Stage Focus ({currentStageData.days})
                      </div>
                      <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)', marginTop: '0.15rem' }}>
                        {currentStageData.focus}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--text-secondary)', maxWidth: '340px' }}>
                      "{currentStageData.quote}"
                    </div>
                  </div>

                  {/* 30-Day Interactive Checkpoint Grid */}
                  <div>
                    <div style={{ fontSize: '0.775rem', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                      Daily 30-Day Checkpoints
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(36px, 1fr))',
                        gap: '0.45rem'
                      }}
                    >
                      {Array.from({ length: challenge.durationDays }, (_, i) => i + 1).map(dayNum => {
                        const done = isDayCompleted(dayNum);
                        const isCurrent = dayNum === currentDayNum && !done;
                        return (
                          <button
                            key={dayNum}
                            type="button"
                            onClick={() => onToggleChallengeDay(challenge.id, dayNum)}
                            title={`Day ${dayNum}: Click to toggle check-in`}
                            style={{
                              height: '38px',
                              borderRadius: 'var(--radius-sm)',
                              border: isCurrent
                                ? `2px solid ${challenge.color}`
                                : done
                                ? `1px solid ${challenge.color}`
                                : '1px solid var(--border-subtle)',
                              backgroundColor: done
                                ? challenge.color
                                : isCurrent
                                ? `${challenge.color}15`
                                : 'var(--bg-card)',
                              color: done
                                ? '#FFFFFF'
                                : isCurrent
                                ? challenge.color
                                : 'var(--text-secondary)',
                              fontWeight: '800',
                              fontSize: '0.75rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            {done ? <Check size={16} strokeWidth={3} /> : dayNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CATALOG / AVAILABLE CHALLENGES */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
              Explore 30-Day Journeys
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
              Choose a science-backed challenge to rewire your brain and lock in permanent positive habits.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn btn-sm ${selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.775rem', fontWeight: '700', borderRadius: '999px' }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Challenges */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {filteredAvailable.map(challenge => {
            const IconComp = ICON_MAP[challenge.icon] || Sparkles;
            return (
              <div
                key={challenge.id}
                className="card anim-scale-in"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.5rem',
                  borderTop: `4px solid ${challenge.color}`,
                  gap: '1rem',
                  position: 'relative'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '2rem' }}>{challenge.coverEmoji}</span>
                    <span
                      style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        backgroundColor: `${challenge.color}15`,
                        color: challenge.color,
                        fontSize: '0.725rem',
                        fontWeight: '800',
                        textTransform: 'uppercase'
                      }}
                    >
                      {challenge.durationDays} Days
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--text-primary)', margin: 0 }}>
                    {challenge.title}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.35rem', lineHeight: '1.5' }}>
                    {challenge.description}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                    <Sparkles size={14} color={challenge.color} />
                    <span>Includes {challenge.presetHabits.length} auto-enrolled habits</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPreviewChallenge(challenge)}
                    className="btn btn-primary btn-block"
                    style={{
                      backgroundColor: challenge.color,
                      borderColor: challenge.color,
                      fontWeight: '800'
                    }}
                  >
                    <Play size={15} /> Start {challenge.durationDays}-Day Journey
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CHALLENGE PREVIEW & ENROLL MODAL */}
      {previewChallenge && (
        <div className="modal-overlay" onClick={() => setPreviewChallenge(null)}>
          <div
            className="modal-content anim-scale-in"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ fontSize: '2.25rem' }}>{previewChallenge.coverEmoji}</span>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--text-primary)', margin: 0 }}>
                    {previewChallenge.title}
                  </h3>
                  <div style={{ color: previewChallenge.color, fontWeight: '700', fontSize: '0.85rem' }}>
                    {previewChallenge.durationDays}-Day Scientific Habit Journey
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewChallenge(null)}
                className="btn btn-ghost btn-icon btn-sm"
              >
                ✕
              </button>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.55', marginBottom: '1.25rem' }}>
              {previewChallenge.description}
            </p>

            {/* 3-Stages Roadmap */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                3-Stage Neurological Roadmap
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {previewChallenge.stages.map(st => (
                  <div
                    key={st.stage}
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.75rem 1rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                      <span style={{ fontWeight: '800', fontSize: '0.85rem', color: previewChallenge.color }}>
                        Stage {st.stage}: {st.name}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                        {st.days}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {st.focus}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Habits to be added */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                Habits Automatically Added to Your Daily OS:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {previewChallenge.presetHabits.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.65rem 0.85rem',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    <CheckCircle2 size={16} color={previewChallenge.color} />
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-primary)' }}>{h.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{h.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setPreviewChallenge(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  onJoinChallenge(previewChallenge);
                  setPreviewChallenge(null);
                }}
                style={{ backgroundColor: previewChallenge.color, borderColor: previewChallenge.color }}
              >
                Enroll & Begin Stage 1 🚀
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
