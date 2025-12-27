import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // azul padrão
    },
    secondary: {
      main: "#28349eff",
    },
    error: {
      main: "#d32f2f",
    },
    background: {
      default: "#f5f5f5",
      paper: "#e6e6e6ff",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#555555",
    },
  },
});

export default theme;
