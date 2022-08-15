import { CalendarContainer, CalendarDayItem } from './Calendar.styles';

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
}: CalendarProps) => (
  <CalendarContainer>
    {/* days span */}
    {Array.from({ length: paddingDaysNumber }, () => (
      <CalendarDayItem />
    ))}

    {Array.from(Array(daysInCurrentMonth).keys()).map((item, index) => (
      <CalendarDayItem key={index} isCurrentDay={navigation === 0 && index === currentDay}>
        {index + 1}
      </CalendarDayItem>
    ))}
  </CalendarContainer>

);

export default Calendar;
