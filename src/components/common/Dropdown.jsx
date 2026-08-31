import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select option...',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value || opt.id === value);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', width: '100%' }} className={className}>
      <button
        type="button"
        className="form-input"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'left',
          cursor: 'pointer'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption ? selectedOption.label || selectedOption.name : placeholder}</span>
        <ChevronDown size={16} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      {isOpen && (
        <div
          className="anim-scale-in"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            zIndex: 100,
            maxHeight: '220px',
            overflowY: 'auto',
            padding: '0.35rem'
          }}
        >
          {options.map((option) => {
            const optVal = option.value !== undefined ? option.value : option.id;
            const isSelected = optVal === value;
            return (
              <div
                key={optVal}
                onClick={() => {
                  onChange(optVal);
                  setIsOpen(false);
                }}
                style={{
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? 'rgba(255, 122, 0, 0.12)' : 'transparent',
                  color: isSelected ? 'var(--primary-accent)' : 'var(--text-primary)',
                  fontWeight: isSelected ? '600' : '400',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--border-subtle)';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {option.label || option.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
