import 'jest-styled-components';
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';

import { eventsHandlers } from '@/mocks/handlers';

const server = setupServer(...eventsHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
