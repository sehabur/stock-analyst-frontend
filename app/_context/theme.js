import { createTheme } from '@mui/material';
import { grey, blueGrey } from '@mui/material/colors';

const palleteColors = {
  primary: {
    main: '#2962ff',
    light: '#5381ff',
    dark: '#1c44b2',
    contrastText: '#fff',
  },
  error: {
    main: '#f23645',
    light: '#f45e6a',
    dark: '#a92530',
    contrastText: '#fff',
  },
  success: {
    main: '#00A25B',
    light: '#33b47b',
    dark: '#00713f',
  },
  // success: {
  //   main: '#089981',
  //   light: '#39ad9a',
  //   dark: '#056b5a',
  //   contrastText: '#fff',
  // }, // trading view
};

const defaultSettings = {
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    body1: {
      fontSize: '.875rem',
      fontWeight: 500,
    },
    number: {
      fontFamily: "'Nunito Sans', sans-serif",
      fontSize: '.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1rem',
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    ...palleteColors,
    secondaryBackground: '#f5f7fa',
    financePageBgcolor: '#f0f3f54d',
    financeCardTitlecolor: '#f0f3f5',
    secondaryPaperBackground: '#f0f0f0',
    chartGridColor: '#eeeeee',
  },
  ...defaultSettings,
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    ...palleteColors,
    secondaryBackground: '#151515',
    financePageBgcolor: '#17171780',
    financeCardTitlecolor: '#212121',
    secondaryPaperBackground: '#212121',
    chartGridColor: '#494949',
  },
  ...defaultSettings,
});
