import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // Mavi
    },
    background: {
      default: "#fff",
      paper: "#f7f9fe",
    },
  },
});

export default lightTheme;
