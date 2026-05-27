import { memo } from "react";

import { Root } from "./styles";
import type { Props } from "./types";

const MetricCard = ({ label, unit, value }: Props) => {
  return (
    <Root>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{unit}</small>
    </Root>
  );
};

export type { Props };

export default memo(MetricCard);
