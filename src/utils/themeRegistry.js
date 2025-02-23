"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

export default function ThemeRegistry({ children }) {
  const [cache] = useState(() => createCache({ key: "mui", prepend: true }));

  const theme = createTheme({
    palette: {
      primary: {
        main: "#32CD32", // LimeGreen
        light: "#66FF66", // Lighter LimeGreen
        dark: "#228B22", // Darker shade of green
      },
      secondary: {
        main: "#A9DC76", // Soft Lime shade
        light: "#C7FF99",
        dark: "#7DA453",
      },
      background: {
        default: "#FFFFFF", // Light greenish background
        paper: "#E8F5E9", // Softer paper-like background
      },
      text: {
        primary: "#2E7D32", // Dark green text
        secondary: "#558B2F", // Slightly lighter green text
      },
    },
    typography: {
      fontFamily: "'Roboto', 'Arial', sans-serif",
      fontWeightRegular: 400,
      fontWeightBold: 700,
    },
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
