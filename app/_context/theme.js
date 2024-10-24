import { createTheme } from "@mui/material";
import { grey, blueGrey } from "@mui/material/colors";
import darkScrollbar from "@mui/material/darkScrollbar";

const lightPalleteColors = {
  primary: {
    main: "#2962ff",
    light: "#5381ff",
    dark: "#1c44b2",
    contrastText: "#fff",
  },
  error: {
    main: "#f23645",
    light: "#f45e6a",
    dark: "#a92530",
    contrastText: "#fff",
  },
  success: {
    main: "#00A25B",
    light: "#33b47b",
    dark: "#00713f",
    contrastText: "#fff",
  },
  secondary: {
    main: "#00A25B",
    light: "#33b47b",
    dark: "#00713f",
    contrastText: "#fff",
  },
};
const darkPalleteColors = {
  primary: {
    main: "#5381ff",
    light: "#759aff",
    dark: "#3a5ab2",
    contrastText: "#fff",
  },
  error: {
    main: "#f23645",
    light: "#f45e6a",
    dark: "#a92530",
    contrastText: "#fff",
  },
  success: {
    main: "#00A25B",
    light: "#33b47b",
    dark: "#00713f",
    contrastText: "#fff",
  },
  secondary: {
    main: "#00A25B",
    light: "#33b47b",
    dark: "#00713f",
    contrastText: "#fff",
  },
};

const defaultSettings = {
  typography: {
    // fontFamily: "'DM Sans', sans-serif",
    fontFamily: "'Poppins', sans-serif",
    body1: {
      fontSize: ".875rem",
      fontWeight: 500,
    },
    // body2: {
    //   fontSize: ".875rem",
    //   fontWeight: 500,
    //   fontFamily: "'Nunito Sans', sans-serif",
    //   lineHeight: 1.5,
    //   letterSpacing: "0.00938em",
    // },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "1rem",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: themeParam.palette.mode === "dark" ? darkScrollbar() : null,
      }),
    },
    MuiTextField: {
      defaultProps: {
        SelectProps: {
          MenuProps: {
            disableScrollLock: true,
          },
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    ...lightPalleteColors,
    secondaryBackground: "#f5f7fa",
    financePageBgcolor: "#f0f3f54d",
    financeCardTitlecolor: "#f0f3f5",
    chartGridColor: "#eeeeee",
    overviewHeader: "#e0e0e0",
    stipedTableEvenRow: "#fafafa",
    appbarBorderBottom: "#e0e0e0",
    financeInfoCard: "#f5f7fa",
    // gainerCard: "#f9f9f9",
    // gainerCardMobileView: "#f7f7f7",
    searchCardColor: "#fff",
    toggleButtonBgColor: "#0288d1",
    homepageBackground: "#f8f8f8",
    gainerCardBackground: "#ffffff",
    gainerCardHover: "#f5f7fa",
    marketVolumeCard: "#f7f7f7",
  },
  ...defaultSettings,
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    ...darkPalleteColors,
    secondaryBackground: "#212121",
    financePageBgcolor: "#17171780",
    financeCardTitlecolor: "#212121",
    chartGridColor: "#494949",
    overviewHeader: "#212121",
    stipedTableEvenRow: "#171717",
    appbarBorderBottom: "#424242",
    financeInfoCard: "#17171740",
    // gainerCard: "#191919",
    // gainerCardMobileView: "#191919",
    searchCardColor: "#212121",
    toggleButtonBgColor: "#01579b",
    homepageBackground: "#070707",
    gainerCardBackground: "#212121",
    gainerCardHover: "#232323",
    marketVolumeCard: "#212125",
  },
  ...defaultSettings,
});
