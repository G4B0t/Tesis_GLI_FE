import type { InputFieldConfig, SimulationInputs } from "@models/Simulation";

export const API_BASE_URL =
  import.meta.env.VITE_REACT_APP_BACKEND_URL ?? "http://127.0.0.1:8008";

export const initialInputs: SimulationInputs = {
  projectName: "Simulacion GLI Base",
  projectistName: "Gabriel Torrejon",
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
  { key: "tubingDiameter", label: "Diametro tubing", step: 0.001, unit: "m" },
  { key: "valveDepth", label: "Profundidad valvula", step: 1, unit: "m" },
  { key: "slugLength", label: "Longitud golfada", step: 1, unit: "m" },
  { key: "surfaceTubingPressure", label: "Presion tubing sup.", step: 0.1, unit: "MPa" },
  { key: "injectionPressure", label: "Presion inyeccion", step: 0.1, unit: "MPa" },
  { key: "api", label: "API", step: 1, unit: "" },
  { key: "bsw", label: "BSW", step: 1, unit: "%" },
  { key: "gasRelativeDensity", label: "Densidad rel. gas", step: 0.01, unit: "" },
  { key: "casingPressureOpenRatio", label: "Pto/Pvo", step: 0.01, unit: "" },
];
