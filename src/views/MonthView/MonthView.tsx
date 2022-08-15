import { useState } from 'react';

import Header from './components/Header';
import WeekdayNames from './components/WeekdayNames';
import Calendar from './components/Calendar';

const LOCALE = 'en-GB';
const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

const MonthView = () => {
  const [navigation, setNavigation] = useState(0);
  const [clickedDay, setClickedDay] = useState(null);
  const [events, setEvents] = useState();

  const date = new Date();

  if (navigation !== 0) {
    date.setMonth(new Date().getMonth() + navigation)
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
  const paddingDaysNumber = WEEKDAYS.indexOf(currentDayOfTheWeek);

  const goOneMonthBack = () => {
    setNavigation(navigation - 1);
  };

  const goOneMonthForward = () => {
    setNavigation(navigation + 1);
  };

  return (
    <>
      <Header
        navigationDate={`${date.toLocaleDateString(LOCALE, { month: 'long' })} ${currentYear}`}
        onBack={goOneMonthBack}
        onForward={goOneMonthForward}
      />

      <WeekdayNames />

      <Calendar
        paddingDaysNumber={paddingDaysNumber}
        navigation={navigation}
        currentDay={currentDay}
        daysInCurrentMonth={daysInCurrentMonth}
      />
    </>
  );
}

export default MonthView;
