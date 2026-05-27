import styled from "styled-components";

import { focusRing } from "../../styles/mixins";

interface FormFieldProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  step?: number;
  type?: "number" | "text";
  unit?: string;
}

export function FormField({
  id,
  label,
  value,
  onChange,
  step,
  type = "text",
  unit = "",
}: FormFieldProps) {
  return (
    <FieldLabel htmlFor={id}>
      <span>{label}</span>
      <InputGroup>
        <input
          id={id}
          type={type}
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        {unit && <small>{unit}</small>}
      </InputGroup>
    </FieldLabel>
  );
}

const FieldLabel = styled.label`
  display: grid;
  gap: ${({ theme }) => theme.spacing[2]};

  span {
    color: ${({ theme }) => theme.colors.sidebarMuted};
    font-size: 0.85rem;
  }
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};

  input {
    min-height: 42px;
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: ${({ theme }) => theme.radii.sm};
    padding: 0 ${({ theme }) => theme.spacing[3]};
    background: rgba(255, 255, 255, 0.08);
    color: ${({ theme }) => theme.colors.sidebarText};
    outline: none;

    &:focus-visible {
      ${focusRing};
    }
  }

  small {
    min-width: 34px;
    color: ${({ theme }) => theme.colors.sidebarSubtle};
  }
`;
