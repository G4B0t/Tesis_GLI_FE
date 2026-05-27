import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";

import { Sizes, StyleTypes } from "./enums";

export interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type"> {
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
  id?: string;
  label: string;
  loading?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  size?: Sizes;
  styleType?: StyleTypes;
  type?: "button" | "submit" | "reset";
  width100?: boolean;
}

export interface RootProps {
  $hasIcon: boolean;
  disabled?: boolean;
  size?: Sizes;
  styleType?: StyleTypes;
  width100?: boolean;
}
