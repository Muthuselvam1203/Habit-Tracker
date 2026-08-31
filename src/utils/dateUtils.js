export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const FULL_DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Format Date to local YYYY-MM-DD string without UTC skew
 */
export const formatDateKey = (date = new Date()) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Parse YYYY-MM-DD safely into a local Date object
 */
export const parseDateKey = (dateKey) => {
  if (!dateKey) return new Date();
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const isToday = (dateKey) => {
  return dateKey === formatDateKey(new Date());
};

export const isYesterday = (dateKey) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateKey === formatDateKey(yesterday);
};

export const getDayOfWeek = (dateKey) => {
  const date = parseDateKey(dateKey);
  return DAY_NAMES[date.getDay()];
};

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

export const formatDisplayDate = (date = new Date()) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const dayName = FULL_DAY_NAMES[d.getDay()];
  const monthName = MONTH_NAMES[d.getMonth()];
  const dayNum = d.getDate();
  const year = d.getFullYear();
  return `${dayName}, ${monthName} ${dayNum}, ${year}`;
};

/**
 * Get past N days array ending today
 */
export const getPastDays = (numDays = 7) => {
  const days = [];
  const today = new Date();
  for (let i = numDays - 1; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    days.push({
      dateKey: formatDateKey(d),
      dayName: DAY_NAMES[d.getDay()],
      dayNumber: d.getDate(),
      fullDate: d,
      isToday: i === 0
    });
  }
  return days;
};

/**
 * Get Month Calendar Matrix for Month View
 */
export const getMonthMatrix = (year, monthIndex) => {
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);
  
  const startDayOfWeek = firstDay.getDay(); // 0 = Sun
  const totalDays = lastDay.getDate();
  
  const matrix = [];
  let week = [];
  
  // Fill previous month days
  const prevMonthLastDay = new Date(year, monthIndex, 0).getDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const prevDate = new Date(year, monthIndex - 1, prevMonthLastDay - i);
    week.push({
      dateKey: formatDateKey(prevDate),
      dayNumber: prevDate.getDate(),
      isCurrentMonth: false,
      date: prevDate
    });
  }
  
  // Fill current month days
  for (let d = 1; d <= totalDays; d++) {
    const currDate = new Date(year, monthIndex, d);
    week.push({
      dateKey: formatDateKey(currDate),
      dayNumber: d,
      isCurrentMonth: true,
      date: currDate,
      isToday: formatDateKey(currDate) === formatDateKey(new Date())
    });
    
    if (week.length === 7) {
      matrix.push(week);
      week = [];
    }
  }
  
  // Fill next month days
  let nextDayNum = 1;
  while (week.length > 0 && week.length < 7) {
    const nextDate = new Date(year, monthIndex + 1, nextDayNum++);
    week.push({
      dateKey: formatDateKey(nextDate),
      dayNumber: nextDate.getDate(),
      isCurrentMonth: false,
      date: nextDate
    });
  }
  
  if (week.length > 0) {
    matrix.push(week);
  }
  
  return matrix;
};

export const formatTime = (time24) => {
  if (!time24) return '';
  const [h, m] = time24.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
};
