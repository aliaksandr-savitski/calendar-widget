import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface Event {
  title: string;
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

const patchEvent = async (id: string, title: string) => {
  const response = await axios.put(`/api/events/${id}`, { title });

  return response.data;
};

export const useEventsQuery = () => useQuery([FETCH_CALENDAR_EVENTS], fetchEvents);

export const useAddEventMutation = () => useMutation(async (event: Event) => {
  const mutation = addEvent(event);

  return mutation;
});

type UpdateEventArguments = {
  id: string;
  title: string;
}

export const useUpdateEventMutation = () => useMutation(async ({ id, title }: UpdateEventArguments) => {
  const mutation = patchEvent(id, title);

  return mutation;
});
