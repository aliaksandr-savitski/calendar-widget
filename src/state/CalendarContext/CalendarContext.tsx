import { createContext, useState, useEffect, useContext } from 'react';

const INITIAL_EVENTS = [
  {
    id: '42803351-96A3-4A39-B1A8-91F905DDF37B',
    name: 'Meet dentist',
    date: '2022-08-16T22:00:00.000Z'
  },
  {
    id: '68D2BDDF-0268-4BC6-ADB6-3C37EFE0044C',
    name: 'Pick up kids from school',
    date: '2022-08-18T22:00:00.000Z'
  },
  {
    id: '20F9D671-1323-46D4-9B29-D4976D2DD520',
    name: 'Opera Theatre',
    date: '2022-08-20T22:00:00.000Z'
  },
  {
    id: '6CE046AE-34EF-482D-A562-7299BD52AB2D',
    name: 'Trip to London',
    date: '2022-08-24T22:00:00.000Z'
  },
];

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
  events: INITIAL_EVENTS,
});

export const CalendarContextProvider = ({ children }) => {
  const [navigation, setNavigation] = useState(0);
  const [clickedDay, setClickedDay] = useState(null);
  const [events, setEvents] = useState(INITIAL_EVENTS);

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
    events,
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
