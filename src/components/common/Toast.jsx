import React, { useEffect } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, X, RotateCcw } from 'lucide-react';

export const Toast = ({
  toast,
  onClose,
  duration = 4500
}) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [toast, duration, onClose]);

  if (!toast) return null;

  return (
    <div
      className="anim-fade-in"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1200,
        maxWidth: '400px',
        backgroundColor: 'var(--color-deep-navy)',
        color: 'var(--color-white)',
        border: '1px solid var(--color-secondary-navy)',
        borderRadius: 'var(--radius-lg)',
        padding: '1rem 1.25rem',
        boxShadow: 'var(--shadow-lg), 0 4px 20px rgba(7, 17, 31, 0.4)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem'
      }}
      role="alert"
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(37, 99, 235, 0.25)',
          color: '#60A5FA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <Sparkles size={18} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-white)' }}>
          {toast.title || 'Notification'}
        </h4>
        <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {toast.message || toast.description}
        </p>
      </div>

      {toast.undoAction && (
        <button
          onClick={() => {
            toast.undoAction();
            onClose();
          }}
          className="btn btn-sm btn-soft-blue"
          style={{
            padding: '0.35rem 0.65rem',
            fontSize: '0.75rem',
            gap: '0.3rem'
          }}
        >
          <RotateCcw size={12} /> Undo
        </button>
      )}

      <button
        onClick={onClose}
        style={{
          color: '#94A3B8',
          background: 'none',
          border: 'none',
          padding: '4px',
          cursor: 'pointer',
          borderRadius: 'var(--radius-xs)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-label="Close"
      >
        <X size={16} />
      </button>
    </div>
  );
};
