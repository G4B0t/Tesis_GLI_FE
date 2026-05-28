import { Activity, Play, Save, Server } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import Button from "@components/Button";
import FormField from "@components/FormField";
import LineChart from "@components/LineChart";
import MetricCard from "@components/MetricCard";
import StatusPill from "@components/StatusPill";
import type {
  NumericSimulationInputKey,
  ProjectSimulationInputKey,
  SimulationInputs,
  SimulationStatus,
} from "@models/Simulation";
import { requestSimulation, saveSimulation } from "@services/simulationApi";
import { simulatePreview } from "@services/previewSimulation";

import { API_BASE_URL, initialInputs, inputFields } from "./constants";
import {
  BrandBlock,
  ChartsGrid,
  Eyebrow,
  FieldGrid,
  MetricsGrid,
  ProjectGrid,
  RunMessageBox,
  Shell,
  Sidebar,
  Topbar,
  Workspace,
} from "./styles";
import type { MetricTuple, RunMessage } from "./types";

const Simulation = () => {
  const [inputs, setInputs] = useState<SimulationInputs>(initialInputs);
  const [result, setResult] = useState(() => simulatePreview(initialInputs));
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [runMessage, setRunMessage] = useState<RunMessage>({
    text: "Aun no se guardo ninguna simulacion en la base de datos.",
    tone: "warning",
  });
  const [status, setStatus] = useState<SimulationStatus>("Vista preliminar local");

  const formattedCreatedAt = useMemo(() => {
    if (!result.createdAt) {
      return "Sin guardar";
    }

    return new Intl.DateTimeFormat("es-BO", {
      dateStyle: "short",
      timeStyle: "medium",
    }).format(new Date(result.createdAt));
  }, [result.createdAt]);

  const formattedMetrics = useMemo<MetricTuple[]>(() => {
    const savedId = result.simulationId ? `#${result.simulationId}` : "Vista local";

    return [
      ["Simulacion", savedId, ""],
      ["Fecha y hora", formattedCreatedAt, ""],
      ["Densidad liquido", result.metrics.rhoL.toFixed(1), "kg/m3"],
      ["P_to", result.metrics.pTo.toFixed(3), "MPa"],
      ["Tiempo etapa 1", result.metrics.duration.toFixed(0), "s"],
    ];
  }, [formattedCreatedAt, result.metrics, result.simulationId]);

  const updateInput = useCallback((key: NumericSimulationInputKey, value: string) => {
    const parsed = Number(value);

    setInputs((current) => ({
      ...current,
      [key]: Number.isFinite(parsed) ? parsed : current[key],
    }));
  }, []);

  const updateProjectInput = useCallback((key: ProjectSimulationInputKey, value: string) => {
    setInputs((current) => ({
      ...current,
      [key]: value,
    }));
  }, []);

  const runSimulation = useCallback(async () => {
    setIsRunning(true);
    setStatus("Calculando...");
    setRunMessage({
      text: "Ejecutando simulacion con los parametros ingresados.",
      tone: "warning",
    });

    try {
      const backendResult = await requestSimulation(API_BASE_URL, inputs);
      setResult(backendResult);
      setStatus("Resultado desde backend");
      setRunMessage({
        text: "Simulacion ejecutada. La grafica fue actualizada, pero aun no se guardo en MySQL.",
        tone: "success",
      });
    } catch (error) {
      setResult(simulatePreview(inputs));
      setStatus("Vista preliminar local");
      setRunMessage({
        text: `No se pudo guardar en backend. Se muestra vista local. Detalle: ${
          error instanceof Error ? error.message : "error desconocido"
        }`,
        tone: "error",
      });
    } finally {
      setIsRunning(false);
    }
  }, [inputs]);

  const saveCurrentSimulation = useCallback(async () => {
    setIsSaving(true);
    setRunMessage({
      text: "Guardando parametros y resultado de simulacion en MySQL...",
      tone: "warning",
    });

    try {
      const savedResult = await saveSimulation(API_BASE_URL, inputs);
      setResult(savedResult);
      setStatus("Resultado desde backend");
      setRunMessage({
        text: `Parametros guardados en MySQL con ID #${savedResult.simulationId}. Proyecto: ${savedResult.projectName}. Proyectista: ${savedResult.projectistName}.`,
        tone: "success",
      });
    } catch (error) {
      setRunMessage({
        text: `No se pudo guardar en MySQL. Detalle: ${
          error instanceof Error ? error.message : "error desconocido"
        }`,
        tone: "error",
      });
    } finally {
      setIsSaving(false);
    }
  }, [inputs]);

  return (
    <Shell>
      <Sidebar>
        <BrandBlock>
          <span>GLI</span>
          <h1>Simulador Gas Lift Intermitente</h1>
        </BrandBlock>

        <ProjectGrid>
          <FormField
            id="project-name"
            label="Nombre del proyecto"
            onChange={(value) => updateProjectInput("projectName", value)}
            value={inputs.projectName}
          />
          <FormField
            id="projectist-name"
            label="Proyectista"
            onChange={(value) => updateProjectInput("projectistName", value)}
            value={inputs.projectistName}
          />
        </ProjectGrid>
        <FieldGrid>
          {inputFields.map((field) => (
            <FormField
              id={field.key}
              key={field.key}
              label={field.label}
              onChange={(value) => updateInput(field.key, value)}
              step={field.step}
              type="number"
              unit={field.unit}
              value={inputs[field.key]}
            />
          ))}
        </FieldGrid>

        <Button
          icon={<Play size={18} strokeWidth={2.5} />}
          label="Ejecutar simulacion"
          loading={isRunning}
          onClick={runSimulation}
          width100
        />
        <Button
          icon={<Save size={18} strokeWidth={2.5} />}
          label="Guardar parametros"
          loading={isSaving}
          onClick={saveCurrentSimulation}
          width100
        />
      </Sidebar>

      <Workspace>
        <Topbar>
          <div>
            <Eyebrow>Modelo I Santos</Eyebrow>
            <h2>Ciclo GLI convencional</h2>
          </div>
          <StatusPill
            icon={Server}
            label={result.simulationId ? `${status} #${result.simulationId}` : status}
          />
        </Topbar>

        <MetricsGrid>
          {formattedMetrics.map(([label, value, unit]) => (
            <MetricCard key={label} label={label} unit={unit} value={value} />
          ))}
        </MetricsGrid>

        <RunMessageBox $tone={runMessage.tone}>
          <strong>
            {runMessage.tone === "success"
              ? "Conexion correcta"
              : runMessage.tone === "error"
                ? "No se guardo la simulacion"
                : "Estado de ejecucion"}
          </strong>
          <p>{runMessage.text}</p>
        </RunMessageBox>

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
};

export default Simulation;
