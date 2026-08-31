import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useOnboarding = () => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useLocalStorage('onboarding_completed', false);
  const [userProfile, setUserProfile] = useLocalStorage('user_profile', {
    name: 'Muthuselvam',
    wakeUpTime: '06:30',
    bedTime: '22:30',
    goals: ['healthier', 'focused'],
    memberSince: new Date().toISOString()
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const updateProfile = useCallback((updates) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  }, [setUserProfile]);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const completeOnboarding = useCallback((finalData = {}) => {
    setUserProfile(prev => ({
      ...prev,
      ...finalData,
      memberSince: prev.memberSince || new Date().toISOString()
    }));
    setIsOnboardingCompleted(true);
  }, [setUserProfile, setIsOnboardingCompleted]);

  const resetOnboarding = useCallback(() => {
    setIsOnboardingCompleted(false);
    setCurrentStep(1);
  }, [setIsOnboardingCompleted]);

  return {
    isOnboardingCompleted,
    userProfile,
    currentStep,
    totalSteps,
    updateProfile,
    nextStep,
    prevStep,
    completeOnboarding,
    resetOnboarding
  };
};
