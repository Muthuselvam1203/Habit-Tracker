import React, { useState } from 'react';
import { Bell, Calendar, User } from 'lucide-react';
import { getGreeting, formatDisplayDate } from '../../utils/dateUtils';
import { NotificationCenter } from './NotificationCenter';

export const Topbar = ({
  userProfile = {},
  onNavigate,
  notifications = [],
  unreadCount = 0,
  onMarkAllRead,
  onClearAllNotifications,
  onDeleteNotification
}) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const greeting = getGreeting();
  const userName = userProfile.name || 'Friend';
  const currentDateFormatted = formatDisplayDate();

  return (
    <header
      className="topbar-container"
      style={{
        height: 'var(--topbar-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: 'var(--color-white)',
        borderBottom: '1px solid var(--border-subtle)'
      }}
    >
      {/* Left: Greeting & Current Date */}
      <div>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-black)' }}>
          {greeting}, <span style={{ color: 'var(--primary-blue)' }}>{userName}</span>
        </h3>
        <p style={{ fontSize: '0.775rem', color: 'var(--color-text-grey)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '1px' }}>
          <Calendar size={13} /> {currentDateFormatted}
        </p>
      </div>

      {/* Right: Notification Center & Profile Chip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', position: 'relative' }}>
        {/* Notification Bell Toggle */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="btn btn-secondary btn-icon"
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-full)',
              width: '38px',
              height: '38px'
            }}
            aria-label="Toggle notifications"
          >
            <Bell size={18} color="var(--color-black)" />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '18px',
                  height: '18px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--primary-blue)',
                  color: 'var(--color-white)',
                  fontSize: '0.675rem',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid var(--color-white)'
                }}
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notification Drawer Dropdown */}
          <NotificationCenter
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
            notifications={notifications}
            onMarkAllRead={onMarkAllRead}
            onClearAll={onClearAllNotifications}
            onDelete={onDeleteNotification}
          />
        </div>

        {/* User Profile Avatar Pill */}
        <div
          onClick={() => onNavigate('profile')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.3rem 0.65rem 0.3rem 0.35rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-light-grey)',
            border: '1px solid var(--border-subtle)',
            cursor: 'pointer',
            transition: 'border-color var(--transition-fast)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-medium)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
        >
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-deep-navy)',
              color: 'var(--color-white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '0.8rem'
            }}
          >
            {userName.charAt(0).toUpperCase()}
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-black)' }}>
            {userName.split(' ')[0]}
          </span>
        </div>
      </div>
    </header>
  );
};
