"use client";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    headlineBig: React.CSSProperties;
    headlineSmall: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    headlineBig?: React.CSSProperties;
    headlineSmall?: React.CSSProperties;
  }
}

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
    headlineBig: {
      fontSize: "3rem",
      fontWeight: 300,
      lineHeight: 1.2,
    },
    headlineSmall: {
      fontSize: "2rem",
      fontWeight: 300,
      lineHeight: 1.2,
    },
  },
  palette: {
    primary: {
      main: "#00a63e",
    },
  },
});

export default theme;
