import React from 'react';
import { Clock } from 'lucide-react';

const PRESET_TIMES = ['05:30', '06:00', '06:30', '07:00', '07:30', '08:00'];

export const WakeUpStep = ({ value, onChange }) => {
  return (
    <div className="anim-fade-in">
      <div className="step-header">
        <h2 className="step-title">What time do you usually get up?</h2>
        <p className="step-subtitle">We'll use this to personalize your daily routine.</p>
      </div>

      {/* Preset Buttons */}
      <div className="time-preset-grid">
        {PRESET_TIMES.map((time) => {
          const isSelected = value === time;
          const [h, m] = time.split(':');
          const display12 = `${parseInt(h, 10)}:${m} AM`;

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
          <Clock className="input-icon-left" size={16} />
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
