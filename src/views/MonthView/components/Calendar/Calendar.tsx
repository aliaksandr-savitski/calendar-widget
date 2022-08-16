import { useState } from 'react';
import styled from 'styled-components';

import { CalendarContainer, CalendarDayItem, CalendarDayItemButton } from './Calendar.styles';
import EventModal from '@component/EventModal';

interface CalendarProps {
  paddingDaysNumber: number;
  navigation: number;
  currentDay: number;
  daysInCurrentMonth: number;
}

const Calendar = ({
  paddingDaysNumber,
  navigation,
  currentDay,
  daysInCurrentMonth,
}: CalendarProps) => {
  const [isEventModalOpen, setEventModalOpen] = useState(false);

  const openEventModal = () => {
    console.log('click openEventModal');
    setEventModalOpen(true);
  };

  const closeEventModal = () => {
    setEventModalOpen(false);
  };

  return (
    <>
      <CalendarContainer>
        {/* days span */}
        {Array.from(Array(daysInCurrentMonth).keys()).map((item, index) => (
          <CalendarDayItem key={index} />
        ))}
    
        {Array.from(Array(daysInCurrentMonth).keys()).map((item, index) => (
          <CalendarDayItem key={index}>
            <CalendarDayItemButton
              type="button"
              onClick={openEventModal}
              isCurrentDay={navigation === 0 && index + 1 === currentDay}
              disabled={navigation < 0 || (navigation === 0 && index + 1 <= currentDay)}
            >
              {index + 1}
            </CalendarDayItemButton>

            
          </CalendarDayItem>
        ))}
      </CalendarContainer>

      {isEventModalOpen
        ? <EventModal closeEventModal={closeEventModal} />
        : null
      }
    </>
  );
}

export default Calendar;
