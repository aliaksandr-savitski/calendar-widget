import { WeekdaysList, WeekDay } from './WeekdayNames.styles';

const WEEKDAYS_MAP = [ 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const WeekdayNames = () => (
  <WeekdaysList>
    {WEEKDAYS_MAP.map((name) => (
      <WeekDay key={name}>{name}</WeekDay>
    ))}
  </WeekdaysList>
);

export default WeekdayNames;
