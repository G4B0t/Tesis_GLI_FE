import {
  Autocomplete,
  AutocompleteValue,
  TextField,
  createFilterOptions,
} from '@mui/material';
import {
  AutocompleteOwnerState,
  AutocompleteRenderGetTagProps,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
} from '@mui/material/Autocomplete/Autocomplete';
import React, {
  HTMLAttributes,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

import { Sizes } from './enums';
import {
  AttentionIcon,
  AutoCompleteContainer,
  ErrorMessage,
  ErrorMessageContainer,
  Label,
  Option,
  RequiredMark,
  Root,
  StyledCheckBox,
  StyledChip,
} from './styles';
import {
  MultipleAutocompleteResponse,
  OptionType,
  Props,
  SingleAutocompleteResponse,
} from './types';

const AutoComplete = <
  Options extends OptionType,
  Multi extends boolean = false,
>({
  className,
  name,
  options = [],
  optionsWithCheckbox = false,
  limitOptions = 100,
  label,
  showLabel = false,
  placeholder,
  value,
  onChange,
  onChangeCallback,
  multiple,
  loading = false,
  disableClearable = false,
  disableCloseOnSelect = false,
  readOnly = false,
  disabled = false,
  required = false,
  size = Sizes.medium,
  fullWidth = false,
  noOptionsText = 'No options',
  isOptionEqualToValue,
  limitTags = 1,
  getLimitTagsText,
  getOptionDisabled,
  getOptionLabel,
  error,
  showErrorText = true,
  renderInput,
  renderOption,
  renderTags,
  slotProps,
}: Props<Options, Multi>) => {
  type TypedValue = Multi extends true ? Options[] : Options | null;
  const disabledOrLoading = useMemo(
    () => disabled || loading,
    [disabled, loading],
  );

  const getLabelFromOptions = useCallback(
    (value: string | number): string => {
      const searchedLabel = options.filter((option) => option.value === value);
      return searchedLabel.length ? searchedLabel[0].label : '';
    },
    [options],
  );
  const getValueFromOptions = useCallback(
    (label: string | number) => {
      const searchedValue = options.filter(
        (option) =>
          option.label.toLowerCase() === label.toString().toLowerCase(),
      );
      return searchedValue.length ? searchedValue[0].value : '';
    },
    [options],
  );
  const filterOptions = createFilterOptions<Options>({
    limit: limitOptions,
  });

  const fullSingleValue: SingleAutocompleteResponse = useMemo(() => {
    if (typeof value === 'string' || typeof value === 'number') {
      const labelFromOptions = getLabelFromOptions(value);

      return labelFromOptions === ''
        ? null
        : ({
            value: value,
            label: getLabelFromOptions(value),
          } as Options);
    } else if (typeof value === 'object' && value && !Array.isArray(value)) {
      const labelFromOptions = getLabelFromOptions(value.value);

      return labelFromOptions === ''
        ? null
        : ({
            ...value,
            label: getLabelFromOptions(value.value),
          } as Options);
    }
    return null;
  }, [getLabelFromOptions, value]);
  const fullMultipleValue: MultipleAutocompleteResponse = useMemo(() => {
    if (Array.isArray(value)) {
      return value
        .map((el) => {
          if (typeof el === 'string' || typeof el === 'number') {
            return { value: el, label: getLabelFromOptions(el) } as Options;
          } else {
            return { ...el, label: getLabelFromOptions(el.value) } as Options;
          }
        })
        .filter((el) => el.label !== '');
    }
    return [];
  }, [getLabelFromOptions, value]);
  const fullValue = useMemo(
    () => (multiple ? fullMultipleValue : fullSingleValue),
    [fullMultipleValue, fullSingleValue, multiple],
  );

  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      const pasteData = event.clipboardData?.getData('text');

      if (pasteData) {
        const pasteItems = pasteData
          .split(',')
          .map((item) => item.trim())
          .filter((item) => item !== '');

        const successItems: OptionType[] = [];
        const failedItems: string[] = [];

        for (let i = 0; i < pasteItems.length; i++) {
          const value = getValueFromOptions(pasteItems[i]);
          if (value === '') {
            failedItems.push(pasteItems[i]);
          } else {
            successItems.push({ value: value, label: pasteItems[i] });
          }
        }

        if (multiple) {
          const newState = new Map(
            [...fullMultipleValue, ...successItems].map((item) => [
              item.value,
              item,
            ]),
          );

          onChange(Array.from(newState.values()) as TypedValue);
          onChangeCallback?.(Array.from(newState.values()) as TypedValue);
        } else {
          if (successItems.length) {
            onChange(successItems[0] as TypedValue);
            onChangeCallback?.(successItems[0] as TypedValue);
          }
        }

        if (failedItems.length)
          console.warn(
            `Such values '${failedItems.join(', ')}' do not exist in the list`,
          );
      }
    },
    [
      fullMultipleValue,
      getValueFromOptions,
      multiple,
      onChange,
      onChangeCallback,
    ],
  );
  const defaultRenderInput = useCallback(
    (params: AutocompleteRenderInputParams) => (
      <TextField
        {...params}
        name={name}
        label={showLabel ? undefined : label}
        error={!!error}
        onPaste={handlePaste}
        placeholder={placeholder}
        required={required}
      />
    ),
    [error, handlePaste, label, name, placeholder, required, showLabel],
  );
  const defaultGetOptionLabel = useCallback(
    (option: Options) => option?.label || '',
    [],
  );
  const defaultIsOptionEqualToValue = useCallback(
    (option: Options, value: Options) =>
      option.value === value.value && !!value.label,
    [],
  );
  const defaultGetLimitTagsText = useCallback(
    (more: number) => <StyledChip label={`+${more}`} />,
    [],
  );
  const defaultRenderOption = useCallback(
    (props: HTMLAttributes<HTMLLIElement>, option: Options) => (
      <Option {...props} key={option.value}>
        {option.label}
      </Option>
    ),
    [],
  );
  const checkboxRenderOption = useCallback(
    (
      props: HTMLAttributes<HTMLLIElement>,
      option: Options,
      { selected }: AutocompleteRenderOptionState,
    ) => {
      return (
        <Option {...props} key={option.value}>
          <><StyledCheckBox checked={selected} size="small" tabIndex={-1} disableRipple /><span>{option.label}</span></>
        </Option>
      );
    },
    [],
  );
  const finalRenderOption = useMemo(() => {
    if (renderOption) return renderOption;

    return optionsWithCheckbox ? checkboxRenderOption : defaultRenderOption;
  }, [
    checkboxRenderOption,
    defaultRenderOption,
    optionsWithCheckbox,
    renderOption,
  ]);
  const defaultRenderTags = useCallback(
    (
      value: Options[],
      getTagProps: AutocompleteRenderGetTagProps,
      ownerState: AutocompleteOwnerState<Options, Multi, boolean, false>,
    ) => {
      const displayedChips = value.slice(0, limitTags);
      const remainingCount = value.length - limitTags;

      return !ownerState.inputFocused ? (
        <>
          {displayedChips.map((option: OptionType, index) => (
            <StyledChip
              {...getTagProps({ index })}
              key={index}
              label={option.label}
            />
          ))}
          {remainingCount > 0 && <StyledChip label={`+${remainingCount}`} />}
        </>
      ) : (
        value.map((option: OptionType, index) => (
          <StyledChip
            {...getTagProps({ index })}
            key={index}
            label={option.label}
          />
        ))
      );
    },
    [limitTags],
  );
  const handleOnChange = useCallback(
    (_event: SyntheticEvent<Element, Event>, newValue: TypedValue) => {
      onChange?.(newValue);
      onChangeCallback?.(newValue);
    },
    [onChange, onChangeCallback],
  );

  useEffect(() => {
    if (multiple) {
      if (Array.isArray(value) && !loading) {
        const successValuesInOptions = value.filter((el) => {
          return !!options?.filter(
            (option: OptionType) => option.value === (el as Options)?.value,
          );
        }, []);
        onChange?.(successValuesInOptions as TypedValue);
      }
    } else {
      if (typeof value === 'object' && value !== null && !Array.isArray(value) && (value as OptionType)?.value && !loading) {
        const isValueInOptions = !!options?.filter(
          (option: OptionType) => option.value === (value as OptionType)?.value,
        ).length;

        if (!isValueInOptions) {
          onChange?.(null as TypedValue);
        }
      }
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, loading]);

  return (
    <Root className={className} fullWidth={fullWidth}>
      {label && showLabel && (
        <Label htmlFor={name} error={!!error}>
          {required && !disabledOrLoading ? (
            <span>
              {label}
              <RequiredMark error={!!error}>*</RequiredMark>
            </span>
          ) : (
            label
          )}
        </Label>
      )}
      <AutoCompleteContainer sizeType={size} readOnly={readOnly}>
        <Autocomplete<Options, Multi, typeof disableClearable, false>
          options={options}
          getOptionLabel={
            getOptionLabel ? getOptionLabel : defaultGetOptionLabel
          }
          filterOptions={filterOptions}
          disableCloseOnSelect={disableCloseOnSelect}
          loading={loading}
          readOnly={readOnly}
          isOptionEqualToValue={
            isOptionEqualToValue
              ? isOptionEqualToValue
              : defaultIsOptionEqualToValue
          }
          disableClearable={disableClearable || required}
          multiple={multiple}
          value={fullValue as AutocompleteValue<Options, Multi, boolean, false>}
          disabled={disabled}
          fullWidth={fullWidth}
          noOptionsText={noOptionsText}
          limitTags={limitTags}
          getLimitTagsText={
            getLimitTagsText ? getLimitTagsText : defaultGetLimitTagsText
          }
          getOptionDisabled={getOptionDisabled}
          renderOption={finalRenderOption}
          onChange={handleOnChange}
          renderInput={renderInput ? renderInput : defaultRenderInput}
          renderTags={renderTags ? renderTags : defaultRenderTags}
          slotProps={{
            popper: {
              sx: { zIndex: 9998 },
              ...(slotProps?.popper || {}),
            },
            paper: slotProps?.paper,
            clearIndicator: slotProps?.clearIndicator,
            popupIndicator: slotProps?.popupIndicator,
          }}
        />
      </AutoCompleteContainer>
      {error && showErrorText && (
        <ErrorMessageContainer sizetype={size}>
          <AttentionIcon size={20} />
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorMessageContainer>
      )}
    </Root>
  );
};

export { Sizes };
export type {
  Props,
  OptionType,
  SingleAutocompleteResponse,
  MultipleAutocompleteResponse,
};

export default AutoComplete;

