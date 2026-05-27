import { ThemeModes } from "./enums";
import type { Theme } from "./types";

const commonColors = {
  black: "#101828",
  blue: "#2563eb",
  white: "#ffffff",
};

const typography = {
  bodyFontSize: {
    body1: "1rem",
    body2: "0.875rem",
    caption: "0.75rem",
  },
  fontFamily:
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontSize: 16,
  fontWeightBold: 700,
  fontWeightLight: 300,
  fontWeightMedium: 500,
  fontWeightRegular: 400,
  headingFontSize: {
    h1: "2.8rem",
    h2: "2rem",
    h3: "1.5rem",
    h4: "1.25rem",
    h5: "1rem",
    h6: "0.875rem",
  },
};

const spacing = {
  borderRadius: {
    lg: "1.5rem",
    md: "1rem",
    round: "50%",
    sm: "0.5rem",
    xs: "0.25rem",
  },
  breakpoints: {
    lg: "1200px",
    md: "900px",
    sm: "600px",
    xl: "1536px",
    xs: "0px",
  },
  lg: "1.5rem",
  md: "1rem",
  sm: "0.5rem",
  unit: 8,
  xl: "2rem",
  xs: "0.25rem",
  xxl: "2.5rem",
};

const colors = {
  dark: {
    background: "#101828",
    boxShadow: "rgba(2, 6, 23, 0.35)",
    danger: "#dc2626",
    divider: "#344054",
    grey: "#667085",
    paper: "#1d2939",
    primary: "#60a5fa",
    primaryDark: "#2563eb",
    primaryLight: "#93c5fd",
    secondaryBackground: "#344054",
    surfacePrimary: "#0f172a",
    surfaceSecondary: "#27364a",
    success: "#0f8a65",
    textPrimary: "#f8fafc",
    textSecondary: "#cbd5e1",
    textTertiary: "#98a2b3",
    textWhite: "#ffffff",
    ...commonColors,
  },
  light: {
    background: "#eef2f7",
    boxShadow: "rgba(17, 24, 39, 0.1)",
    danger: "#dc2626",
    divider: "#d7dde8",
    grey: "#98a2b3",
    paper: "#ffffff",
    primary: "#1f7a8c",
    primaryDark: "#165e6c",
    primaryLight: "#dff4f1",
    secondaryBackground: "#f5f7fb",
    surfacePrimary: "#ffffff",
    surfaceSecondary: "#e2e8f0",
    success: "#0f8a65",
    textPrimary: "#172033",
    textSecondary: "#526070",
    textTertiary: "#667085",
    textWhite: "#ffffff",
    ...commonColors,
  },
};

const theme: Theme = {
  [ThemeModes.dark]: {
    colors: colors.dark,
    images: {},
    spacing,
    typography,
  },
  [ThemeModes.light]: {
    colors: colors.light,
    images: {},
    spacing,
    typography,
  },
};

export default theme;
