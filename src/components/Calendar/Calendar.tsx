import { useState, useContext, useEffect } from 'react';

import { CalendarContainer, CalendarDayItem, CalendarDayItemButton } from './Calendar.styles';

import { CalendarContext } from '@state/CalendarContext';
import useCalendar from '@hooks/useCalendar';
import EventModal from '@components/EventModal';

interface CalendarProps {
  paddingDaysCount: number;
  navigation: number;
  currentDay: number;
  daysInCurrentMonth: number;
}

const Calendar = ({
  paddingDaysCount,
  navigation,
  currentDay,
  daysInCurrentMonth,
}: CalendarProps) => {
  const { handleSetClickedDay, events } = useContext(CalendarContext);
  const { currentYear, currentMonth } = useCalendar();
  const [isEventModalOpen, setEventModalOpen] = useState(false);

  const onDayButtonClick = (date: string) => () => {
    handleSetClickedDay(date);
    setEventModalOpen(true);
  };

  const closeEventModal = () => {
    handleSetClickedDay(null);
    setEventModalOpen(false);
  };

  return (
    <>
      <CalendarContainer>
        {/* days span */}
        {Array.from(Array(paddingDaysCount).keys()).map((item, index) => (
          <CalendarDayItem key={index} />
        ))}
    
        {Array.from(Array(daysInCurrentMonth).keys())
          .map((item, index) => {
            const date = new Date(currentYear, currentMonth, index + 2).toISOString();

            const eventThisDate = events?.find(({ date: eventDate }) => eventDate === date);

            return (
              <CalendarDayItem key={index} hasEvent={!!eventThisDate}>
                <CalendarDayItemButton
                  type="button"
                  onClick={onDayButtonClick(date)}
                  isCurrentDay={navigation === 0 && index + 1 === currentDay}
                  disabled={navigation < 0 || (navigation === 0 && index + 1 < currentDay)}
                >
                  {index + 1}
                </CalendarDayItemButton>
              </CalendarDayItem>
            )
          })}
      </CalendarContainer>

      {isEventModalOpen
        ? <EventModal closeEventModal={closeEventModal} />
        : null
      }
    </>
  );
}

export default Calendar;
