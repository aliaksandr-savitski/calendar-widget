import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface Event {
  name: string;
  date: string;
}

const FETCH_CALENDAR_EVENTS = 'FETCH_CALENDAR_EVENTS';

const fetchEvents = async () => {
  const response = await axios.get('/api/events');

  return response.data;
};

const addEvent = async (event: Event) => {
  const response = await axios.post('/api/events/new', event);

  return response.data;
};

export const useEventsQuery = () => useQuery([FETCH_CALENDAR_EVENTS], fetchEvents);

export const addEventMutation = () => useMutation(async (event: Event) => {
  const mutation = addEvent(event);

  return mutation;
})
