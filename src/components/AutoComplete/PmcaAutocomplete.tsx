//TODO: Delete this component
import React, { useMemo } from 'react';
import {
  Autocomplete,
  TextField,
  styled,
  Tooltip,
  IconButton,
  InputAdornment,
  TextFieldProps,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    height: 40,
    paddingRight: '0px',
    borderRadius: '3px',
    '!important': {
      borderColor: 'rgba(0, 0, 0, 0.23)',
    },
  },
  '& .MuiAutocomplete-popupIndicator': {
    display: 'none', // Hide the popup indicator
  },
  '& .MuiAutocomplete-clearIndicator': {
    display: 'none', // Hide the clear button
  },
  '& .MuiInputBase-input': {
    overflow: 'hidden',
  },
});

const StyledIconButton = styled(IconButton)({
  padding: '0px',
  position: 'absolute',
  right: 5,
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#f44336',
});

const TooltipContent: React.FC<{ messages: string[] }> = ({ messages }) => {
  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </div>
  );
};

interface OptionType {
  value: string;
  label: string;
}

type PmcaAutocompleteProps = {
  label: string;
  options: OptionType[];
  value: OptionType | null;
  onChange: (newValue: OptionType | null) => void;
  loading?: boolean;
  disableCloseOnSelect?: boolean;
  error?: boolean;
  errorMessages?: Array<string>;
  TextFieldProps?: TextFieldProps;
  enableSelectedTooltip?: boolean;
};

const PmcaAutocomplete = ({
  label,
  options,
  value,
  onChange,
  loading = false,
  disableCloseOnSelect = false,
  error = false,
  errorMessages = [],
  TextFieldProps = {},
  enableSelectedTooltip = false,
}: PmcaAutocompleteProps) => {
  const fullValue = useMemo(() => {
    if (!value?.label && value) {
      const searchedLabel = options.filter(
        (option) => option.value === value.value,
      );
      if (searchedLabel.length) {
        return { ...value, label: searchedLabel[0].label };
      }
      return value;
    }
    return value;
  }, [options, value]);

  return (
    <Tooltip
      title={enableSelectedTooltip && fullValue?.label ? fullValue?.label : ''}
      placement="bottom">
      <Autocomplete<OptionType, false, false, false>
        size="small"
        disableCloseOnSelect={disableCloseOnSelect}
        loading={loading}
        options={options}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        getOptionLabel={(option) => option.label || ''}
        onChange={(_event, newValue) => onChange(newValue)}
        value={fullValue}
        sx={{
          '& .MuiAutocomplete-root': {
            width: '100%',
          },
          minWidth: 150,
        }}
        renderOption={(props, option) => (
          <li {...props} key={option.value}>
            {option.label}
          </li>
        )}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            {...TextFieldProps}
            label={label}
            margin="normal"
            fullWidth
            error={error}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {params.InputProps.endAdornment}
                  {error && (
                    <InputAdornment position="end">
                      <Tooltip
                        title={<TooltipContent messages={errorMessages} />}
                        placement="right">
                        <StyledIconButton>
                          <ErrorOutlineIcon
                            color={error ? 'error' : undefined}
                            style={{ color: error ? '#f44336' : undefined }}
                          />
                        </StyledIconButton>
                      </Tooltip>
                    </InputAdornment>
                  )}
                </>
              ),
            }}
          />
        )}
      />
    </Tooltip>
  );
};

export default PmcaAutocomplete;

