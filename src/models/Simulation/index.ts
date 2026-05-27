export interface SimulationInputs {
  projectName: string;
  projectistName: string;
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
  createdAt?: string;
  metrics: SimulationMetrics;
  points: SimulationPoint[];
  projectName?: string;
  projectistName?: string;
  simulationId?: number;
}

export type SimulationStatus =
  | "Calculando..."
  | "Resultado desde backend"
  | "Vista preliminar local";

export interface InputFieldConfig {
  key: NumericSimulationInputKey;
  label: string;
  step: number;
  unit: string;
}

export type NumericSimulationInputKey = {
  [Key in keyof SimulationInputs]: SimulationInputs[Key] extends number ? Key : never;
}[keyof SimulationInputs];

export type ProjectSimulationInputKey = "projectName" | "projectistName";
