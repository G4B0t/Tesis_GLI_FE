export const theme = {
  colors: {
    accent: "#58b7a9",
    accentText: "#10201d",
    background: "#f6f7f4",
    border: "#cfd8d5",
    borderStrong: "#dce2df",
    focus: "rgba(88, 183, 169, 0.45)",
    sidebar: "#17201f",
    sidebarMuted: "#c4d2cf",
    sidebarSubtle: "#9fb0ac",
    sidebarText: "#f7faf7",
    surface: "#ffffff",
    text: "#17201f",
    textMuted: "#73807c",
    textSecondary: "#5c6865",
  },
  spacing: {
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    7: "28px",
    8: "32px",
  },
  radii: {
    sm: "6px",
    md: "8px",
    full: "999px",
  },
  breakpoints: {
    sm: "640px",
    lg: "1100px",
  },
} as const;

export type AppTheme = typeof theme;
