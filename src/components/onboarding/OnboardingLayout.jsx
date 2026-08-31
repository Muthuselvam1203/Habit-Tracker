import React from 'react';
import { Button } from '../common/Button';
import { Zap, ArrowLeft, ArrowRight, Check } from 'lucide-react';

export const OnboardingLayout = ({
  children,
  currentStep,
  totalSteps = 5,
  onNext,
  onPrev,
  onComplete,
  isLastStep
}) => {
  return (
    <div className="onboarding-page-wrap">
      <div className="onboarding-card anim-scale-in">
        {/* Brand Header & Step Progress Bar */}
        <div className="onboarding-brand-header">
          <div className="onboarding-logo">
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--primary-blue)',
                color: 'var(--color-white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Zap size={16} fill="#FFFFFF" />
            </div>
            <span>STREAKLY</span>
          </div>

          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-text-grey)' }}>
            Step {currentStep} of {totalSteps}
          </span>
        </div>

        {/* 5-Step Segmented Progress Bar */}
        <div className="onboarding-progress-bar">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <div
              key={idx}
              className={`progress-segment ${idx < currentStep ? 'active' : ''}`}
            />
          ))}
        </div>

        {/* Step Body */}
        <div style={{ minHeight: '300px' }}>
          {children}
        </div>

        {/* Footer Navigation */}
        <div className="onboarding-footer">
          {currentStep > 1 ? (
            <Button variant="secondary" onClick={onPrev} icon={ArrowLeft}>
              Back
            </Button>
          ) : (
            <div />
          )}

          {isLastStep ? (
            <Button variant="primary" size="lg" onClick={onComplete} iconRight={Check}>
              Start My Journey
            </Button>
          ) : (
            <Button variant="primary" size="lg" onClick={onNext} iconRight={ArrowRight}>
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
