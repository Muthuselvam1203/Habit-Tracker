import React from 'react';
import { Activity, Heart, Brain, BookOpen, Zap, Users, Sparkles, TrendingUp } from 'lucide-react';

export const LifeScoreCard = ({ lifeScore = {} }) => {
  const total = lifeScore.totalLifeScore ?? 87;
  const categories = lifeScore.categories || {
    health: 91,
    mind: 84,
    learning: 88,
    productivity: 82,
    social: 79
  };

  const getScoreColor = (score) => {
    if (score >= 85) return '#10B981'; // Emerald
    if (score >= 70) return '#3B82F6'; // Blue
    if (score >= 50) return '#F59E0B'; // Amber
    return '#EF4444'; // Red
  };

  const scoreColor = getScoreColor(total);

  return (
    <div
      className="card"
      style={{
        background: 'linear-gradient(135deg, #07111F 0%, #0B1728 60%, #10233B 100%)',
        color: '#FFFFFF',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background glow circle */}
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: scoreColor,
          opacity: 0.15,
          filter: 'blur(30px)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#94A3B8', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Activity size={14} color={scoreColor} />
            <span>Streakly Life Score</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginTop: '0.35rem' }}>
            <span style={{ fontSize: '2.4rem', fontWeight: '900', color: '#FFFFFF', lineHeight: 1 }}>
              {total}
            </span>
            <span style={{ fontSize: '1rem', color: '#94A3B8', fontWeight: '700' }}>
              / 100
            </span>
          </div>
        </div>

        <div
          style={{
            padding: '0.35rem 0.75rem',
            borderRadius: '999px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: `1px solid ${scoreColor}40`,
            fontSize: '0.75rem',
            fontWeight: '700',
            color: scoreColor,
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}
        >
          <TrendingUp size={13} />
          <span>{total >= 80 ? 'Optimal Flow' : 'On Track'}</span>
        </div>
      </div>

      {/* Main Total Progress Bar */}
      <div
        style={{
          height: '8px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '999px',
          overflow: 'hidden',
          marginBottom: '1.25rem'
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${total}%`,
            background: `linear-gradient(90deg, ${scoreColor} 0%, #60A5FA 100%)`,
            borderRadius: '999px',
            transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
      </div>

      {/* 5-Category Breakdown Mini Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        <CategoryScoreRow icon={Heart} label="Health & Body" score={categories.health || 91} color="#10B981" />
        <CategoryScoreRow icon={Brain} label="Mind & Calm" score={categories.mind || 84} color="#8B5CF6" />
        <CategoryScoreRow icon={BookOpen} label="Learning & Growth" score={categories.learning || 88} color="#3B82F6" />
        <CategoryScoreRow icon={Zap} label="Productivity" score={categories.productivity || 82} color="#F59E0B" />
        <CategoryScoreRow icon={Users} label="Social & Well-being" score={categories.social || 79} color="#EC4899" />
      </div>
    </div>
  );
};

const CategoryScoreRow = ({ icon: Icon, label, score, color }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#CBD5E1', fontWeight: '600' }}>
        <Icon size={12} color={color} /> {label}
      </span>
      <span style={{ fontWeight: '700', color: '#FFFFFF' }}>{score}%</span>
    </div>
    <div
      style={{
        height: '4px',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '999px',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${score}%`,
          backgroundColor: color,
          borderRadius: '999px',
          transition: 'width 0.5s ease-out'
        }}
      />
    </div>
  </div>
);
