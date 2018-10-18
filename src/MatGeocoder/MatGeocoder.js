// @flow
import * as React from 'react';
import {search} from './search';
import type {$AxiosXHR} from 'axios';
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
  onSuggest?: (results: Array<any>) => void,
  inputPaperProps?: any, // override input container props
  suggestionsPaperProps?: any // override suggestions container props
};

type State = {|
  results: Array<any>,
  loading: boolean,
  searchTime: Date,
  value: string
|};

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
    backgroundColor: hexOpacity(theme.palette.background.paper, 'E6'),
    overflow: 'hidden',
    '&:hover,&:focus-within,&:active': {
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
class MatGeocoder extends React.Component<Props, State> {
  static defaultProps = {
    endpoint: 'https://api.mapbox.com',
    inputPlaceholder: 'Search',
    showLoader: true,
    source: 'mapbox.places',
    onSuggest: () => {},
    focusOnMount: false
  };

  state: State = {
    results: [],
    loading: false,
    searchTime: new Date(),
    value: ''
  };

  input: HTMLInputElement;

  storeInputReference = (autosuggest) => {
    if (autosuggest != null) {
      this.input = autosuggest.input;
    }
  };

  renderInput = (inputProps) => {
    const {classes, ref, ...other} = inputProps;
    const {showLoader, inputPaperProps} = this.props;
    return (
      <React.Fragment>
        <DebouncedProgressBar show={this.state.loading && showLoader} />
        <Paper
          square={false}
          elevation={1}
          className={classes.inputContainer}
          {...inputPaperProps}
        >
          <Grid container alignItems="center" spacing={8} wrap="nowrap">
            <Grid
              item
              xs
              className={classNames(classes.grow, classes.noShrink)}
            >
              <TextField
                fullWidth
                InputProps={{
                  inputRef: ref,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                  classes: {
                    input: classes.input
                  },
                  ...other
                }}
              />
            </Grid>
            {/* Unmount and mount releases space for TexField to grow AND show animation. */}
            <Fade
              in={this.state.value.length > 0}
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
                  onClick={this.handleClearInput}
                >
                  <CancelIcon />
                </IconButton>
              </Grid>
            </Fade>
          </Grid>
        </Paper>
      </React.Fragment>
    );
  };

  renderSuggestionsContainer = (options) => {
    const {containerProps, children} = options;
    const {suggestionsPaperProps} = this.props;
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

  focusInput = () => {
    if (this.input) this.input.focus();
  };

  componentDidMount() {
    if (this.props.focusOnMount) this.focusInput();
  }

  handleSuggestionsFetchRequested = ({value}) => {
    const {
      endpoint,
      source,
      accessToken,
      proximity,
      country,
      bbox,
      types,
      limit,
      autocomplete,
      language
    } = this.props;
    this.setState({loading: true});
    if (value === '') {
      this.setState({
        results: [],
        loading: false
      });
    } else {
      search(
        endpoint,
        source,
        accessToken,
        value,
        this.onResult,
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

  onResult = (err: any, res: ?$AxiosXHR<any>, searchTime: Date) => {
    const {onSuggest} = this.props;
    // searchTime is compared with the last search to set the state
    // to ensure that a slow xhr response does not scramble the
    // sequence of autocomplete display.
    if (
      !err &&
      res &&
      res.data &&
      res.data.features &&
      this.state.searchTime <= searchTime
    ) {
      this.setState({
        searchTime: searchTime,
        loading: false,
        results: res.data.features
          .map((feature) => ({
            feature: feature,
            label: feature.place_name
          }))
          .filter((feature) => feature.label)
      });
      onSuggest && onSuggest(this.state.results);
    }
  };

  /**
   * Parameters Signature:
   * (event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method})
   */
  handleSuggestionSelected = (event, {suggestion}) => {
    this.props.onSelect(suggestion.feature);
    // focus on the input after click to maintain key traversal
    // this.inputRef.current && this.inputRef.current.focus()
    return false;
  };

  render() {
    const {classes, inputPlaceholder, accessToken} = this.props;

    return accessToken ? (
      <Autosuggest
        ref={this.storeInputReference}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderInputComponent={this.renderInput}
        suggestions={this.state.results}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        onSuggestionSelected={this.handleSuggestionSelected}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        getSuggestionValue={getResultValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          classes,
          placeholder: inputPlaceholder,
          value: this.state.value,
          onChange: this.handleChange
        }}
      />
    ) : null;
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      results: []
    });
  };

  handleChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    });
  };

  handleClearInput = () => {
    this.setState({
      value: ''
    });
    // After clear button is clicked the input should be re-focused automatically.
    this.focusInput();
  };
}

function hexOpacity(color: string, transparency: string): string {
  color = color.replace(/#/g, '');
  if (color.length === 3) {
    color = color + color;
  }
  return `#${color}${transparency}`;
}

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

function getResultValue(result) {
  return result.label;
}

export default withStyles(matStyles)(MatGeocoder);
