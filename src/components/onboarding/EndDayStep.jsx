import React from 'react';
import { Moon } from 'lucide-react';

const PRESET_TIMES = ['21:30', '22:00', '22:30', '23:00', '23:30', '00:00'];

export const EndDayStep = ({ value, onChange }) => {
  return (
    <div className="anim-fade-in">
      <div className="step-header">
        <h2 className="step-title">What time do you usually end your day?</h2>
        <p className="step-subtitle">We'll align your evening habits before wind-down.</p>
      </div>

      {/* Preset Buttons */}
      <div className="time-preset-grid">
        {PRESET_TIMES.map((time) => {
          const isSelected = value === time;
          const [h, m] = time.split(':');
          const hourNum = parseInt(h, 10);
          const display12 = hourNum === 0 ? `12:${m} AM` : hourNum > 12 ? `${hourNum - 12}:${m} PM` : `${hourNum}:${m} PM`;

          return (
            <button
              type="button"
              key={time}
              className={`time-preset-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => onChange(time)}
            >
              {display12}
            </button>
          );
        })}
      </div>

      {/* Custom Time Input */}
      <div className="form-group" style={{ maxWidth: '280px', margin: '1rem auto 0 auto' }}>
        <label className="form-label" style={{ justifyContent: 'center' }}>
          <span>Or choose custom time</span>
        </label>
        <div className="input-with-icon">
          <Moon className="input-icon-left" size={16} />
          <input
            type="time"
            className="form-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
