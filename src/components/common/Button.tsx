import type { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

import { centerInline, focusRing } from "../../styles/mixins";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
}

export function Button({ children, icon, ...props }: ButtonProps) {
  return (
    <StyledButton {...props}>
      {icon}
      <span>{children}</span>
    </StyledButton>
  );
}

const StyledButton = styled.button`
  ${centerInline};
  gap: ${({ theme }) => theme.spacing[2]};
  min-height: 48px;
  width: 100%;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accentText};
  cursor: pointer;
  font-weight: 800;

  &:focus-visible {
    ${focusRing};
  }
`;
