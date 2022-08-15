import { ThemeProvider } from 'styled-components';

import GlobalStyles from '@styles/GlobalStyles';
import theme from '@styles/theme';


function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />

      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
