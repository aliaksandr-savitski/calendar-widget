import { ReactElement } from 'react';
import {render, RenderOptions} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { CalendarContextProvider } from '@/state/CalendarContext';

const queryClient = new QueryClient();

const AllTheProviders = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <CalendarContextProvider>
      {children}
    </CalendarContextProvider>
  </QueryClientProvider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options});

export * from '@testing-library/react';
export {customRender as render};
