import type { SimulationInputs, SimulationResult } from "../models/simulation";

export async function requestSimulation(
  apiBase: string,
  inputs: SimulationInputs,
): Promise<SimulationResult> {
  const response = await fetch(`${apiBase}/simulate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputs),
  });

  if (!response.ok) {
    throw new Error("Backend no disponible");
  }

  return response.json() as Promise<SimulationResult>;
}
