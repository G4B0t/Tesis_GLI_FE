export type MetricTuple = [label: string, value: string, unit: string];

export type RunMessageTone = "error" | "success" | "warning";

export interface RunMessage {
  text: string;
  tone: RunMessageTone;
}
