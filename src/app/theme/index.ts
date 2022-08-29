import { createTheme } from "@mui/material";
import font from "./font";
import colors from "./colors";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#FF858D',
      light: '#FFADB3',
      dark: '#FF5C67'
    },
    secondary: {
      main: '#69B578',
      light: '#84C290',
      dark: '#51A461'
    },
    background: {
      default: '#F9F9F9'
    },
  }
});

const styledTheme = {
  font,
  colors
};

export {
  styledTheme,
  muiTheme
};

export type TStyledTheme = typeof styledTheme;