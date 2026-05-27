import { memo } from "react";

import { Root } from "./styles";
import type { Props } from "./types";

const StatusPill = ({ icon: Icon, label }: Props) => {
  return (
    <Root>
      <Icon size={16} />
      {label}
    </Root>
  );
};

export type { Props };

export default memo(StatusPill);
