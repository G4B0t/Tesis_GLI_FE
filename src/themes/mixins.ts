type TextStyle = {
  color?: string;
  lineHeight?: number;
  size?: string;
  textAlign?: string;
  weight?: number;
};

type FlexStyle = {
  align?: string;
  direction?: string;
  justify?: string;
  wrap?: string;
};

type GridStyle = {
  columnGap?: number;
  columns?: number;
  rowGap?: number;
  rows?: number;
};

export const textStyle = ({
  color = "textPrimary",
  lineHeight,
  size = "14px",
  textAlign = "left",
  weight = 400,
}: TextStyle) => ({
  color,
  fontSize: size,
  fontWeight: weight,
  lineHeight,
  textAlign,
});

export const flexStyle = ({
  align = "stretch",
  direction = "row",
  justify = "flex-start",
  wrap = "wrap",
}: FlexStyle) => ({
  alignItems: align,
  display: "flex",
  flexDirection: direction,
  flexWrap: wrap,
  justifyContent: justify,
});

export const gridStyle = ({
  columnGap = 0,
  columns = 1,
  rowGap = 0,
  rows = 1,
}: GridStyle) => ({
  columnGap,
  display: "grid",
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  gridTemplateRows: `repeat(${rows}, 1fr)`,
  rowGap,
});

export const rgba = (hexColor: string, percentage: number) => {
  const opacity = Math.max(0, Math.min(100, percentage)) / 100;
  return `${hexColor}${Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0")}`;
};
