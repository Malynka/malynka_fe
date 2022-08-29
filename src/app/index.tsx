
import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useLocation } from 'react-router';
import { HashRouter, Routes, Route } from 'react-router-dom';
import routes from './routes';
import { muiTheme, styledTheme } from './theme';

const App: FunctionComponent = () => {
  return (
      <Routes>
        {routes.map(({ path, Page }) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
      </Routes>
  );
};


const render = () => {
  ReactDOM.render(
    <MuiThemeProvider theme={muiTheme}>
      <StyledThemeProvider theme={styledTheme}>
        <HashRouter>
          <App />
        </HashRouter>
      </StyledThemeProvider> 
    </MuiThemeProvider>, 
    document.body);
};

render();