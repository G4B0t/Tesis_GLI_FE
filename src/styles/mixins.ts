import { css } from "styled-components";

export const centerInline = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const focusRing = css`
  outline: 3px solid ${({ theme }) => theme.colors.focus};
  outline-offset: 2px;
`;

export const panel = css`
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.surface};
`;

export const responsiveStack = css`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    align-items: flex-start;
    flex-direction: column;
  }
`;
