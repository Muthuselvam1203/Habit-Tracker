import React, { useEffect, useRef } from 'react';
import { Edit3, Eye, Archive, Trash2 } from 'lucide-react';

export const HabitMenu = ({
  habit,
  position = { x: 0, y: 0 },
  onClose,
  onEdit,
  onViewDetails,
  onToggleArchive,
  onDelete
}) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [onClose]);

  if (!habit) return null;

  return (
    <div
      ref={menuRef}
      className="anim-scale-in"
      style={{
        position: 'fixed',
        top: `${Math.min(window.innerHeight - 200, position.y)}px`,
        left: `${Math.min(window.innerWidth - 200, position.x)}px`,
        backgroundColor: 'var(--bg-surface-elevated)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 1050,
        minWidth: '175px',
        padding: '0.4rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
      }}
    >
      <button
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          padding: '0.55rem 0.85rem',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--text-primary)',
          fontSize: '0.875rem',
          fontWeight: '500',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left'
        }}
        onClick={() => {
          onViewDetails(habit);
          onClose();
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--border-subtle)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <Eye size={15} /> View History
      </button>

      <button
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          padding: '0.55rem 0.85rem',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--text-primary)',
          fontSize: '0.875rem',
          fontWeight: '500',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left'
        }}
        onClick={() => {
          onEdit(habit);
          onClose();
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--border-subtle)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <Edit3 size={15} /> Edit Habit
      </button>

      <button
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          padding: '0.55rem 0.85rem',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--text-primary)',
          fontSize: '0.875rem',
          fontWeight: '500',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left'
        }}
        onClick={() => {
          onToggleArchive(habit.id);
          onClose();
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--border-subtle)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <Archive size={15} /> {habit.archived ? 'Unarchive' : 'Archive'}
      </button>

      <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '0.2rem 0' }} />

      <button
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          padding: '0.55rem 0.85rem',
          borderRadius: 'var(--radius-sm)',
          color: '#EF4444',
          fontSize: '0.875rem',
          fontWeight: '500',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left'
        }}
        onClick={() => {
          onDelete(habit.id);
          onClose();
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.12)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <Trash2 size={15} /> Delete Habit
      </button>
    </div>
  );
};
