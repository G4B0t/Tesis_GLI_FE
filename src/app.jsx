import { Activity, Play, Server } from "lucide-react";
import { useMemo, useState } from "react";

const initialInputs = {
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

const fields = [
  ["tubingDiameter", "Diametro tubing", "m", 0.001],
  ["valveDepth", "Profundidad valvula", "m", 1],
  ["slugLength", "Longitud golfada", "m", 1],
  ["surfaceTubingPressure", "Presion tubing sup.", "MPa", 0.1],
  ["injectionPressure", "Presion inyeccion", "MPa", 0.1],
  ["api", "API", "", 1],
  ["bsw", "BSW", "%", 1],
  ["gasRelativeDensity", "Densidad rel. gas", "", 0.01],
  ["casingPressureOpenRatio", "Pto/Pvo", "", 0.01],
];

function oilRelativeDensity(api) {
  return 141.5 / (131.5 + api);
}

function liquidDensity(api, bsw) {
  const waterRelativeDensity = 1.07;
  const liquidRelativeDensity =
    (bsw / 100) * waterRelativeDensity + (1 - bsw / 100) * oilRelativeDensity(api);
  return liquidRelativeDensity * 1000;
}

function simulatePreview(inputs) {
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
    metrics: {
      rhoL,
      pTo: pTo / 1_000_000,
      pVo: pVo / 1_000_000,
      pBt: pBt / 1_000_000,
      duration,
    },
    points,
  };
}

function LineChart({ data, xKey, yKey, color, label }) {
  const width = 680;
  const height = 260;
  const padding = 36;
  const values = data.map((item) => item[yKey]);
  const xValues = data.map((item) => item[xKey]);
  const minY = Math.min(...values);
  const maxY = Math.max(...values);
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const spanY = maxY - minY || 1;
  const spanX = maxX - minX || 1;

  const points = data
    .map((item) => {
      const x = padding + ((item[xKey] - minX) / spanX) * (width - padding * 2);
      const y = height - padding - ((item[yKey] - minY) / spanY) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="chart-panel">
      <div className="chart-heading">
        <h3>{label}</h3>
        <span>t, s</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} />
        <polyline points={points} fill="none" stroke={color} strokeWidth="4" />
        <text x={padding} y={24}>{maxY.toFixed(2)}</text>
        <text x={padding} y={height - 10}>{minY.toFixed(2)}</text>
        <text x={width - 96} y={height - 10}>{maxX.toFixed(0)} s</text>
      </svg>
    </div>
  );
}

function MetricCard({ label, value, unit }) {
  return (
    <article className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{unit}</small>
    </article>
  );
}

function App() {
  const [inputs, setInputs] = useState(initialInputs);
  const [apiBase, setApiBase] = useState("http://localhost:8000");
  const [result, setResult] = useState(() => simulatePreview(initialInputs));
  const [status, setStatus] = useState("Vista preliminar local");

  const metrics = result.metrics;

  const formattedMetrics = useMemo(
    () => [
      ["Densidad liquido", metrics.rhoL.toFixed(1), "kg/m3"],
      ["P_to", metrics.pTo.toFixed(3), "MPa"],
      ["P_vo", metrics.pVo.toFixed(3), "MPa"],
      ["P_bt", metrics.pBt.toFixed(3), "MPa"],
      ["Tiempo etapa 1", metrics.duration.toFixed(0), "s"],
    ],
    [metrics],
  );

  function updateField(key, value) {
    const parsed = Number(value);
    setInputs((current) => ({
      ...current,
      [key]: Number.isFinite(parsed) ? parsed : current[key],
    }));
  }

  async function runSimulation() {
    setStatus("Calculando...");

    try {
      const response = await fetch(`${apiBase}/simulate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      if (!response.ok) {
        throw new Error("Backend no disponible");
      }

      const backendResult = await response.json();
      setResult(backendResult);
      setStatus("Resultado desde backend");
    } catch {
      setResult(simulatePreview(inputs));
      setStatus("Vista preliminar local");
    }
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <span>GLI</span>
          <h1>Simulador Gas Lift Intermitente</h1>
        </div>

        <section className="control-group">
          <label htmlFor="api-base">Backend API</label>
          <input
            id="api-base"
            value={apiBase}
            onChange={(event) => setApiBase(event.target.value)}
          />
        </section>

        <section className="field-grid">
          {fields.map(([key, label, unit, step]) => (
            <label className="field" key={key}>
              <span>{label}</span>
              <div>
                <input
                  type="number"
                  step={step}
                  value={inputs[key]}
                  onChange={(event) => updateField(key, event.target.value)}
                />
                {unit && <small>{unit}</small>}
              </div>
            </label>
          ))}
        </section>

        <button className="run-button" onClick={runSimulation}>
          <Play size={18} strokeWidth={2.5} />
          <span>Ejecutar simulacion</span>
        </button>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <span className="eyebrow">Modelo I Santos</span>
            <h2>Ciclo GLI convencional</h2>
          </div>
          <span className="status-pill">
            <Server size={16} />
            {status}
          </span>
        </header>

        <section className="metrics-grid">
          {formattedMetrics.map(([label, value, unit]) => (
            <MetricCard key={label} label={label} value={value} unit={unit} />
          ))}
        </section>

        <section className="charts-grid">
          <LineChart
            data={result.points}
            xKey="t"
            yKey="pressure"
            color="#1f7a8c"
            label={<><Activity size={18} /> Presion en anular</>}
          />
          <LineChart
            data={result.points}
            xKey="t"
            yKey="gasRate"
            color="#8f5f21"
            label={<><Activity size={18} /> Caudal de gas</>}
          />
        </section>
      </section>
    </main>
  );
}

export default App;
