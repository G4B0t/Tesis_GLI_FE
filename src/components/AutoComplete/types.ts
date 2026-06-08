import { IconButtonProps, PaperProps, PopperProps } from '@mui/material';
import {
  AutocompleteOwnerState,
  AutocompleteRenderGetTagProps,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
} from '@mui/material/Autocomplete/Autocomplete';
import { HTMLAttributes, ReactNode } from 'react';

import { Sizes } from './enums';

export interface OptionType {
  value: string | number;
  label: string;
}

export interface OptionTypeNumber extends OptionType {
  value: number;
  label: string;
}

export type SingleAutocompleteResponse = OptionType | null;

export type MultipleAutocompleteResponse = OptionType[];

export interface Props<
  Options extends OptionType,
  Multi extends boolean = false,
> {
  className?: string;
  name: string;
  options: Options[] | undefined;
  optionsWithCheckbox?: boolean;
  limitOptions?: number;
  label?: string;
  showLabel?: boolean;
  placeholder?: string;
  value: Multi extends true
    ? Options[] | string[] | number[]
    : Options | string | number | null;
  onChange: (value: Multi extends true ? Options[] : Options | null) => void;
  onChangeCallback?: (
    value: Multi extends true ? Options[] : Options | null,
  ) => void;
  multiple?: Multi;
  loading?: boolean;
  disableClearable?: boolean;
  disableCloseOnSelect?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: Sizes;
  fullWidth?: boolean;
  noOptionsText?: string;
  isOptionEqualToValue?: (option: Options, value: Options) => boolean;
  limitTags?: number;
  getLimitTagsText?: (more: number) => ReactNode;
  getOptionDisabled?: (option: Options) => boolean;
  getOptionLabel?: (option: Options) => string;
  error?: string | undefined;
  showErrorText?: boolean;
  renderInput?: (params: AutocompleteRenderInputParams) => ReactNode;
  renderOption?: (
    props: HTMLAttributes<HTMLLIElement>,
    option: Options,
    state: AutocompleteRenderOptionState,
    ownerState: AutocompleteOwnerState<Options, Multi, boolean, false>,
  ) => ReactNode;
  renderTags?: (
    value: Options[],
    getTagProps: AutocompleteRenderGetTagProps,
    ownerState: AutocompleteOwnerState<Options, Multi, boolean, false>,
  ) => ReactNode;
  slotProps?: {
    clearIndicator?: Partial<IconButtonProps>;
    paper?: PaperProps;
    popper?: Partial<PopperProps>;
    popupIndicator?: Partial<IconButtonProps>;
  };
}
