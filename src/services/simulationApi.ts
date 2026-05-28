import type { SimulationInputs, SimulationResult } from "@models/Simulation";

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
    const errorText = await response.text();
    throw new Error(errorText || "Backend no disponible");
  }

  return response.json() as Promise<SimulationResult>;
}

export async function saveSimulation(
  apiBase: string,
  inputs: SimulationInputs,
): Promise<SimulationResult> {
  const response = await fetch(`${apiBase}/simulations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputs),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "No se pudo guardar la simulacion");
  }

  return response.json() as Promise<SimulationResult>;
}
