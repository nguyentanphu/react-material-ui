import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './ui/Header';
import { theme } from './ui/theme';
import { routes } from '../routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          {routes.map((r, i) => (
            <Route key={i} exact path={r.path} component={r.component}/>
          ))}
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
