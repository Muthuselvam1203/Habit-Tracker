import React, { useState } from 'react';
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  User,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Flame,
  CheckCircle2,
  Heart,
  Droplets,
  Moon,
  Clock,
  Target,
  Award,
  LogIn,
  UserPlus
} from 'lucide-react';
import { storage } from '../utils/storage';

export const Login = ({ onLogin }) => {
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState('⚡');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const AVATARS = ['⚡', '🔥', '🚀', '🧠', '🌟', '🧘', '💻', '🎯', '👑', '🌿'];

  // Handle Sign In
  const handleSignIn = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!username.trim()) {
      setErrorMsg('Please enter your username or email.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    const savedUsers = storage.get('auth_users', []);
    const foundUser = savedUsers.find(
      u => u.username.toLowerCase() === username.trim().toLowerCase()
    );

    if (foundUser) {
      if (foundUser.password !== password) {
        setErrorMsg('Incorrect password. Please verify and try again.');
        return;
      }
      // Successful match
      const sessionUser = {
        name: foundUser.name || foundUser.username,
        username: foundUser.username,
        avatar: foundUser.avatar || '⚡',
        isGuest: false
      };
      storage.set('authenticated_user', sessionUser);
      storage.set('user_profile', { name: sessionUser.name, avatar: sessionUser.avatar });
      setSuccessMsg(`Welcome back, ${sessionUser.name}! Logging in...`);
      setTimeout(() => onLogin(sessionUser), 400);
    } else {
      // First-time or unregistered username: automatically initialize smart profile
      const newUser = {
        name: username.trim(),
        username: username.trim(),
        password: password,
        avatar: selectedAvatar,
        createdAt: new Date().toISOString()
      };
      storage.set('auth_users', [...savedUsers, newUser]);
      storage.set('authenticated_user', newUser);
      storage.set('user_profile', { name: newUser.name, avatar: newUser.avatar });
      setSuccessMsg(`Welcome to Streakly, ${newUser.name}! Setting up...`);
      setTimeout(() => onLogin({ name: newUser.name, avatar: newUser.avatar, isGuest: false }), 400);
    }
  };

  // Handle Sign Up
  const handleSignUp = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!username.trim() || !password) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (password.length < 4) {
      setErrorMsg('Password must be at least 4 characters long.');
      return;
    }

    const savedUsers = storage.get('auth_users', []);
    const exists = savedUsers.some(
      u => u.username.toLowerCase() === username.trim().toLowerCase()
    );

    if (exists) {
      setErrorMsg('This username already exists. Please sign in or choose another.');
      return;
    }

    const newUser = {
      name: fullName.trim() || username.trim(),
      username: username.trim(),
      password: password,
      avatar: selectedAvatar,
      createdAt: new Date().toISOString()
    };

    storage.set('auth_users', [...savedUsers, newUser]);
    storage.set('authenticated_user', newUser);
    storage.set('user_profile', { name: newUser.name, avatar: newUser.avatar });
    setSuccessMsg(`Account created for ${newUser.name}! Redirecting...`);
    setTimeout(() => onLogin({ name: newUser.name, avatar: newUser.avatar, isGuest: false }), 400);
  };

  // 1-Click Instant Guest Mode for Muthuselvam
  const handleGuestLogin = () => {
    const guestUser = {
      name: 'Muthuselvam',
      username: 'muthuselvam_guest',
      avatar: '⚡',
      isGuest: true
    };
    storage.set('authenticated_user', guestUser);
    storage.set('user_profile', { name: 'Muthuselvam', avatar: '⚡' });
    onLogin(guestUser);
  };

  return (
    <div
      className="anim-fade-in login-screen-container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem 1rem',
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
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.28) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.22) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}
      />

      <div
        className="anim-scale-in"
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.12)',
          padding: '2.5rem 2rem',
          position: 'relative',
          zIndex: 10,
          color: '#FFFFFF'
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div
            style={{
              width: '58px',
              height: '58px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
              color: '#FFFFFF',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '0.85rem',
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <Zap size={28} fill="#FFFFFF" />
          </div>

          <h1
            style={{
              fontSize: '2rem',
              fontWeight: '900',
              letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #93C5FD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}
          >
            STREAKLY
          </h1>
          
          <p
            style={{
              fontSize: '0.875rem',
              color: '#94A3B8',
              marginTop: '0.25rem',
              fontWeight: '500'
            }}
          >
            Personal Daily Life & Habit Operating System
          </p>

          {/* Feature Badges Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.35rem',
              justifyContent: 'center',
              marginTop: '0.85rem'
            }}
          >
            <span style={featurePillStyle}><Flame size={11} color="#F97316" /> Streaks</span>
            <span style={featurePillStyle}><SunIcon size={11} color="#FBBF24" /> Routines</span>
            <span style={featurePillStyle}><Target size={11} color="#10B981" /> Goals</span>
            <span style={featurePillStyle}><Droplets size={11} color="#06B6D4" /> Water</span>
            <span style={featurePillStyle}><Moon size={11} color="#818CF8" /> Sleep</span>
            <span style={featurePillStyle}><Clock size={11} color="#EC4899" /> Focus</span>
            <span style={featurePillStyle}><Award size={11} color="#F59E0B" /> XP</span>
          </div>
        </div>

        {/* 1-Click Instant Guest Mode Hero Button */}
        <div style={{ marginBottom: '1.25rem' }}>
          <button
            type="button"
            onClick={handleGuestLogin}
            style={{
              width: '100%',
              padding: '0.85rem 1.25rem',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              fontSize: '0.925rem',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.65rem',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(37, 99, 235, 0.45)',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(37, 99, 235, 0.65)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 99, 235, 0.45)';
            }}
          >
            <Sparkles size={17} />
            <span>1-Click Instant Guest Mode (Muthuselvam)</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            margin: '1.25rem 0',
            color: '#64748B',
            fontSize: '0.75rem',
            fontWeight: '700',
            letterSpacing: '0.05em'
          }}
        >
          <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
          <span>OR SIGN IN WITH CREDENTIALS</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
        </div>

        {/* Auth Mode Toggle Tabs (Sign In / Register) */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            padding: '0.3rem',
            borderRadius: '12px',
            marginBottom: '1.25rem',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <button
            type="button"
            onClick={() => { setAuthMode('signin'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '0.55rem',
              borderRadius: '9px',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: '700',
              backgroundColor: authMode === 'signin' ? '#2563EB' : 'transparent',
              color: authMode === 'signin' ? '#FFFFFF' : '#94A3B8',
              cursor: 'pointer',
              transition: 'all 0.15s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem'
            }}
          >
            <LogIn size={15} />
            <span>Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => { setAuthMode('signup'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '0.55rem',
              borderRadius: '9px',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: '700',
              backgroundColor: authMode === 'signup' ? '#2563EB' : 'transparent',
              color: authMode === 'signup' ? '#FFFFFF' : '#94A3B8',
              cursor: 'pointer',
              transition: 'all 0.15s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem'
            }}
          >
            <UserPlus size={15} />
            <span>Create Account</span>
          </button>
        </div>

        {/* Status Error / Success alerts */}
        {errorMsg && (
          <div
            className="anim-scale-in"
            style={{
              padding: '0.65rem 0.85rem',
              borderRadius: '10px',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#FCA5A5',
              fontSize: '0.825rem',
              fontWeight: '600',
              marginBottom: '1rem',
              textAlign: 'center'
            }}
          >
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div
            className="anim-scale-in"
            style={{
              padding: '0.65rem 0.85rem',
              borderRadius: '10px',
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              color: '#6EE7B7',
              fontSize: '0.825rem',
              fontWeight: '600',
              marginBottom: '1rem',
              textAlign: 'center'
            }}
          >
            {successMsg}
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={authMode === 'signin' ? handleSignIn : handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Full Name for Sign Up */}
          {authMode === 'signup' && (
            <div className="anim-scale-in">
              <label style={labelStyle}>Your Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="#94A3B8" style={inputIconStyle} />
                <input
                  type="text"
                  style={inputStyle}
                  placeholder="e.g. Muthuselvam"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Username */}
          <div>
            <label style={labelStyle}>Username / Email</label>
            <div style={{ position: 'relative' }}>
              <User size={16} color="#94A3B8" style={inputIconStyle} />
              <input
                type="text"
                style={inputStyle}
                placeholder="Enter your username (e.g. Muthuselvam)..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={labelStyle}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#94A3B8" style={inputIconStyle} />
              <input
                type={showPassword ? 'text' : 'password'}
                style={{ ...inputStyle, paddingRight: '2.75rem' }}
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Profile Emblem Picker for Sign Up */}
          {authMode === 'signup' && (
            <div className="anim-scale-in">
              <label style={labelStyle}>Choose Profile Emblem</label>
              <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                {AVATARS.map((emoji) => (
                  <button
                    type="button"
                    key={emoji}
                    onClick={() => setSelectedAvatar(emoji)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: selectedAvatar === emoji ? 'rgba(37, 99, 235, 0.4)' : 'rgba(255, 255, 255, 0.06)',
                      border: selectedAvatar === emoji ? '2px solid #3B82F6' : '1px solid rgba(255, 255, 255, 0.1)',
                      fontSize: '1.1rem',
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
          )}

          {/* Remember me & Submit button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', color: '#94A3B8', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: '#2563EB' }}
              />
              <span>Remember this browser</span>
            </label>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.85rem 1.25rem',
              borderRadius: '12px',
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '0.925rem',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              marginTop: '0.5rem',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
              transition: 'all 0.15s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1D4ED8')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
          >
            <span>{authMode === 'signin' ? 'Sign In & Launch' : 'Create & Launch'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Security / Privacy Guarantee */}
        <div
          style={{
            marginTop: '1.5rem',
            paddingTop: '1.15rem',
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
          <span>Local-first & 100% Private. User credentials and habits stay stored in this device's storage.</span>
        </div>
      </div>
    </div>
  );
};

const labelStyle = {
  display: 'block',
  fontSize: '0.825rem',
  fontWeight: '700',
  color: '#CBD5E1',
  marginBottom: '0.35rem'
};

const inputIconStyle = {
  position: 'absolute',
  left: '0.9rem',
  top: '50%',
  transform: 'translateY(-50%)'
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem 0.75rem 2.6rem',
  backgroundColor: 'rgba(255, 255, 255, 0.06)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  borderRadius: '12px',
  color: '#FFFFFF',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box'
};

const featurePillStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.06)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '999px',
  padding: '0.15rem 0.5rem',
  fontSize: '0.7rem',
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
