// @flow
import React, {useState, useCallback, useEffect} from 'react';
import {search} from './search';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import classNames from 'classnames';
import DebouncedProgressBar from './debouncedProgressBar/debouncedProgressBar';
import alpha from 'color-alpha';

type Props = {
  classes: any,
  endpoint: string,
  source: string,
  inputPlaceholder: string,
  accessToken: string,
  proximity?: {longitude: number, latitude: number},
  country?: string,
  bbox?: Array<number>,
  types?: string,
  limit?: number,
  autocomplete?: boolean,
  language?: string,
  showLoader: boolean,
  focusOnMount: boolean,
  onSelect: (param: any) => void,
  onSuggest: (results: Array<any>) => void,
  onInputBlur?: (event: any) => void,
  onInputFocus?: (event: any) => void,
  inputClasses?: any, // Override css classes to input.
  inputPaperProps?: any, // Override input container props.
  suggestionsPaperProps?: any, // Override suggestions container props.
  inputTextFieldProps?: any,
  showInputContainer?: boolean
};

const matStyles = (theme) => ({
  container: {
    flexGrow: 1,
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'block',
    marginBottom: 0
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  inputContainer: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingRight: theme.spacing.unit, // IconButton on right provides sufficient padding
    paddingLeft: theme.spacing.unit * 2,
    backgroundColor: alpha(theme.palette.background.paper, 0.9),
    overflow: 'hidden',
    '&:hover,&:active,&.inputContainerFocused': {
      backgroundColor: theme.palette.background.paper
    },
    // Maintain a consistent height when IconButton (CancelIcon) is visible.
    minHeight: '64px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
    //...
  },
  grow: {
    flexGrow: 1
  },
  shrink: {
    flexShrink: 1
  },
  noGrow: {
    flexGrow: 0
  },
  noShrink: {
    flexShrink: 0
  }
});

/**
 * Geocoder component: connects to Mapbox.com Geocoding API
 * and provides an auto-completing interface for finding locations.
 */
const MatGeocoder = ({
  proximity,
  country,
  bbox,
  types,
  limit,
  autocomplete,
  language,
  source,
  suggestionsPaperProps,
  classes,
  showInputContainer,
  focusOnMount,
  endpoint,
  onSuggest,
  onSelect,
  accessToken,
  onInputFocus,
  onInputBlur,
  inputPlaceholder,
  inputClasses,
  inputTextFieldProps,
  showLoader,
  inputPaperProps
}: Props) => {
  const [results, setResults] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTime, setSearchTime] = useState<Date>(new Date());
  const [value, setValue] = useState<string>('');
  const [inputIsFocused, setInputIsFocused] = useState<boolean>(false);
  useEffect(() => {
    if (focusOnMount) {
      focusInput();
    }
  }, [focusOnMount]);
  useEffect(() => {
    onSuggest && onSuggest(results);
  }, [results]);

  let input: HTMLInputElement;

  const storeInputReference = (autosuggest) => {
    if (autosuggest != null) {
      input = autosuggest.input;
    }
  };

  const renderInput = (renderInputProps) => {
    const {classes, ref, inputClasses, ...other} = renderInputProps;

    const inputTextField = (
      <TextField
        fullWidth
        InputProps={{
          inputRef: ref,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          classes: inputClasses,
          ...other
        }}
        {...inputTextFieldProps}
      />
    );

    return showInputContainer ? (
      <React.Fragment>
        <DebouncedProgressBar show={loading && showLoader} />
        <Paper
          square={false}
          elevation={1}
          className={classNames(classes.inputContainer, {
            inputContainerFocused: inputIsFocused
          })}
          {...inputPaperProps}
        >
          <Grid container alignItems="center" spacing={8} wrap="nowrap">
            <Grid
              item
              xs
              className={classNames(classes.grow, classes.noShrink)}
            >
              {inputTextField}
            </Grid>
            {/* Unmount and mount releases space for TexField to grow AND show animation. */}
            <Fade
              in={value.length > 0}
              unmountOnExit={true}
              mountOnEnter={true}
            >
              <Grid
                item
                xs
                className={classNames(classes.shrink, classes.noGrow)}
              >
                <IconButton
                  aria-label="Clear Search Input"
                  onClick={handleClearInput}
                >
                  <CancelIcon />
                </IconButton>
              </Grid>
            </Fade>
          </Grid>
        </Paper>
      </React.Fragment>
    ) : (
      <React.Fragment>{inputTextField}</React.Fragment>
    );
  };

  const focusInputHandler = useCallback(
    (e) => {
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

  const renderSuggestionsContainer = (options) => {
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
  };

  const focusInput = useCallback(() => {
    if (input) {
      input.focus();
    }
  }, [input]);

  const handleSuggestionsFetchRequested = ({value}) => {
    setLoading(true);
    if (value === '') {
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
  };

  const onResult = useCallback(
    (err: any, fc: any, st: Date) => {
      // searchTime is compared with the last search to set the state
      // to ensure that a slow xhr response does not scramble the
      // sequence of autocomplete display.
      if (!err && fc && fc.features && searchTime <= st) {
        setSearchTime(st);
        setLoading(false);
        setResults(
          fc.features
            .map((feature) => ({
              feature: feature,
              label: feature.place_name
            }))
            .filter((feature) => feature.label)
        );
      }
    },
    [searchTime]
  );

  /**
   * Parameters Signature:
   * (event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method})
   */
  const handleSuggestionSelected = useCallback(
    (event, {suggestion}) => {
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

  const handleChange = useCallback((event, {newValue}) => {
    setValue(newValue);
  }, []);

  const handleClearInput = useCallback(() => {
    setValue('');
    // After clear button is clicked the input should be re-focused automatically.
    focusInput();
  }, []);

  return accessToken ? (
    <Autosuggest
      ref={storeInputReference}
      theme={{
        container: classes.container,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion
      }}
      renderInputComponent={renderInput}
      suggestions={results}
      onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      onSuggestionsClearRequested={handleSuggestionsClearRequested}
      onSuggestionSelected={handleSuggestionSelected}
      renderSuggestionsContainer={renderSuggestionsContainer}
      getSuggestionValue={getResultValue}
      renderSuggestion={renderSuggestion}
      inputProps={{
        classes,
        placeholder: inputPlaceholder,
        value: value,
        onChange: handleChange,
        onFocus: focusInputHandler,
        onBlur: blurInputHandler,
        inputClasses
      }}
    />
  ) : null;
};

function renderSuggestion(suggestion, {query, isHighlighted}) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <Typography noWrap variant="subtitle1">
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{fontWeight: 500}}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{fontWeight: 300}}>
              {part.text}
            </strong>
          );
        })}
      </Typography>
    </MenuItem>
  );
}

MatGeocoder.defaultProps = {
  endpoint: 'https://api.mapbox.com',
  inputPlaceholder: 'Search',
  showLoader: true,
  source: 'mapbox.places',
  onSuggest: () => {},
  focusOnMount: false,
  showInputContainer: true
};

function getResultValue(result) {
  return result.label;
}

export default withStyles(matStyles)(MatGeocoder);
