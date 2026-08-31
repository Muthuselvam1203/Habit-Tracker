import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  useParams
} from 'react-router-dom';
import { useHabits } from './hooks/useHabits';
import { useOnboarding } from './hooks/useOnboarding';
import { useNotifications } from './hooks/useNotifications';
import { AppLayout } from './components/layout/AppLayout';
import { HabitModal } from './components/habits/HabitModal';
import { FocusModal } from './components/focus/FocusModal';
import { Toast } from './components/common/Toast';
import { ConfirmDialog } from './components/common/ConfirmDialog';
import { MilestoneModal } from './components/common/MilestoneModal';

// Pages
import { Login } from './pages/Login';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { MyDay } from './pages/MyDay';
import { Habits } from './pages/Habits';
import { Challenges } from './pages/Challenges';
import { HabitDetails } from './pages/HabitDetails';
import { Routines } from './pages/Routines';
import { Goals } from './pages/Goals';
import { Tasks } from './pages/Tasks';
import { Focus } from './pages/Focus';
import { Wellness } from './pages/Wellness';
import { DailyJournal } from './pages/DailyJournal';
import { Calendar } from './pages/Calendar';
import { Analytics } from './pages/Analytics';
import { Achievements } from './pages/Achievements';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

// Habit Details Route Wrapper to extract :id param
const HabitDetailsRoute = ({
  habits,
  completions,
  onEdit,
  onToggleArchive,
  onDelete,
  onToggleCompletion
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const habit = habits.find(h => h.id === id);

  return (
    <HabitDetails
      habit={habit}
      completions={completions}
      onBack={() => navigate('/habits')}
      onEdit={onEdit}
      onToggleArchive={onToggleArchive}
      onDelete={onDelete}
      onToggleCompletion={onToggleCompletion}
    />
  );
};

// Main App Container Component inside Router
const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('streakly_authenticated') === 'true';
  });

  const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [habitToDelete, setHabitToDelete] = useState(null);
  const [isFocusModalOpen, setIsFocusModalOpen] = useState(false);

  const {
    theme,
    toggleTheme,
    habits,
    tasks,
    focusSessions,
    completions,
    stats,
    morningRoutine,
    nightRoutine,
    routineLogs,
    wellnessLogs,
    badHabits,
    goals,
    challengesProgress,
    joinChallenge,
    leaveChallenge,
    toggleChallengeDay,
    incrementHabitProgress,
    logHabitDiaryNote,
    userXp,
    userLevel,
    streakFreezes,
    lifeScore,
    unlockedAchievements,
    newAchievementAlert,
    setNewAchievementAlert,
    activeMilestone,
    setActiveMilestone,
    toastMessage,
    setToastMessage,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleArchiveHabit,
    toggleHabitCompletion,
    toggleRoutineStep,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    setMorningRoutine,
    setNightRoutine,
    updateDailyWellness,
    addWater,
    addGoal,
    updateGoal,
    deleteGoal,
    addBadHabit,
    resetBadHabit,
    deleteBadHabit,
    useStreakFreeze,
    logFocusSession,
    seedDemoData,
    clearHabits
  } = useHabits();

  const {
    isOnboardingCompleted,
    userProfile,
    updateProfile,
    completeOnboarding,
    resetOnboarding
  } = useOnboarding();

  const {
    notifications,
    unreadCount,
    markAllAsRead,
    clearAllNotifications,
    deleteNotification
  } = useNotifications();

  // Authentication Handlers
  const handleLogin = (user) => {
    setIsAuthenticated(true);
    localStorage.setItem('streakly_authenticated', 'true');
    if (user?.name) updateProfile({ name: user.name, avatar: user.avatar || '⚡' });
    if (user?.isGuest) {
      seedDemoData();
    }
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('streakly_authenticated');
    setIsAuthenticated(false);
    navigate('/');
  };

  // Modal open handlers
  const handleOpenEditHabit = (habit) => {
    setEditingHabit(habit);
    setIsHabitModalOpen(true);
  };

  const handleOpenNewHabit = () => {
    setEditingHabit(null);
    setIsHabitModalOpen(true);
  };

  const handleSaveHabit = (data) => {
    if (editingHabit) {
      updateHabit(editingHabit.id, data);
    } else {
      addHabit(data);
    }
  };

  const handleDeleteHabitRequest = (habitId) => {
    setHabitToDelete(habitId);
  };

  const handleConfirmDelete = () => {
    if (habitToDelete) {
      deleteHabit(habitToDelete);
      setHabitToDelete(null);
      if (location.pathname.startsWith('/habits/')) {
        navigate('/habits');
      }
    }
  };

  // Determine current active navigation path from location.pathname
  const getCurrentNavPath = () => {
    const p = location.pathname;
    if (p.startsWith('/my-day')) return 'my-day';
    if (p.startsWith('/habits')) return 'habits';
    if (p.startsWith('/challenges')) return 'challenges';
    if (p.startsWith('/routines')) return 'routines';
    if (p.startsWith('/goals')) return 'goals';
    if (p.startsWith('/tasks')) return 'tasks';
    if (p.startsWith('/focus')) return 'focus';
    if (p.startsWith('/wellness')) return 'wellness';
    if (p.startsWith('/journal')) return 'journal';
    if (p.startsWith('/calendar')) return 'calendar';
    if (p.startsWith('/analytics')) return 'analytics';
    if (p.startsWith('/achievements')) return 'achievements';
    if (p.startsWith('/profile')) return 'profile';
    if (p.startsWith('/settings')) return 'settings';
    return 'dashboard';
  };

  // 1. Not Authenticated
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="*" element={<Login onLogin={handleLogin} />} />
      </Routes>
    );
  }

  // 2. Authenticated App Layout with full React Router
  return (
    <AppLayout
      currentPath={getCurrentNavPath()}
      onNavigate={(path) => navigate(`/${path}`)}
      onOpenNewHabit={handleOpenNewHabit}
      onOpenNewTask={() => navigate('/tasks')}
      onOpenNewGoal={() => navigate('/goals')}
      onAddWater={addWater}
      onOpenFocus={() => setIsFocusModalOpen(true)}
      userProfile={userProfile}
      streakCount={stats.bestStreak}
      theme={theme}
      onToggleTheme={toggleTheme}
      habits={habits}
      goals={goals}
      tasks={tasks}
      notifications={notifications}
      unreadCount={unreadCount}
      onMarkAllRead={markAllAsRead}
      onClearAllNotifications={clearAllNotifications}
      onDeleteNotification={deleteNotification}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <Dashboard
              userProfile={userProfile}
              habits={habits}
              completions={completions}
              stats={stats}
              morningRoutine={morningRoutine}
              nightRoutine={nightRoutine}
              routineLogs={routineLogs}
              wellnessLogs={wellnessLogs}
              badHabits={badHabits}
              goals={goals}
              lifeScore={lifeScore}
              streakFreezes={streakFreezes}
              onToggleCompletion={toggleHabitCompletion}
              onToggleRoutineStep={toggleRoutineStep}
              onOpenHabitDetails={(habit) => navigate(`/habits/${habit.id}`)}
              onOpenNewHabit={handleOpenNewHabit}
              onOpenEdit={handleOpenEditHabit}
              onToggleArchive={toggleArchiveHabit}
              onDelete={handleDeleteHabitRequest}
              onAddHabit={addHabit}
              onAddWater={addWater}
              onUpdateWellness={updateDailyWellness}
              onResetBadHabit={resetBadHabit}
              onUseStreakFreeze={useStreakFreeze}
              onLogFocus={logFocusSession}
              onNavigate={(path) => navigate(`/${path}`)}
            />
          }
        />

        {/* ⭐ MY DAY Signature Central Screen */}
        <Route
          path="/my-day"
          element={
            <MyDay
              userProfile={userProfile}
              habits={habits}
              completions={completions}
              tasks={tasks}
              challengesProgress={challengesProgress}
              morningRoutine={morningRoutine}
              nightRoutine={nightRoutine}
              routineLogs={routineLogs}
              wellnessLogs={wellnessLogs}
              lifeScore={lifeScore}
              onToggleHabit={toggleHabitCompletion}
              onIncrementHabit={incrementHabitProgress}
              onLogHabitNote={logHabitDiaryNote}
              onToggleTask={toggleTaskCompletion}
              onToggleRoutine={toggleRoutineStep}
              onToggleChallengeDay={toggleChallengeDay}
              onAddWater={addWater}
              onUpdateWellness={updateDailyWellness}
              onOpenFocus={() => setIsFocusModalOpen(true)}
              onOpenNewHabit={handleOpenNewHabit}
              onOpenNewTask={() => navigate('/tasks')}
              onNavigate={(path) => navigate(`/${path}`)}
            />
          }
        />

        {/* 🏆 30-Day Scientific Challenges & Journeys (Tickit Workflow) */}
        <Route
          path="/challenges"
          element={
            <Challenges
              challengesProgress={challengesProgress}
              habits={habits}
              completions={completions}
              onJoinChallenge={joinChallenge}
              onLeaveChallenge={leaveChallenge}
              onToggleChallengeDay={toggleChallengeDay}
              onOpenHabitDetails={(habit) => navigate(`/habits/${habit.id}`)}
              onNavigate={(path) => navigate(`/${path}`)}
            />
          }
        />

        {/* Habits Route */}
        <Route
          path="/habits"
          element={
            <Habits
              habits={habits}
              completions={completions}
              onToggleCompletion={toggleHabitCompletion}
              onIncrement={incrementHabitProgress}
              onLogNote={logHabitDiaryNote}
              onOpenHabitDetails={(habit) => navigate(`/habits/${habit.id}`)}
              onOpenNewHabit={handleOpenNewHabit}
              onOpenEdit={handleOpenEditHabit}
              onToggleArchive={toggleArchiveHabit}
              onDelete={handleDeleteHabitRequest}
              onStartTimer={() => setIsFocusModalOpen(true)}
            />
          }
        />

        {/* Habit Details Route */}
        <Route
          path="/habits/:id"
          element={
            <HabitDetailsRoute
              habits={habits}
              completions={completions}
              onEdit={handleOpenEditHabit}
              onToggleArchive={toggleArchiveHabit}
              onDelete={handleDeleteHabitRequest}
              onToggleCompletion={toggleHabitCompletion}
            />
          }
        />

        {/* Morning & Night Routine System */}
        <Route
          path="/routines"
          element={
            <Routines
              morningRoutine={morningRoutine}
              nightRoutine={nightRoutine}
              routineLogs={routineLogs}
              onToggleRoutineStep={toggleRoutineStep}
              onSetMorningRoutine={setMorningRoutine}
              onSetNightRoutine={setNightRoutine}
            />
          }
        />

        {/* Goals -> Habits Architecture */}
        <Route
          path="/goals"
          element={
            <Goals
              goals={goals}
              habits={habits}
              completions={completions}
              onAddGoal={addGoal}
              onUpdateGoal={updateGoal}
              onDeleteGoal={deleteGoal}
              onOpenHabitDetails={(habit) => navigate(`/habits/${habit.id}`)}
            />
          }
        />

        {/* Tasks Management */}
        <Route
          path="/tasks"
          element={
            <Tasks
              tasks={tasks}
              onAddTask={addTask}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
              onToggleTaskCompletion={toggleTaskCompletion}
            />
          }
        />

        {/* Focus Hub */}
        <Route
          path="/focus"
          element={
            <Focus
              focusSessions={focusSessions}
              habits={habits}
              onLogFocusSession={logFocusSession}
            />
          }
        />

        {/* Wellness Hub (Water, Sleep, Mood, Energy, Screen Time) */}
        <Route
          path="/wellness"
          element={
            <Wellness
              wellnessLogs={wellnessLogs}
              habits={habits}
              completions={completions}
              onAddWater={addWater}
              onUpdateWellness={updateDailyWellness}
            />
          }
        />

        {/* Daily Reflection Journal */}
        <Route
          path="/journal"
          element={
            <DailyJournal
              wellnessLogs={wellnessLogs}
              onUpdateWellness={updateDailyWellness}
            />
          }
        />

        {/* Calendar & Heatmap */}
        <Route
          path="/calendar"
          element={
            <Calendar
              habits={habits}
              completions={completions}
              onToggleCompletion={toggleHabitCompletion}
            />
          }
        />

        {/* Behavioral Analytics */}
        <Route
          path="/analytics"
          element={
            <Analytics
              habits={habits}
              completions={completions}
              stats={stats}
              wellnessLogs={wellnessLogs}
            />
          }
        />

        {/* Gamification, XP & Badges */}
        <Route
          path="/achievements"
          element={
            <Achievements
              habits={habits}
              completions={completions}
              unlockedAchievements={unlockedAchievements}
              userLevel={userLevel}
              streakFreezes={streakFreezes}
            />
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <Profile
              userProfile={userProfile}
              onUpdateProfile={updateProfile}
              onLogout={handleLogout}
              stats={stats}
              unlockedCount={unlockedAchievements.length}
            />
          }
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={
            <Settings
              theme={theme}
              onToggleTheme={toggleTheme}
              onSeedDemoData={seedDemoData}
              onClearData={clearHabits}
              onResetOnboarding={() => {
                resetOnboarding();
                navigate('/dashboard');
              }}
            />
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      {/* Habit Create / Edit Modal */}
      <HabitModal
        isOpen={isHabitModalOpen}
        onClose={() => setIsHabitModalOpen(false)}
        onSave={handleSaveHabit}
        initialData={editingHabit}
      />

      {/* Global Focus Pomodoro Timer Popup */}
      <FocusModal
        isOpen={isFocusModalOpen}
        onClose={() => setIsFocusModalOpen(false)}
        habits={habits}
        onLogFocus={logFocusSession}
      />

      {/* Achievement Unlocked Alert Toast */}
      {newAchievementAlert && (
        <Toast
          toast={{
            title: `Achievement: ${newAchievementAlert.name}`,
            description: newAchievementAlert.description
          }}
          onClose={() => setNewAchievementAlert(null)}
        />
      )}

      {/* Habit Action Toast */}
      {toastMessage && (
        <Toast
          toast={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Streak Milestone Celebration Modal */}
      <MilestoneModal
        milestone={activeMilestone}
        onClose={() => setActiveMilestone(null)}
      />

      {/* Delete Habit Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!habitToDelete}
        onClose={() => setHabitToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Habit?"
        message="Are you sure you want to permanently delete this habit and all its logged history?"
        confirmText="Delete"
        isDanger={true}
      />
    </AppLayout>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};
