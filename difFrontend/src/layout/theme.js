import { createTheme } from "@mui/material/styles";

export const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#357a38",
    },
    secondary: {
      main: "#14FFEC",
    },
    background: {
      default: "#E7AB79",
    },
  },
  typography: {
    allVariants: {
      color: "#00000",
    },
    fontFamily: ["Roboto", "sans-serif"].join(","),
    h1: {
      fontSize: 30,
      fontWeight: 700,
    },
    h2: {
      fontSize: 20,
      fontWeight: 600,
    },
    body1: {
      fontSize: 16,
      fontWeight: 500,
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
    },
  },
});
