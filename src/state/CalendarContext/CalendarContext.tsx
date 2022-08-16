import { createContext, useState, useEffect, useContext } from 'react';

import { useEventsQuery, useAddEventMutation, useUpdateEventMutation } from '@/hooks/useEvents';

type CalendarContextType = {
  navigation: number;
  clickedDay: object | null;
}

export const CalendarContext = createContext<CalendarContextType>({
  navigation: 0,
  clickedDay: null,
});

export const CalendarContextProvider = ({ children }) => {
  const [isAppSetup, setAppSetup] = useState(false);
  const [navigation, setNavigation] = useState(0);
  const [clickedDay, setClickedDay] = useState(null);
  const [events, setEvents] = useState([]);

  const { data: fetchedEventsData } = useEventsQuery({
    enabled: !isAppSetup,
  });

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
    setNavigation,
    handleSetClickedDay,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};
