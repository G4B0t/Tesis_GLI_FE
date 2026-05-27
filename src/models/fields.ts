import type { InputFieldConfig, SimulationInputs } from "./simulation";

export const initialInputs: SimulationInputs = {
  tubingDiameter: 0.0603,
  valveDepth: 1800,
  slugLength: 90,
  surfaceTubingPressure: 1.7,
  injectionPressure: 3.2,
  api: 35,
  bsw: 20,
  gasRelativeDensity: 0.65,
  casingPressureOpenRatio: 0.85,
};

export const inputFields: InputFieldConfig[] = [
  { key: "tubingDiameter", label: "Diametro tubing", unit: "m", step: 0.001 },
  { key: "valveDepth", label: "Profundidad valvula", unit: "m", step: 1 },
  { key: "slugLength", label: "Longitud golfada", unit: "m", step: 1 },
  { key: "surfaceTubingPressure", label: "Presion tubing sup.", unit: "MPa", step: 0.1 },
  { key: "injectionPressure", label: "Presion inyeccion", unit: "MPa", step: 0.1 },
  { key: "api", label: "API", unit: "", step: 1 },
  { key: "bsw", label: "BSW", unit: "%", step: 1 },
  { key: "gasRelativeDensity", label: "Densidad rel. gas", unit: "", step: 0.01 },
  { key: "casingPressureOpenRatio", label: "Pto/Pvo", unit: "", step: 0.01 },
];
