import type { LucideIcon } from "lucide-react";
import styled from "styled-components";

import type { SimulationPoint } from "../../models/simulation";
import { panel } from "../../styles/mixins";

type NumericPointKey = "t" | "pressure" | "force" | "gasRate";

interface LineChartProps {
  color: string;
  data: SimulationPoint[];
  icon: LucideIcon;
  title: string;
  xKey: NumericPointKey;
  yKey: Exclude<NumericPointKey, "t">;
}

export function LineChart({ color, data, icon: Icon, title, xKey, yKey }: LineChartProps) {
  const width = 680;
  const height = 260;
  const padding = 36;
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

  return (
    <ChartPanel>
      <ChartHeading>
        <h3>
          <Icon size={18} />
          {title}
        </h3>
        <span>t, s</span>
      </ChartHeading>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title}>
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} />
        <polyline points={points} fill="none" stroke={color} strokeWidth="4" />
        <text x={padding} y={24}>
          {maxY.toFixed(2)}
        </text>
        <text x={padding} y={height - 10}>
          {minY.toFixed(2)}
        </text>
        <text x={width - 96} y={height - 10}>
          {maxX.toFixed(0)} s
        </text>
      </svg>
    </ChartPanel>
  );
}

const ChartPanel = styled.article`
  ${panel};

  svg {
    width: 100%;
    height: auto;
    margin-top: ${({ theme }) => theme.spacing[3]};
  }

  line {
    stroke: ${({ theme }) => theme.colors.borderStrong};
    stroke-width: 2;
  }

  text {
    fill: ${({ theme }) => theme.colors.textMuted};
    font-size: 14px;
  }
`;

const ChartHeading = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};

  h3 {
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[2]};
    margin: 0;
    font-size: 1rem;
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.85rem;
  }
`;
