import { blue, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: red['A700'],
    },
    mode: "light",
    secondary: {
      main: "#f44336",
    },
  },
});
