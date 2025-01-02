import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#121212",
      paper: "#333",
    },
    customColors: {
      innerCard: "rgba(0, 0, 80, 0.6)",
      inncerCardBorder: "#72CCFF",
      settingsModalColor: "#333",
    },
  },
});

export default darkTheme;
