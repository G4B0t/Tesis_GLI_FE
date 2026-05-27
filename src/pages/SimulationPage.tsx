import { Activity, Play, Server } from "lucide-react";
import { useMemo, useState } from "react";
import styled from "styled-components";

import { Button } from "../components/common/Button";
import { FormField } from "../components/common/FormField";
import { LineChart } from "../components/common/LineChart";
import { MetricCard } from "../components/common/MetricCard";
import { StatusPill } from "../components/common/StatusPill";
import { initialInputs, inputFields } from "../models/fields";
import type { SimulationInputs, SimulationStatus } from "../models/simulation";
import { requestSimulation } from "../services/simulationApi";
import { simulatePreview } from "../services/previewSimulation";
import { responsiveStack } from "../styles/mixins";

export function SimulationPage() {
  const [inputs, setInputs] = useState<SimulationInputs>(initialInputs);
  const [apiBase, setApiBase] = useState("http://localhost:8000");
  const [result, setResult] = useState(() => simulatePreview(initialInputs));
  const [status, setStatus] = useState<SimulationStatus>("Vista preliminar local");

  const formattedMetrics = useMemo(
    () => [
      ["Densidad liquido", result.metrics.rhoL.toFixed(1), "kg/m3"],
      ["P_to", result.metrics.pTo.toFixed(3), "MPa"],
      ["P_vo", result.metrics.pVo.toFixed(3), "MPa"],
      ["P_bt", result.metrics.pBt.toFixed(3), "MPa"],
      ["Tiempo etapa 1", result.metrics.duration.toFixed(0), "s"],
    ],
    [result.metrics],
  );

  function updateInput(key: keyof SimulationInputs, value: string) {
    const parsed = Number(value);

    setInputs((current) => ({
      ...current,
      [key]: Number.isFinite(parsed) ? parsed : current[key],
    }));
  }

  async function runSimulation() {
    setStatus("Calculando...");

    try {
      const backendResult = await requestSimulation(apiBase, inputs);
      setResult(backendResult);
      setStatus("Resultado desde backend");
    } catch {
      setResult(simulatePreview(inputs));
      setStatus("Vista preliminar local");
    }
  }

  return (
    <Shell>
      <Sidebar>
        <BrandBlock>
          <span>GLI</span>
          <h1>Simulador Gas Lift Intermitente</h1>
        </BrandBlock>

        <FormField
          id="api-base"
          label="Backend API"
          value={apiBase}
          onChange={setApiBase}
        />

        <FieldGrid>
          {inputFields.map((field) => (
            <FormField
              id={field.key}
              key={field.key}
              label={field.label}
              step={field.step}
              type="number"
              unit={field.unit}
              value={inputs[field.key]}
              onChange={(value) => updateInput(field.key, value)}
            />
          ))}
        </FieldGrid>

        <Button icon={<Play size={18} strokeWidth={2.5} />} onClick={runSimulation}>
          Ejecutar simulacion
        </Button>
      </Sidebar>

      <Workspace>
        <Topbar>
          <div>
            <Eyebrow>Modelo I Santos</Eyebrow>
            <h2>Ciclo GLI convencional</h2>
          </div>
          <StatusPill icon={Server} label={status} />
        </Topbar>

        <MetricsGrid>
          {formattedMetrics.map(([label, value, unit]) => (
            <MetricCard key={label} label={label} value={value} unit={unit} />
          ))}
        </MetricsGrid>

        <ChartsGrid>
          <LineChart
            color="#1f7a8c"
            data={result.points}
            icon={Activity}
            title="Presion en anular"
            xKey="t"
            yKey="pressure"
          />
          <LineChart
            color="#8f5f21"
            data={result.points}
            icon={Activity}
            title="Caudal de gas"
            xKey="t"
            yKey="gasRate"
          />
        </ChartsGrid>
      </Workspace>
    </Shell>
  );
}

const Shell = styled.main`
  display: grid;
  grid-template-columns: minmax(300px, 380px) 1fr;
  min-height: 100vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[7]};
  background: ${({ theme }) => theme.colors.sidebar};
  color: ${({ theme }) => theme.colors.sidebarText};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing[5]};
  }
`;

const BrandBlock = styled.div`
  span {
    color: ${({ theme }) => theme.colors.accent};
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  h1 {
    margin: ${({ theme }) => theme.spacing[2]} 0 0;
    max-width: 12ch;
    font-size: clamp(2rem, 4vw, 3.2rem);
    line-height: 0.96;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    h1 {
      max-width: none;
    }
  }
`;

const FieldGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const Workspace = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[8]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing[5]};
  }
`;

const Topbar = styled.header`
  ${responsiveStack};
  align-items: center;
  justify-content: space-between;

  h2 {
    margin: ${({ theme }) => theme.spacing[1]} 0 0;
    font-size: clamp(1.8rem, 3vw, 2.8rem);
    line-height: 1;
  }
`;

const Eyebrow = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
`;

const MetricsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(5, minmax(130px, 1fr));
  gap: ${({ theme }) => theme.spacing[3]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ChartsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;
