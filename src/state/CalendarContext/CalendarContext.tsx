import { createContext, useState, useEffect, useContext } from 'react';

import useEvents from '@hooks/useEvents';

interface Event {
  id: string;
  name: string;
  date: string;
}

type CalendarContextType = {
  navigation: number;
  clickedDay: object | null;
  goOneMonthBack: () => void;
  goOneMonthForward: () => void;
  events: Event[];
}

export const CalendarContext = createContext<CalendarContextType>({
  navigation: 0,
  clickedDay: null,
  goOneMonthBack: () => {},
  goOneMonthForward: () => {},
  events: [],
});

export const CalendarContextProvider = ({ children }) => {
  const [navigation, setNavigation] = useState(0);
  const [clickedDay, setClickedDay] = useState(null);
  const [events, setEvents] = useState([]);
  const { data } = useEvents();

  const goOneMonthBack = () => {
    setNavigation(navigation - 1);
  };

  const goOneMonthForward = () => {
    setNavigation(navigation + 1);
  };

  const setEvent = (eventData) => {
    console.log({eventData});
  };

  const handleSetClickedDay = (date: string | null) => {
    if (!date) {
      setClickedDay(null);
      return;
    }

    setClickedDay(date);
  };

  const addEvent = (title: string) => {
    const newEvent = {
      title,
      date: clickedDay,
    }

    console.log({ newEvent });
  };

  const contextValue = {
    navigation,
    clickedDay,
    events: data,
    goOneMonthBack,
    goOneMonthForward,
    setEvent,
    handleSetClickedDay,
    addEvent,
    setEvents,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};

// export const useCalendarContext = useContext(CalendarContext);
