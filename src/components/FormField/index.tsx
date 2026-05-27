import { memo } from "react";

import { InputGroup, Root } from "./styles";
import type { Props } from "./types";

const FormField = ({
  id,
  label,
  onChange,
  step,
  type = "text",
  unit = "",
  value,
}: Props) => {
  return (
    <Root htmlFor={id}>
      <span>{label}</span>
      <InputGroup>
        <input
          id={id}
          onChange={(event) => onChange(event.target.value)}
          step={step}
          type={type}
          value={value}
        />
        {unit && <small>{unit}</small>}
      </InputGroup>
    </Root>
  );
};

export type { Props };

export default memo(FormField);
