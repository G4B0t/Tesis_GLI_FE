import styled from "styled-components";

import { panel } from "../../styles/mixins";

interface MetricCardProps {
  label: string;
  unit: string;
  value: string;
}

export function MetricCard({ label, unit, value }: MetricCardProps) {
  return (
    <Card>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{unit}</small>
    </Card>
  );
}

const Card = styled.article`
  ${panel};
  display: grid;
  min-height: 112px;
  gap: ${({ theme }) => theme.spacing[2]};

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.86rem;
  }

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.65rem;
  }

  small {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;
