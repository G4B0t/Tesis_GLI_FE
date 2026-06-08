//TODO: Delete this component
import {
  Autocomplete,
  Chip,
  TextField,
  styled,
  Tooltip,
  IconButton,
  InputAdornment,
  TextFieldProps,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#f0f0f0',
  height: 25,
  maxWidth: 100,
  marginRight: theme.spacing(0.5),
  display: 'inline-flex',
  alignItems: 'center',
  verticalAlign: 'middle',
  '& .MuiChip-label': {
    fontSize: '11px',
    lineHeight: '1',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    height: 45,
    paddingRight: '0px',
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
  id: string;
  label: string;
}

type PmcaMultipleAutocompleteProps = {
  label: string;
  options: OptionType[];
  value: OptionType[];
  onChange: (newValue: OptionType[]) => void;
  loading?: boolean;
  maxVisibleChips?: number;
  disableCloseOnSelect?: boolean;
  error?: boolean;
  errorMessages?: Array<string>;
  TextFieldProps?: TextFieldProps;
};

const PmcaMultipleAutocomplete = ({
  label,
  options,
  value,
  onChange,
  loading = false,
  maxVisibleChips = 1,
  disableCloseOnSelect = false,
  error = false,
  errorMessages = [],
  TextFieldProps = {},
}: PmcaMultipleAutocompleteProps) => {
  return (
    <Autocomplete<OptionType, true, false, false>
      multiple
      size="small"
      disableCloseOnSelect={disableCloseOnSelect}
      loading={loading}
      options={options}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.label || ''}
      onChange={(_event, newValue) => onChange(newValue)}
      value={value}
      sx={{
        '& .MuiAutocomplete-root': {
          width: '100%',
        },
      }}
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
      renderTags={(value, getTagProps) => {
        const displayedChips = value.slice(0, maxVisibleChips);
        const remainingCount = value.length - maxVisibleChips;
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {displayedChips.map((option: OptionType, index) => (
              <StyledChip
                {...getTagProps({ index })}
                key={option.id}
                label={option.label}
              />
            ))}
            {remainingCount > 0 && (
              <StyledChip
                label={`+${remainingCount}`}
                onClick={(event) => event.stopPropagation()} // Prevent the Autocomplete dropdown from opening
              />
            )}
          </div>
        );
      }}
    />
  );
};

export default PmcaMultipleAutocomplete;

