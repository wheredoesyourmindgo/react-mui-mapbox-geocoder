import React, {useState, useCallback, useEffect, useMemo, useRef} from 'react';
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
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import withStyles from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import {Theme} from '@material-ui/core/styles/createMuiTheme';
import classNames from 'classnames';
import DebouncedProgressBar from './debouncedProgressBar/debouncedProgressBar';
import alpha from 'color-alpha';

const defaultProps = {
  endpoint: 'https://api.mapbox.com',
  inputPlaceholder: 'Search',
  showLoader: true,
  source: 'mapbox.places',
  onSuggest: () => {},
  focusOnMount: false,
  showInputContainer: true
};

type Props = {
  classes: any;
  endpoint: string;
  source: string;
  inputPlaceholder: string;
  accessToken: string;
  proximity?: {longitude: number; latitude: number};
  country?: string;
  bbox?: number[];
  types?: string;
  limit?: number;
  autocomplete?: boolean;
  language?: string;
  showLoader: boolean;
  focusOnMount: boolean;
  onSelect: (param: any) => void;
  onSuggest: (results: any[]) => void;
  onInputBlur?: (event: any) => void;
  onInputFocus?: (event: any) => void;
  inputClasses?: any; // Override css classes to input.
  inputPaperProps?: any; // Override input container props.
  suggestionsPaperProps?: any; // Override suggestions container props.
  inputTextFieldProps?: any;
  showInputContainer?: boolean;
} & typeof defaultProps;

const styles = (theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
      position: 'relative'
    },
    suggestionsContainerOpen: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing(1),
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
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingRight: theme.spacing(1), // IconButton on right provides sufficient padding
      paddingLeft: theme.spacing(2),
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
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTime, setSearchTime] = useState<Date>(new Date());
  const [value, setValue] = useState<string>('');
  const [inputIsFocused, setInputIsFocused] = useState<boolean>(false);

  const autoSuggestRef = useRef<any>();

  const focusInput = useCallback(() => {
    const {input = null} = autoSuggestRef.current || {};
    input && input.focus();
  }, []);

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

  const renderInput = useCallback(
    (renderInputProps) => {
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
    },
    [
      showInputContainer,
      loading,
      showLoader,
      inputPaperProps,
      handleClearInput,
      inputTextFieldProps,
      inputIsFocused,
      value
    ]
  );

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
        setLoading(false);
        setResults(
          fc.features
            .map((feature: any) => ({
              feature: feature,
              label: feature.place_name
            }))
            .filter((feature: any) => feature.label)
        );
      }
    },
    [searchTime]
  );

  const handleSuggestionsFetchRequested = useCallback(
    ({value}) => {
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
      onResult,
      types,
      accessToken
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
            (part: {highlight: boolean; text: string}, index: number) => {
              return part.highlight ? (
                <span key={String(index)} style={{fontWeight: 500}}>
                  {part.text}
                </span>
              ) : (
                <strong key={String(index)} style={{fontWeight: 300}}>
                  {part.text}
                </strong>
              );
            }
          )}
        </Typography>
      </MenuItem>
    );
  }, []);

  const autoSuggestEl = useMemo(
    () =>
      accessToken ? (
        <Autosuggest
          ref={autoSuggestRef}
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
      ) : null,
    [
      accessToken,
      blurInputHandler,
      handleChange,
      handleSuggestionSelected,
      focusInputHandler,
      handleSuggestionsFetchRequested,
      inputClasses,
      handleSuggestionsClearRequested,
      renderInput,
      inputPlaceholder,
      renderSuggestionsContainer,
      renderSuggestion,
      results,
      value,
      classes
    ]
  );
  return autoSuggestEl;
};

MatGeocoder.defaultProps = defaultProps;

function getResultValue(result: any) {
  return result.label;
}

export default withStyles(styles)(MatGeocoder);
