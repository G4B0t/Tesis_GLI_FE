import type { LucideIcon } from "lucide-react";

import type { SimulationPoint } from "@models/Simulation";

export type NumericPointKey = "t" | "pressure" | "force" | "gasRate";

export interface Props {
  color: string;
  data: SimulationPoint[];
  icon: LucideIcon;
  title: string;
  xKey: NumericPointKey;
  yKey: Exclude<NumericPointKey, "t">;
}
