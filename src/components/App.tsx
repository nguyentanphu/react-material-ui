import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import Header from './ui/Header';
import { theme } from './ui/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
    </ThemeProvider>
  );
}

export default App;
