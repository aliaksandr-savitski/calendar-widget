import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const QUERY_KEY = 'CALENDAR_EVENTS';

const fetchEvents = async () => axios.get('/api/events');

const useEvents = () => {
  const eventsQuery = useQuery([QUERY_KEY], fetchEvents);

  return {
    ...eventsQuery,
    data: eventsQuery?.data?.data,
  }
};

export default useEvents;
