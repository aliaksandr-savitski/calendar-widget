import Head from 'next/head';

import Calendar from '@/components/Calendar';
import Header from '@/components/Header';
import WeekdayNames from '@/components/WeekdayNames';
import useCalendar, { LOCALE } from '@/hooks/useCalendar';

export default function HomePage() {
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
    <div>
      <Head>
        <title>Calendar Widget</title>
        <meta name="description" content="Calendar Widget" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
    </div>
  );
}
