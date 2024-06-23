import { createTheme } from "@mui/material/styles";
import { blue, green, red, yellow } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e60000",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontFamily: "'Roboto', sans-serif",
      fontWeight: 700,
      fontSize: "3rem",
    },
    h2: {
      fontFamily: "'Roboto', sans-serif",
      fontWeight: 600,
      fontSize: "2.5rem",
    },
    h3: {
      fontFamily: "'Roboto', sans-serif",
      fontWeight: 500,
      fontSize: "2rem",
    },
    h4: {
      fontFamily: "'Roboto', sans-serif",
      fontWeight: 500,
      fontSize: "1.75rem",
    },
    h5: {
      fontFamily: "'Roboto', sans-serif",
      fontWeight: 400,
      fontSize: "1.5rem",
    },
    h6: {
      fontFamily: "'Roboto', sans-serif",
      fontWeight: 400,
      fontSize: "1.25rem",
    },
    body1: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      fontSize: "1rem",
    },
    body2: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      fontSize: "0.875rem",
    },
  },
});
