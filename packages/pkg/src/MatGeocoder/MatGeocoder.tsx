import React, {useState, useCallback, useEffect, useRef} from 'react';
import search from './search';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import {
  Fade,
  IconButton,
  InputAdornment,
  MenuItem,
  useTheme,
  Box,
  Paper,
  Typography,
  PaperProps,
  alpha,
  InputBase,
  InputBaseProps,
  TextField,
  TextFieldProps,
} from '@mui/material';
import usePrevious from '../hooks/usePrevious';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import DebouncedProgressBar from './debouncedProgressBar/debouncedProgressBar';
import {Result} from './Result';

type Props = {

  /**
   * Anytime this value changed, the user input will be overriden with it. WARN: This is not a callback, inputValue won't change when the user types.
   */
  inputValue?: string;

  endpoint?: string;
  source?: string;
  inputPlaceholder?: string;
  accessToken: string;
  proximity?: {longitude: number; latitude: number};
  country?: string;
  bbox?: number[];
  types?: string;
  limit?: number;
  autocomplete?: boolean;
  language?: string;
  showLoader?: boolean;
  focusOnMount?: boolean;
  onSelect: (param: any) => void;
  onSuggest?: (results: any[]) => void;
  onInputBlur?: (event: any) => void;
  onInputFocus?: (event: any) => void;

  /**
   * Override css classes to input.
   */
  inputClasses?: any; 

  /**
   * Override input container props.
   */
  inputPaperProps?: Partial<PaperProps>;

  /**
   * Override suggestions container props.
   */
  suggestionsPaperProps?: PaperProps;

  /**
   * If textFieldsProps is provided, these props will be ignored.
   */
  inputProps?: Partial<InputBaseProps>;

  /**
   * Specify if you want the input to be a TextField instead of a MUI input. rawInputProps will be ignored.
   */
  textFieldProps?: Partial<TextFieldProps>;
  
  showInputContainer?: boolean;
};

const SearchInput = ({...props}: Partial<InputBaseProps>) => {
  return (
    <InputBase
      type="search"
      fullWidth
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon color="action" />
        </InputAdornment>
      }
      {...props}
    />
  );
};

const SearchTextField = ({...props}: Partial<TextFieldProps>) => {
  return (
    <TextField
      type="search"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

/**
 * Geocoder component: connects to Mapbox.com Geocoding API
 * and provides an auto-completing interface for finding locations.
 */
const MatGeocoder = ({
  endpoint = 'https://api.mapbox.com',
  inputPlaceholder = 'Search',
  showLoader = true,
  source = 'mapbox.places',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSuggest = () => {},
  focusOnMount = false,
  showInputContainer = true,
  inputValue = '',
  proximity,
  country,
  bbox,
  types,
  limit,
  autocomplete,
  language,
  suggestionsPaperProps,
  onSelect,
  accessToken,
  onInputFocus,
  onInputBlur,
  inputClasses,
  inputProps: inputPropsParam,
  textFieldProps,
  inputPaperProps,
}: Props) => {

  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTime, setSearchTime] = useState(new Date());
  const [value, setValue] = useState(inputValue);
  const [inputIsFocused, setInputIsFocused] = useState(false);

  const autoSuggestRef = useRef<Autosuggest>(null);
  const prevValue = usePrevious(value);

  const focusInput = useCallback(() => {
    const {input = null} = autoSuggestRef.current || {};
    input && input.focus();
  }, []);

  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);

  useEffect(() => {
    if (focusOnMount) {
      focusInput();
    }
  }, [focusOnMount, focusInput]);

  useEffect(() => {
    onSuggest && onSuggest(results);
  }, [results, onSuggest]);

  const handleClearInput = useCallback(() => {
    setValue('');
    // After clear button is clicked the input should be re-focused automatically.
    focusInput();
  }, [focusInput]);

  const theme = useTheme();

  const renderInput = useCallback(

    (renderInputProps) => {

      const {ref, inputClasses, ...other} = renderInputProps;
      const {...restInputPaperProps} = inputPaperProps ?? {};

      let searchInput = (
        <SearchInput
          classes={inputClasses}
          inputRef={ref}
          {...other}
          {...inputPropsParam}
        />
      );

      if (textFieldProps) {
        searchInput = (
          <SearchTextField
            classes={inputClasses}
            inputRef={ref}
            {...other}
            {...textFieldProps}
          />
        )
      }

      if (!showInputContainer) {
        return searchInput;
      }

      return (
        <>
          <DebouncedProgressBar show={loading && showLoader} />
          <Paper
            square={false}
            elevation={1}
            sx={{
              paddingTop: 1,
              paddingBottom: 1,
              paddingRight: 1, // IconButton on right provides sufficient padding
              paddingLeft: 2,
              backgroundColor: inputIsFocused
                ? theme.palette.background.paper
                : alpha(theme.palette.background.paper, 0.9),
              overflow: 'hidden',
              '&:hover,&:active': {
                backgroundColor: theme.palette.background.paper,
              },
              // Maintain a consistent height when IconButton (CancelIcon) is visible.
              minHeight: '64px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              //...
            }}
            {...restInputPaperProps}
          >
            <Box display="flex" flexDirection="row" alignItems="center">
              <Box flex="auto" sx={{flexShrink: 0, flexGrow: 1}}>
                {searchInput}
              </Box>
              {/* Unmount and mount releases space for TexField to grow AND show animation. */}
              <Fade
                in={value.length > 0}
                unmountOnExit={true}
                mountOnEnter={true}
              >
                <Box
                  flex="auto"
                  sx={{
                    flexGrow: 0,
                    flexShrink: 1,
                  }}
                >
                  <IconButton
                    aria-label="Clear Search Input"
                    onClick={handleClearInput}
                    size="large"
                  >
                    <CancelIcon />
                  </IconButton>
                </Box>
              </Fade>
            </Box>
          </Paper>
        </>
      );
    },
    [
      inputPropsParam,
      textFieldProps,
      showInputContainer,
      loading,
      showLoader,
      inputIsFocused,
      inputPaperProps,
      value.length,
      handleClearInput,
      theme,
    ]
  );

  const focusInputHandler = useCallback(
    (e: React.FocusEvent<any>) => {
      setInputIsFocused(true);
      onInputFocus && onInputFocus(e);
    },
    [onInputFocus]
  );

  const blurInputHandler = useCallback(
    (e) => {
      setInputIsFocused(false);
      onInputBlur && onInputBlur(e);
    },
    [onInputBlur]
  );

  const renderSuggestionsContainer = useCallback(
    (options) => {
      const {containerProps, children} = options;
      return (
        <Paper
          {...containerProps}
          square={false}
          elevation={4}
          {...suggestionsPaperProps}
        >
          {children}
        </Paper>
      );
    },
    [suggestionsPaperProps]
  );

  const onResult = useCallback(
    (err: any, fc: any, st: Date) => {
      // searchTime is compared with the last search to set the state
      // to ensure that a slow xhr response does not scramble the
      // sequence of autocomplete display.
      if (!err && fc && fc.features && searchTime <= st) {
        setSearchTime(st);
        setResults(
          fc.features
            .map((feature: any) => ({
              feature: feature,
              label: feature.place_name,
            }))
            .filter((feature: any) => feature.label)
        );
        setLoading(false);
      }
    },
    [searchTime]
  );

  const handleSuggestionsFetchRequested = useCallback(
    ({value}) => {
      setLoading(true);
      if (prevValue === value) {
        setLoading(false);
      } else if (value === '') {
        setResults([]);
        setLoading(false);
      } else {
        search(
          endpoint,
          source,
          accessToken,
          value,
          onResult,
          proximity,
          country,
          bbox,
          types,
          limit,
          autocomplete,
          language
        );
      }
    },
    [
      bbox,
      country,
      endpoint,
      limit,
      language,
      autocomplete,
      source,
      proximity,
      prevValue,
      onResult,
      types,
      accessToken,
    ]
  );

  /**
   * Parameters Signature:
   * (event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method})
   */
  const handleSuggestionSelected = useCallback(
    (_event, {suggestion}) => {
      onSelect && onSelect(suggestion.feature);
      // focus on the input after click to maintain key traversal
      // this.inputRef.current && this.inputRef.current.focus()
      return false;
    },
    [onSelect]
  );

  const handleSuggestionsClearRequested = useCallback(() => {
    setResults([]);
  }, []);

  const handleChange = useCallback((_event, {newValue}) => {
    setValue(newValue);
  }, []);

  const renderSuggestion = useCallback((suggestion, {query, isHighlighted}) => {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <Typography noWrap variant="subtitle1">
          {parts.map(
            (part: {highlight: boolean; text: string}, index: number) => (
              <Typography
                key={index}
                component="span"
                variant="inherit"
                sx={{fontWeight: part.highlight ? 500 : 300}}
              >
                {part.text}
              </Typography>
            )
          )}
        </Typography>
      </MenuItem>
    );
  }, []);

  const getResultValue = useCallback((result: any) => result.label, []);

  if (!accessToken) {
    return null;
  }

  return (
    <Box
      sx={{
        // https://github.com/moroshko/react-autosuggest#theme-optional
        '& .react-autosuggest__container': {
          flexGrow: 1,
          position: 'relative',
        },
        '& .react-autosuggest__suggestions-container--open': {
          position: 'absolute',
          zIndex: 1,
          marginTop: 1,
          left: 0,
          right: 0,
        },
        '& .react-autosuggest__suggestions-list': {
          margin: 0,
          padding: 0,
          listStyleType: 'none',
        },
        '& .react-autosuggest__suggestion': {
          display: 'block',
          marginBottom: 0,
        },
      }}
    >
      <Autosuggest
        ref={autoSuggestRef}
        renderInputComponent={renderInput}
        suggestions={results}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={handleSuggestionsClearRequested}
        onSuggestionSelected={handleSuggestionSelected}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getResultValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          placeholder: inputPlaceholder,
          value: value,
          onChange: handleChange,
          onFocus: focusInputHandler,
          onBlur: blurInputHandler,
          className: inputClasses,
        }}
      />
    </Box>
  );
};

export default MatGeocoder;
