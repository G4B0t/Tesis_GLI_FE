import styled from "styled-components";

export const Root = styled.label`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.typography.bodyFontSize.body2};
  }
`;

export const InputGroup = styled.div`
  align-items: center;
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  grid-template-columns: 1fr auto;

  input {
    background: ${({ theme }) => theme.colors.surfacePrimary};
    border: 1px solid ${({ theme }) => theme.colors.divider};
    border-radius: ${({ theme }) => theme.spacing.borderRadius.sm};
    color: ${({ theme }) => theme.colors.textPrimary};
    min-height: 42px;
    outline: none;
    padding: 0 ${({ theme }) => theme.spacing.md};
    width: 100%;

    &:focus-visible {
      outline: 3px solid ${({ theme }) => theme.colors.primaryLight};
      outline-offset: 2px;
    }
  }

  small {
    color: ${({ theme }) => theme.colors.textTertiary};
    min-width: 34px;
  }
`;
