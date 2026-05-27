import styled from "styled-components";

export const Root = styled.article`
  background: ${({ theme }) => theme.colors.surfacePrimary};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.spacing.borderRadius.sm};
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 112px;
  padding: ${({ theme }) => theme.spacing.lg};

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.typography.bodyFontSize.body2};
  }

  strong {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 1.65rem;
  }

  small {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;
