import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#fff",
      paper: "#f7f9fe",
    },
    customColors: {
      innerCard: "red",
    },
  },
});

export default lightTheme;
