import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: `"DM Sans", "Roboto", "Helvetica", "Arial", sans-serif`,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: `"DM Sans", sans-serif`,
        },
      },
    },
  },
});
