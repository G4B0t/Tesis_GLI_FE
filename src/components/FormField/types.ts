export interface Props {
  id: string;
  label: string;
  onChange: (value: string) => void;
  step?: number;
  type?: "number" | "text";
  unit?: string;
  value: string | number;
}
