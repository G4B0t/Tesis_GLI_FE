import styled from "styled-components";

export const Root = styled.span`
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.spacing.borderRadius.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: inline-flex;
  font-size: ${({ theme }) => theme.typography.bodyFontSize.body2};
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  white-space: nowrap;
`;
