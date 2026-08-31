import React, { useState } from 'react';
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  User,
  Sparkles,
  Flame,
  CheckCircle2,
  Heart,
  Droplets,
  Moon,
  Clock,
  Target,
  Award
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { storage } from '../utils/storage';

export const Login = ({ onLogin }) => {
  const existingProfile = storage.get('user_profile', null);
  const [name, setName] = useState(existingProfile?.name || '');
  const [selectedAvatar, setSelectedAvatar] = useState(existingProfile?.avatar || '⚡');
  const isReturningUser = !!existingProfile?.name;

  const AVATARS = ['⚡', '🔥', '🚀', '🧠', '🌟', '🧘', '💻', '🎯'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalName = name.trim() || (isReturningUser ? existingProfile.name : 'Muthuselvam');
    onLogin({ name: finalName, avatar: selectedAvatar });
  };

  const handleGuestLogin = () => {
    onLogin({ name: 'Muthuselvam', avatar: '⚡', isGuest: true });
  };

  return (
    <div
      className="anim-fade-in login-screen-container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #07111F 0%, #0B1728 50%, #10233B 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Ambient background glow accents */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '10%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none'
        }}
      />

      <div
        className="anim-scale-in"
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          padding: '2.5rem',
          position: 'relative',
          zIndex: 10,
          color: '#FFFFFF'
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
              color: '#FFFFFF',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <Zap size={32} fill="#FFFFFF" />
          </div>

          <h1
            style={{
              fontSize: '2.2rem',
              fontWeight: '900',
              letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #93C5FD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            STREAKLY 2.0
          </h1>
          
          <p
            style={{
              fontSize: '0.95rem',
              color: '#94A3B8',
              marginTop: '0.35rem',
              fontWeight: '500',
              lineHeight: '1.4'
            }}
          >
            Your Personal Daily Life & Habit Operating System
          </p>

          {/* Feature Badges Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.4rem',
              justifyContent: 'center',
              marginTop: '1rem'
            }}
          >
            <span style={featurePillStyle}><Flame size={12} color="#F97316" /> Streaks</span>
            <span style={featurePillStyle}><SunIcon size={12} color="#FBBF24" /> Routines</span>
            <span style={featurePillStyle}><Target size={12} color="#10B981" /> Goals</span>
            <span style={featurePillStyle}><Droplets size={12} color="#06B6D4" /> Water</span>
            <span style={featurePillStyle}><Moon size={12} color="#818CF8" /> Sleep</span>
            <span style={featurePillStyle}><Clock size={12} color="#EC4899" /> Focus</span>
            <span style={featurePillStyle}><Award size={12} color="#F59E0B" /> XP & Badges</span>
          </div>
        </div>

        {/* Quick 1-Click Guest Mode Demo Action */}
        <div style={{ marginBottom: '1.5rem' }}>
          <button
            type="button"
            onClick={handleGuestLogin}
            style={{
              width: '100%',
              padding: '0.9rem 1.25rem',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '0.95rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.65rem',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(37, 99, 235, 0.4)',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(37, 99, 235, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 99, 235, 0.4)';
            }}
          >
            <Sparkles size={18} />
            <span>1-Click Instant Demo / Explore as Muthuselvam</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            margin: '1.25rem 0',
            color: '#64748B',
            fontSize: '0.8rem',
            fontWeight: '600'
          }}
        >
          <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
          <span>OR PERSONALIZE YOUR ACCOUNT</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
        </div>

        {/* Custom User Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: '#CBD5E1',
                marginBottom: '0.45rem'
              }}
              htmlFor="user-name-input"
            >
              {isReturningUser ? 'Welcome back' : "What should we call you?"}
            </label>
            <div style={{ position: 'relative' }}>
              <User
                size={16}
                color="#94A3B8"
                style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                id="user-name-input"
                type="text"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem 0.8rem 2.75rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                placeholder="Enter your name (e.g. Muthuselvam)..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = '#3B82F6')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
              />
            </div>
          </div>

          {/* Avatar Choice */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: '600',
                color: '#94A3B8',
                marginBottom: '0.4rem'
              }}
            >
              Choose your profile emblem
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {AVATARS.map((emoji) => (
                <button
                  type="button"
                  key={emoji}
                  onClick={() => setSelectedAvatar(emoji)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: selectedAvatar === emoji ? 'rgba(37, 99, 235, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                    border: selectedAvatar === emoji ? '2px solid #3B82F6' : '1px solid rgba(255, 255, 255, 0.08)',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s'
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.85rem 1.25rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '0.925rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
          >
            <span>{isReturningUser ? 'Continue to Dashboard' : 'Launch Life OS'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Security / Privacy Guarantee */}
        <div
          style={{
            marginTop: '1.75rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            textAlign: 'center',
            fontSize: '0.78rem',
            color: '#64748B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.45rem'
          }}
        >
          <ShieldCheck size={14} color="#3B82F6" />
          <span>100% Private. All routine, wellness & habit data stays safely in your browser.</span>
        </div>
      </div>
    </div>
  );
};

const featurePillStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.06)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '999px',
  padding: '0.2rem 0.55rem',
  fontSize: '0.725rem',
  fontWeight: '600',
  color: '#E2E8F0',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.3rem'
};

const SunIcon = ({ size = 16, color = '#FBBF24' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);
