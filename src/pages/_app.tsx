import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import styled, { ThemeProvider } from 'styled-components';

import { CalendarContextProvider } from '@/state/CalendarContext';
import GlobalStyles from '@/styles/GlobalStyles';
import theme from '@/styles/theme';

const Wrapper = styled.div`
  display: block;
  position: relative;
  width: 100vw;
  height: 100vh;
  padding-top: 15rem;
  background: #e5e5e5;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 35rem;
  padding: 4.5rem;
  margin: auto;
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0px 4px 32px rgba(170, 170, 170, 0.3);
`;

const queryClient = new QueryClient();

function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />

      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CalendarContextProvider>
            <Wrapper>
              <Container as={motion.div} layout>
                <Component {...pageProps} />
              </Container>
            </Wrapper>
          </CalendarContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
