import React, { useState, useEffect } from 'react';
import { Zap, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { Button } from '../components/common/Button';
import { storage } from '../utils/storage';

export const Login = ({ onLogin }) => {
  const existingProfile = storage.get('user_profile', null);
  const [name, setName] = useState(existingProfile?.name || '');
  const isReturningUser = !!existingProfile?.name;

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalName = name.trim() || (isReturningUser ? existingProfile.name : 'Friend');
    onLogin({ name: finalName });
  };

  return (
    <div
      className="anim-fade-in"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        backgroundColor: 'var(--bg-surface)'
      }}
    >
      <div
        className="card anim-scale-in"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '2.5rem',
          backgroundColor: 'var(--color-white)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--primary-blue)',
              color: 'var(--color-white)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.15rem',
              boxShadow: '0 6px 20px rgba(37, 99, 235, 0.35)'
            }}
          >
            <Zap size={28} fill="#FFFFFF" />
          </div>

          <h1 style={{ fontSize: '1.85rem', fontWeight: '900', letterSpacing: '-0.03em', color: 'var(--color-black)' }}>
            STREAKLY
          </h1>
          
          <p style={{ fontSize: '0.95rem', color: 'var(--color-text-grey)', marginTop: '0.5rem', fontWeight: '500', lineHeight: '1.45' }}>
            Build better habits.<br />Become your better self.
          </p>
        </div>

        {/* Welcome / Returning User Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="user-name-input">
              <span>{isReturningUser ? 'Welcome back' : "What's your name?"}</span>
            </label>
            <div className="input-with-icon">
              <User className="input-icon-left" size={16} />
              <input
                id="user-name-input"
                type="text"
                className="form-input"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
              />
            </div>
          </div>

          <Button variant="primary" type="submit" size="lg" iconRight={ArrowRight} style={{ marginTop: '0.25rem' }}>
            {isReturningUser ? 'Continue to Dashboard' : 'Get Started'}
          </Button>
        </form>

        {/* Subtle Local Storage Guarantee */}
        <div
          style={{
            marginTop: '2rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-subtle)',
            textAlign: 'center',
            fontSize: '0.8rem',
            color: 'var(--color-text-grey)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem'
          }}
        >
          <ShieldCheck size={15} color="var(--primary-blue)" />
          <span>Your data is stored locally in this browser.</span>
        </div>
      </div>
    </div>
  );
};
