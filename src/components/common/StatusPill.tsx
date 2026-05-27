import type { LucideIcon } from "lucide-react";
import styled from "styled-components";

import { centerInline } from "../../styles/mixins";

interface StatusPillProps {
  icon: LucideIcon;
  label: string;
}

export function StatusPill({ icon: Icon, label }: StatusPillProps) {
  return (
    <Pill>
      <Icon size={16} />
      {label}
    </Pill>
  );
}

const Pill = styled.span`
  ${centerInline};
  gap: ${({ theme }) => theme.spacing[2]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  white-space: nowrap;
`;
