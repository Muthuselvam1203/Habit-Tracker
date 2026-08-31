import React, { useRef, useEffect } from 'react';
import { Bell, Check, Trash2, X, Sparkles, Flame, CheckCircle2, Info } from 'lucide-react';

export const NotificationCenter = ({
  isOpen,
  onClose,
  notifications = [],
  onMarkAllRead,
  onClearAll,
  onDelete
}) => {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target) && isOpen) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'completion': return <CheckCircle2 size={16} color="#059669" />;
      case 'milestone': return <Flame size={16} color="#2563EB" />;
      case 'achievement': return <Sparkles size={16} color="#2563EB" />;
      default: return <Info size={16} color="#667085" />;
    }
  };

  return (
    <div
      ref={panelRef}
      className="anim-scale-in"
      style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        right: '0',
        width: '360px',
        maxWidth: '90vw',
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 1000,
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.9rem 1.15rem',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--color-light-grey)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Bell size={16} color="var(--color-black)" />
          <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-black)' }}>
            Notifications
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {notifications.some(n => !n.read) && (
            <button
              onClick={onMarkAllRead}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
            >
              Mark read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={onClearAll}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', color: '#991B1B' }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
        {notifications.length === 0 ? (
          <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--color-text-grey)', fontSize: '0.85rem' }}>
            No recent notifications.
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '0.85rem 1.15rem',
                borderBottom: '1px solid var(--border-subtle)',
                backgroundColor: n.read ? 'transparent' : 'var(--color-light-blue)',
                transition: 'background-color var(--transition-fast)'
              }}
            >
              <div style={{ marginTop: '2px', flexShrink: 0 }}>
                {getIcon(n.type)}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-black)' }}>
                  {n.title}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-grey)', marginTop: '2px', lineHeight: '1.4' }}>
                  {n.message}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '4px' }}>
                  {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {onDelete && (
                <button
                  onClick={() => onDelete(n.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94A3B8',
                    cursor: 'pointer',
                    padding: '2px'
                  }}
                  aria-label="Delete notification"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
