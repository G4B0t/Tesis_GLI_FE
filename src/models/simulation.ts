export interface SimulationInputs {
  tubingDiameter: number;
  valveDepth: number;
  slugLength: number;
  surfaceTubingPressure: number;
  injectionPressure: number;
  api: number;
  bsw: number;
  gasRelativeDensity: number;
  casingPressureOpenRatio: number;
}

export interface SimulationMetrics {
  rhoL: number;
  pTo: number;
  pVo: number;
  pBt: number;
  duration: number;
}

export interface SimulationPoint {
  t: number;
  pressure: number;
  force: number;
  gasRate: number;
}

export interface SimulationResult {
  metrics: SimulationMetrics;
  points: SimulationPoint[];
}

export type SimulationStatus =
  | "Calculando..."
  | "Resultado desde backend"
  | "Vista preliminar local";

export interface InputFieldConfig {
  key: keyof SimulationInputs;
  label: string;
  unit: string;
  step: number;
}
