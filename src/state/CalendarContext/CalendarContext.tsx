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

const INITIAL_EVENTS = [

];

export const CalendarContextProvider = ({ children }) => {
  const [navigation, setNavigation] = useState(0);
  const [clickedDay, setClickedDay] = useState(null);
  const [events, setEvents] = useState();

  const goOneMonthBack = () => {
    setNavigation(navigation - 1);
  };

  const goOneMonthForward = () => {
    setNavigation(navigation + 1);
  };

  const setEvent = (eventData) => {
    console.log({eventData});
  };

  const contextValue = {
    navigation,
    clickedDay,
    events,
    goOneMonthBack,
    goOneMonthForward,
    setEvent,
    setClickedDay,
  };

  // useEffect(() => {
  //   console.log(clickedDay);
  // }, [clickedDay]);

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};

// export const useCalendarContext = useContext(CalendarContext);
