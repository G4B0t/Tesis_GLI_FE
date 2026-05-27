import styled from "styled-components";

export const Root = styled.article`
  background: ${({ theme }) => theme.colors.surfacePrimary};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.spacing.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.lg};

  svg {
    height: auto;
    margin-top: ${({ theme }) => theme.spacing.md};
    width: 100%;
  }

  line {
    stroke: ${({ theme }) => theme.colors.divider};
    stroke-width: 2;
  }

  text {
    fill: ${({ theme }) => theme.colors.textTertiary};
    font-size: 14px;
  }
`;

export const Header = styled.div`
  align-items: baseline;
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: space-between;

  h3 {
    align-items: center;
    display: inline-flex;
    font-size: ${({ theme }) => theme.typography.bodyFontSize.body1};
    gap: ${({ theme }) => theme.spacing.sm};
    margin: 0;
  }

  span {
    color: ${({ theme }) => theme.colors.textTertiary};
    font-size: ${({ theme }) => theme.typography.bodyFontSize.body2};
  }
`;
