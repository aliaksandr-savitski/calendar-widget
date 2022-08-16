import { useState, useContext } from 'react';


import Header from './components/Header';
import WeekdayNames from './components/WeekdayNames';
import Calendar from './components/Calendar';

import useCalendar, { LOCALE } from '@hooks/useCalendar';

const MonthView = () => {
  const {
    date,
    navigation,
    goOneMonthBack,
    goOneMonthForward,
    paddingDaysCount,
    currentDay,
    daysInCurrentMonth,
    currentYear,
  } = useCalendar();

  return (
    <>
      <Header
        navigationDate={`${date.toLocaleDateString(LOCALE, { month: 'long' })} ${currentYear}`}
        onBack={goOneMonthBack}
        onForward={goOneMonthForward}
      />

      <WeekdayNames />

      <Calendar
        paddingDaysCount={paddingDaysCount}
        navigation={navigation}
        currentDay={currentDay}
        daysInCurrentMonth={daysInCurrentMonth}
      />
    </>
  );
}

export default MonthView;
