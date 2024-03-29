
import { FunctionComponent } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { LocalizationProvider,  } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { HashRouter, Routes, Route } from 'react-router-dom';
import routes from './routes';
import { muiTheme, styledTheme } from './theme';
import Menu from './Menu';
import { AppContainer, PageMountPoint } from './styles';
import 'normalize.css';
import './index.css';

const App: FunctionComponent = () => {
  return (
    <AppContainer>
      <Menu data={routes.map(({ name, Icon, path }) => ({ Icon, name, path }))} />
      <PageMountPoint>
        <Routes>
          {routes.map(({ path, name, Page }) => (
            <Route key={path} path={path} element={<Page name={name} />} />
          ))}
        </Routes>
      </PageMountPoint>
    </AppContainer>
  );
};

export default function AppStyledWrapper() {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <StyledThemeProvider theme={styledTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={dayjs.locale('uk')}>
          <HashRouter>
            <App />
          </HashRouter>
        </LocalizationProvider>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
}