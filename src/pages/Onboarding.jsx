import React, { useState } from 'react';
import { OnboardingLayout } from '../components/onboarding/OnboardingLayout';
import { WakeUpStep } from '../components/onboarding/WakeUpStep';
import { EndDayStep } from '../components/onboarding/EndDayStep';
import { GoalStep } from '../components/onboarding/GoalStep';
import { FirstHabitStep } from '../components/onboarding/FirstHabitStep';
import { SummaryStep } from '../components/onboarding/SummaryStep';
import { PRESET_ONBOARDING_HABITS } from '../data/habitOptions';

export const Onboarding = ({ onCompleteOnboarding, onAddHabit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [wakeUpTime, setWakeUpTime] = useState('06:30');
  const [bedTime, setBedTime] = useState('22:30');
  const [selectedGoal, setSelectedGoal] = useState('healthier');
  const [selectedHabit, setSelectedHabit] = useState(PRESET_ONBOARDING_HABITS[0]);

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleFinish = () => {
    if (selectedHabit && onAddHabit) {
      onAddHabit(selectedHabit);
    }

    onCompleteOnboarding({
      wakeUpTime,
      bedTime,
      goals: [selectedGoal]
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WakeUpStep value={wakeUpTime} onChange={setWakeUpTime} />;
      case 2:
        return <EndDayStep value={bedTime} onChange={setBedTime} />;
      case 3:
        return <GoalStep selectedGoal={selectedGoal} onSelectGoal={setSelectedGoal} />;
      case 4:
        return <FirstHabitStep selectedHabit={selectedHabit} onSelectHabit={setSelectedHabit} />;
      case 5:
        return (
          <SummaryStep
            wakeUpTime={wakeUpTime}
            bedTime={bedTime}
            selectedGoalId={selectedGoal}
            firstHabit={selectedHabit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrev={handlePrev}
      isLastStep={currentStep === totalSteps}
      onComplete={handleFinish}
    >
      {renderStep()}
    </OnboardingLayout>
  );
};
