import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0066cc",
    },
    secondary: {
      main: "#1F2A40",
    },
    success: {
      main: "#0A8A40",
    },
  },

  typography: {
    fontFamily: `"DM Sans", "Roboto", "Helvetica", "Arial", sans-serif`,
    // Custom font sizes
    h1: {
      fontSize: "32px",
      fontWeight: 700,
    },
    h2: {
      fontSize: "28px",
      fontWeight: 700,
    },
    h3: {
      fontSize: "22px",
      fontWeight: 600,
    },
    body1: {
      fontSize: "16px",
    },
    body2: {
      fontSize: "14px",
      color: "rgba(255,255,255,0.8)",
    },
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

export const colors = {
  primary: "#0066cc",
  primaryOrange: "#F7941D",
  secondary: "#0068B5",
  textPrimary: "#282828",
  textSecondary: "#747474",
  border: "#ccc",
  background: "#fff",
  gray: "#888",
  warningRed: "#E84D4D",
};

export const sizes = {
  small: 12,
  base: 14,
  medium: 16,
  medimLarge: 18,
  large: 24,
  extraLarge: 32,
  padding: 24,
};

export const fonts = {
  regular: "DMSans_400Regular",
  medium: "DMSans_500Medium",
  bold: "DMSans_700Bold",
};

export default { colors, fonts, sizes };
