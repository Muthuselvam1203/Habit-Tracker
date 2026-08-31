import React from 'react';
import { formatTime } from '../../utils/dateUtils';

export const TimeSelector = ({
  value = '07:00',
  onChange,
  presets = ['05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30']
}) => {
  return (
    <div className="time-selector-container">
      <div className="time-display-big flame-gradient-text">
        {formatTime(value)}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <input
          type="time"
          className="form-input"
          style={{ width: '160px', textAlign: 'center', fontSize: '1.1rem', fontWeight: '700' }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <div className="time-presets-grid">
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            className={`time-preset-chip ${value === preset ? 'active' : ''}`}
            onClick={() => onChange(preset)}
          >
            {formatTime(preset)}
          </button>
        ))}
      </div>
    </div>
  );
};
