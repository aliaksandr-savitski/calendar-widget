import { createContext, useState, useEffect, useContext } from 'react';

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
  const [navigation, setNavigation] = useState(0);
  const [clickedDay, setClickedDay] = useState(null);

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
    goOneMonthBack,
    goOneMonthForward,
    setEvent,
    handleSetClickedDay,
    addEvent,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};

// export const useCalendarContext = useContext(CalendarContext);
