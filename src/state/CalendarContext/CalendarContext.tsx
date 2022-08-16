import { createContext, useState, useEffect, useContext } from 'react';

import { useEventsQuery, useAddEventMutation, useUpdateEventMutation } from '@hooks/useEvents';

type CalendarContextType = {
  navigation: number;
  clickedDay: object | null;
  goOneMonthBack: () => void;
  goOneMonthForward: () => void;
}

export const CalendarContext = createContext<CalendarContextType>({
  navigation: 0,
  clickedDay: null,
  goOneMonthBack: () => {},
  goOneMonthForward: () => {},
});

export const CalendarContextProvider = ({ children }) => {
  const [isAppSetup, setAppSetup] = useState(false);
  const [navigation, setNavigation] = useState(0);
  const [clickedDay, setClickedDay] = useState(null);
  const [events, setEvents] = useState([]);

  const { data: fetchedEventsData } = useEventsQuery({
    enabled: !isAppSetup,
  });

  const goOneMonthBack = () => {
    setNavigation(navigation - 1);
  };

  const goOneMonthForward = () => {
    setNavigation(navigation + 1);
  };

  const handleSetClickedDay = (date: string | null) => {
    if (!date) {
      setClickedDay(null);
      return;
    }

    setClickedDay(date);
  };

  const updateEvent = (id, data) => {
    const newEventsArray = events.map((item) => {
      if (id === item.id) {
        return { ...item, ...data };
      }

      return item;
    });

    setEvents(newEventsArray);
  }

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  useEffect(() => {
    setAppSetup(true);
  }, []);

  useEffect(() => {
    setEvents(fetchedEventsData);
  }, [fetchedEventsData]);

  const contextValue = {
    navigation,
    clickedDay,
    events,
    addEvent,
    updateEvent,
    goOneMonthBack,
    goOneMonthForward,
    handleSetClickedDay,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};
