import React from 'react';
import { GOAL_OPTIONS } from '../../data/goalOptions';
import { GoalOption } from './GoalOption';

export const GoalStep = ({ selectedGoal, onSelectGoal }) => {
  return (
    <div className="anim-fade-in">
      <div className="step-header">
        <h2 className="step-title">What's your target?</h2>
        <p className="step-subtitle">Choose your primary focus area for personal growth.</p>
      </div>

      <div className="goal-options-grid">
        {GOAL_OPTIONS.map((goal) => (
          <GoalOption
            key={goal.id}
            goal={goal}
            isSelected={selectedGoal === goal.id}
            onSelect={() => onSelectGoal(goal.id)}
          />
        ))}
      </div>
    </div>
  );
};
