import { useState } from 'react';
import styled from 'styled-components';

const LOCALE = 'en-GB';

const Header = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 1.875rem;
  margin-bottom: 3.5rem;
`;

const CurrentMonth = styled.div`
  display: flex;
  color: #333333;
  font-size: 1.5rem;
  font-weight: 700;
`;

const NavigationWrapper = styled.nav`
  display: flex;
  align-items: center;
`;

const NavigationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  width: 3rem;
  height: 3rem;
  background-color: #fff;
  transition: background-color 0.2s ease;
  cursor: pointer;
  border-radius: 50%;
  
  &:hover {
    background-color: rgba(51, 51, 51, 0.1);
  }
`;

const NavigationButtonArrow = styled.div`
  width: 8px;
  height: 8px;
  border: 2px solid #333333;
  transform: rotate(-45deg);
  flex: none;
  order: 0;
  flex-grow: 0;

  ${({ direction }) => direction === 'right'
    ? `
      border-left: none;
      border-top: none;
    `
    : `
      border-right: none;
      border-bottom: none;
    `
  }
`;

const WeekDaysList = styled.ul`
  display: flex;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  color: #333333;
  font-size: 1.5rem;
  height: 1.875rem;
`;

const WeekDay = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 0;
`;

const Calendar = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  list-style: none;
  padding: 0;
  margin: 2rem 0;
`;

const CalendarDayItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  height: 3.5rem;
  color: #333333;
  border-radius: 50%;
  background-color: rgba(51, 51, 51, 0);
  transition: background-color 0.25s ease;

  &:hover {
    background-color: rgba(51, 51, 51, 0.1);
    cursor: pointer;
  }

  ${({ isCurrentDay }) => isCurrentDay
    ? `
      background-color: #FB3F4A;
      color: #fff;
      transition: none;

      &:hover {
        background-color: #c8323b;
      }
    `
    : ``
  }
`;


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

  console.log(
    {
      currentDay,
      currentMonth,
      currentYear,
      daysInCurrentMonth,
      paddingDaysNumber,
    }
  );

  const onBack = () => {
    setNavigation(navigation - 1);
  };

  const onForward = () => {
    setNavigation(navigation + 1);
  };

  return (
    <>
      <Header>
        <CurrentMonth>{date.toLocaleDateString(LOCALE, { month: 'long' })} {currentYear}</CurrentMonth>
        <NavigationWrapper>
          <NavigationButton onClick={onBack}>
            <NavigationButtonArrow />
          </NavigationButton>
          <NavigationButton onClick={onForward}>
            <NavigationButtonArrow direction="right" />
          </NavigationButton>
        </NavigationWrapper>
      </Header>

      <WeekDaysList>
        <WeekDay><span>Mo</span></WeekDay>
        <WeekDay><span>Tu</span></WeekDay>
        <WeekDay><span>We</span></WeekDay>
        <WeekDay><span>Th</span></WeekDay>
        <WeekDay><span>Fr</span></WeekDay>
        <WeekDay><span>Sa</span></WeekDay>
        <WeekDay><span>Su</span></WeekDay>
      </WeekDaysList>


      <Calendar>
        {/* days span */}
        {Array.from({ length: paddingDaysNumber }, () => (
          <CalendarDayItem />
        ))}

        {/* @ts-expect-error */}
        {[...Array(daysInCurrentMonth).keys()].map((item, index) => (
          <CalendarDayItem key={index} isCurrentDay={navigation === 0 && index === currentDay}>
            {index + 1}
          </CalendarDayItem>
        ))}
      </Calendar>
    </>
  );
}

export default MonthView;
