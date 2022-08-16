import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface Event {
  title: string;
  date: string;
}

const FETCH_CALENDAR_EVENTS = 'FETCH_CALENDAR_EVENTS';
const ADD_CALENDAR_EVENT = 'ADD_CALENDAR_EVENT';
const PATCH_CALENDAR_EVENT = 'PATCH_CALENDAR_EVENT';

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

export const useEventsQuery = (options) => useQuery([FETCH_CALENDAR_EVENTS], fetchEvents, options);

export const useAddEventMutation = () => useMutation(async (event: Event) => {
  const mutation = addEvent(event);

  return mutation;
}, { mutationKey: [ADD_CALENDAR_EVENT] });

type UpdateEventArguments = {
  id: string;
  title: string;
}

export const useUpdateEventMutation = () => useMutation(async ({ id, title }: UpdateEventArguments) => {
  const mutation = patchEvent(id, title);

  return mutation;
}, { mutationKey: [PATCH_CALENDAR_EVENT] });
