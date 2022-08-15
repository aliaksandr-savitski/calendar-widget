import styled, { ThemeProvider } from 'styled-components';

import GlobalStyles from '@styles/GlobalStyles';
import theme from '@styles/theme';

const Wrapper = styled.div`
  display: block;
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #E5E5E5;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 35rem;
  padding: 4.5rem;
  margin: 5rem auto;
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0px 4px 32px rgba(170, 170, 170, 0.3);
`;


function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />

      <ThemeProvider theme={theme}>
        <Wrapper>
          <Container>
            <Component {...pageProps} />
          </Container>
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default App;
