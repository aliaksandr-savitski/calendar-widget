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

  const handleSetClickedDay = (date: string | null) => {
    if (!date) {
      setClickedDay(null);
      return;
    }

    setClickedDay(date);
  };

  const contextValue = {
    navigation,
    clickedDay,
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

// export const useCalendarContext = useContext(CalendarContext);
