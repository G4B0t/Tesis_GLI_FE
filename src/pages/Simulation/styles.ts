import styled from "styled-components";

import type { RunMessageTone } from "./types";

export const Shell = styled.main`
  display: grid;
  grid-template-columns: minmax(300px, 380px) 1fr;
  min-height: 100vh;

  @media (max-width: ${({ theme }) => theme.spacing.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

export const Sidebar = styled.aside`
  background: ${({ theme }) => theme.colors.paper};
  border-right: 1px solid ${({ theme }) => theme.colors.divider};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.spacing.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const BrandBlock = styled.div`
  span {
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.typography.bodyFontSize.caption};
    font-weight: ${({ theme }) => theme.typography.fontWeightBold};
    letter-spacing: 0;
    text-transform: uppercase;
  }

  h1 {
    font-size: clamp(2rem, 4vw, 3.2rem);
    line-height: 0.96;
    margin: ${({ theme }) => theme.spacing.sm} 0 0;
    max-width: 12ch;
  }

  @media (max-width: ${({ theme }) => theme.spacing.breakpoints.lg}) {
    h1 {
      max-width: none;
    }
  }
`;

export const FieldGrid = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  grid-template-columns: 1fr 1fr;

  @media (max-width: ${({ theme }) => theme.spacing.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const ProjectGrid = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  grid-template-columns: 1fr;
`;

export const Workspace = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.spacing.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const Topbar = styled.header`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: space-between;

  h2 {
    font-size: clamp(1.8rem, 3vw, 2.8rem);
    line-height: 1;
    margin: ${({ theme }) => theme.spacing.xs} 0 0;
  }

  @media (max-width: ${({ theme }) => theme.spacing.breakpoints.sm}) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const Eyebrow = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.bodyFontSize.caption};
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  letter-spacing: 0;
  text-transform: uppercase;
`;

export const MetricsGrid = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  grid-template-columns: repeat(5, minmax(130px, 1fr));

  @media (max-width: ${({ theme }) => theme.spacing.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.spacing.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const ChartsGrid = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.spacing.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const messageColors: Record<RunMessageTone, string> = {
  error: "#b42318",
  success: "#0f8a65",
  warning: "#8f5f21",
};

export const RunMessageBox = styled.section<{ $tone: RunMessageTone }>`
  background: ${({ theme }) => theme.colors.surfacePrimary};
  border: 1px solid ${({ $tone }) => messageColors[$tone]};
  border-left-width: 6px;
  border-radius: ${({ theme }) => theme.spacing.borderRadius.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md};

  strong {
    color: ${({ $tone }) => messageColors[$tone]};
  }

  p {
    margin: 0;
  }
`;
