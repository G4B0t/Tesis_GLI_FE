import type { ThemeModes } from "./enums";

export interface ThemeColors {
  background: string;
  black: string;
  blue: string;
  boxShadow: string;
  danger: string;
  divider: string;
  grey: string;
  paper: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondaryBackground: string;
  surfacePrimary: string;
  surfaceSecondary: string;
  success: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textWhite: string;
  white: string;
}

export interface ThemeSpacing {
  borderRadius: {
    lg: string;
    md: string;
    round: string;
    sm: string;
    xs: string;
  };
  breakpoints: {
    lg: string;
    md: string;
    sm: string;
    xl: string;
    xs: string;
  };
  lg: string;
  md: string;
  sm: string;
  unit: number;
  xl: string;
  xs: string;
  xxl: string;
}

export interface ThemeTypography {
  bodyFontSize: {
    body1: string;
    body2: string;
    caption: string;
  };
  fontFamily: string;
  fontSize: number;
  fontWeightBold: number;
  fontWeightLight: number;
  fontWeightMedium: number;
  fontWeightRegular: number;
  headingFontSize: {
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
    h6: string;
  };
}

export interface ThemeMode {
  colors: ThemeColors;
  images: Record<string, string>;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
}

export type Theme = Record<ThemeModes, ThemeMode>;
