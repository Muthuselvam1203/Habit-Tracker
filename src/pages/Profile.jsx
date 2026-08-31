import React, { useState } from 'react';
import { User, Flame, Clock, Award, CheckCircle2, Trophy, Percent, Check, Calendar, LogOut } from 'lucide-react';
import { Button } from '../components/common/Button';
import { formatTime, formatDisplayDate } from '../utils/dateUtils';

export const Profile = ({
  userProfile = {},
  onUpdateProfile,
  onLogout,
  stats = {},
  unlockedCount = 0
}) => {
  const [name, setName] = useState(userProfile.name || 'Friend');
  const [wakeUpTime, setWakeUpTime] = useState(userProfile.wakeUpTime || '06:30');
  const [bedTime, setBedTime] = useState(userProfile.bedTime || '22:30');
  const [saved, setSaved] = useState(false);

  const memberSinceFormatted = userProfile.memberSince
    ? formatDisplayDate(userProfile.memberSince)
    : formatDisplayDate();

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateProfile({
      name: name.trim() || 'Friend',
      wakeUpTime,
      bedTime
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="anim-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: '800px', paddingBottom: '2.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-primary)' }}>
            Personal Profile
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Manage your identity, circadian routine schedule, and consistency statistics.
          </p>
        </div>

        {onLogout && (
          <Button variant="secondary" onClick={onLogout} icon={LogOut}>
            Sign Out
          </Button>
        )}
      </div>

      {/* Profile Overview Banner */}
      <div
        className="card"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          backgroundColor: 'var(--bg-card)'
        }}
      >
        <div
          style={{
            width: '68px',
            height: '68px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--primary-blue)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.65rem',
            fontWeight: '800',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
            flexShrink: 0
          }}
        >
          {name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)' }}>{name}</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Calendar size={13} /> Member since {memberSinceFormatted}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.65rem', flexWrap: 'wrap' }}>
            <span className="badge-blue">
              <Flame size={14} /> {stats.bestStreak || 0}d Longest Streak
            </span>
            <span className="badge-navy">
              <Award size={14} /> {unlockedCount} Badges Unlocked
            </span>
          </div>
        </div>
      </div>

      {/* 4 Summary Stats */}
      <div className="profile-stats-grid">
        <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Current Streak</div>
          <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            {stats.currentStreak || 0}d
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Longest Streak</div>
          <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            {stats.bestStreak || 0}d
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Active Habits</div>
          <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--primary-blue)', marginTop: '0.2rem' }}>
            {stats.totalActive || 0}
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Total Check-ins</div>
          <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--status-success-text)', marginTop: '0.2rem' }}>
            {stats.totalCompletions || 0}
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="card">
        <h4 className="card-title" style={{ marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
          <User size={18} color="var(--primary-blue)" /> Account & Routine Settings
        </h4>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label className="form-label">Display Name</label>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-row-2col">
            <div className="form-group">
              <label className="form-label">
                <span>Wake Up Time</span>
                <span className="form-hint">Daily routine start</span>
              </label>
              <input
                type="time"
                className="form-input"
                value={wakeUpTime}
                onChange={(e) => setWakeUpTime(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>End of Day Time</span>
                <span className="form-hint">Wind down time</span>
              </label>
              <input
                type="time"
                className="form-input"
                value={bedTime}
                onChange={(e) => setBedTime(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            {saved && (
              <span style={{ color: '#059669', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Check size={16} /> Changes saved successfully!
              </span>
            )}
            <Button variant="primary" type="submit">
              Save Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
