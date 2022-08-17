import { useContext } from 'react';

import { CalendarContext } from '@/state/CalendarContext';

export const LOCALE = 'en-GB';
const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

const useCalendar = () => {
  const { navigation, setNavigation } = useContext(CalendarContext);

  const date = new Date();

  if (navigation !== 0) {
    date.setMonth(new Date().getMonth() + navigation);
  }

  const currentDay = date.getDate();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const dateString = firstDayOfMonth.toLocaleString(LOCALE, {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const [currentDayOfTheWeek] = dateString.split(', ');
  const paddingDaysCount = WEEKDAYS.indexOf(currentDayOfTheWeek);

  const goOneMonthBack = () => {
    setNavigation(navigation - 1);
  };

  const goOneMonthForward = () => {
    setNavigation(navigation + 1);
  };

  return {
    date,
    navigation,
    goOneMonthBack,
    goOneMonthForward,
    paddingDaysCount,
    currentDay,
    daysInCurrentMonth,
    currentYear,
    currentMonth,
  };
};

export default useCalendar;
