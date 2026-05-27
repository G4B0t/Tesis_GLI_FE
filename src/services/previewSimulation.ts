import type { SimulationInputs, SimulationResult } from "@models/Simulation";

function oilRelativeDensity(api: number) {
  return 141.5 / (131.5 + api);
}

function liquidDensity(api: number, bsw: number) {
  const waterRelativeDensity = 1.07;
  const liquidRelativeDensity =
    (bsw / 100) * waterRelativeDensity + (1 - bsw / 100) * oilRelativeDensity(api);

  return liquidRelativeDensity * 1000;
}

export function simulatePreview(inputs: SimulationInputs): SimulationResult {
  const gravity = 9.80665;
  const rhoL = liquidDensity(inputs.api, inputs.bsw);
  const surfacePa = inputs.surfaceTubingPressure * 1_000_000;
  const injectionPa = inputs.injectionPressure * 1_000_000;
  const pTo = surfacePa + rhoL * gravity * inputs.slugLength;
  const pVo = pTo / inputs.casingPressureOpenRatio;
  const pBt = pVo * 0.75 + pTo * 0.25;
  const targetPc2 = Math.max(pBt, injectionPa * 0.92);
  const duration = Math.max(60, Math.round((targetPc2 - pBt) / 8500 + 120));

  const points = Array.from({ length: 41 }, (_, index) => {
    const fraction = index / 40;
    const t = fraction * duration;
    const pressure = pBt + (targetPc2 - pBt) * (1 - Math.exp(-4 * fraction));
    const force = (targetPc2 - pressure) * 0.00042;
    const gasRate = Math.max(0, (injectionPa - pressure) / 1_000_000) * 1.8;

    return {
      t,
      pressure: pressure / 1_000_000,
      force,
      gasRate,
    };
  });

  return {
    createdAt: new Date().toISOString(),
    metrics: {
      rhoL,
      pTo: pTo / 1_000_000,
      pVo: pVo / 1_000_000,
      pBt: pBt / 1_000_000,
      duration,
    },
    points,
    projectName: inputs.projectName,
    projectistName: inputs.projectistName,
  };
}
