#Single autoComplete

const [value, setValue] = useState<SingleAutocompleteResponse>(null);
const onChange = useCallback(
    (value: SingleAutocompleteResponse) => {
        setValue2(value);
    },
    [setValue],
);

<AutoComplete<OptionType, false>
name={'test'}
options={currencies}
label={'Currnecies'}
onChange={onChange}
value={value}></AutoComplete>


#Multiple autoComplete

const [value, setValue] = useState<MultipleAutocompleteResponse>([]);
const onChange = useCallback(
    (value: MultipleAutocompleteResponse) => {
    setValue(value);
    },
    [setValue],
);

<AutoComplete<OptionType, true>
name={'test'}
options={currencies}
label={'Currnecies'}
onChange={onChange}
multiple={true}
value={value}></AutoComplete>


#Properties
value can take different types of values:
for multi mode: Options[] | string[] | number[]
for single mode: Options | string | number | null

The logic inside will turn any of these values into an OptionType object or 
any other generic type that extends OptionType.
The logic inside the component will look for a value from options 
that matches value.


name, - name for input
options, - list of options 
optionsWithCheckbox = false, - add checkbox for option
label,
value,
onChange,
multiple, - turn on multiple mode
loading = false, - add loading status if options are not ready yet
disableClearable = false, - remove Clear button
disableCloseOnSelect = false, - if false, then options list will close after selection
readOnly = false,
disabled = false,
size = Sizes.small,
fullWidth = false, 
noOptionsText = 'No options',
isOptionEqualToValue,
limitTags = 1, - count of visible tags in input (multiple mode)
getLimitTagsText,
getOptionDisabled,
getOptionLabel,
error, - error text
showErrorText = true, 
renderInput,
renderOption,
renderTags,