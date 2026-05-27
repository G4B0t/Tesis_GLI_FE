import { memo, useMemo } from "react";

import { Header, Root } from "./styles";
import type { Props } from "./types";

const LineChart = ({ color, data, icon: Icon, title, xKey, yKey }: Props) => {
  const width = 680;
  const height = 260;
  const padding = 36;

  const chartData = useMemo(() => {
    const values = data.map((item) => item[yKey]);
    const xValues = data.map((item) => item[xKey]);
    const minY = Math.min(...values);
    const maxY = Math.max(...values);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const spanY = maxY - minY || 1;
    const spanX = maxX - minX || 1;
    const points = data
      .map((item) => {
        const x = padding + ((item[xKey] - minX) / spanX) * (width - padding * 2);
        const y = height - padding - ((item[yKey] - minY) / spanY) * (height - padding * 2);
        return `${x},${y}`;
      })
      .join(" ");

    return { maxX, maxY, minY, points };
  }, [data, xKey, yKey]);

  return (
    <Root>
      <Header>
        <h3>
          <Icon size={18} />
          {title}
        </h3>
        <span>t, s</span>
      </Header>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title}>
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} />
        <polyline points={chartData.points} fill="none" stroke={color} strokeWidth="4" />
        <text x={padding} y={24}>
          {chartData.maxY.toFixed(2)}
        </text>
        <text x={padding} y={height - 10}>
          {chartData.minY.toFixed(2)}
        </text>
        <text x={width - 96} y={height - 10}>
          {chartData.maxX.toFixed(0)} s
        </text>
      </svg>
    </Root>
  );
};

export type { Props };

export default memo(LineChart);
