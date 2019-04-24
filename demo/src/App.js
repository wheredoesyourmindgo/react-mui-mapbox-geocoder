import React, {useState, useCallback} from 'react';
import MapGL, {NavigationControl, FlyToInterpolator} from 'react-map-gl';
import {easeCubic} from 'd3-ease';
// import MatGeocoder from 'react-mui-mapbox-geocoder';
// import for use with developing component from copy of source.
// import MatGeocoder from './lib/MatGeocoder';
// import for use with developing component from local copy of dist.
import MatGeocoder from './lib';
import 'mapbox-gl/dist/mapbox-gl.css';
import {withStyles} from '@material-ui/core/styles';
import './App.css';

const geocoderApiOptions = {
  country: 'us'
  // proximity: {longitude: -121.0681, latitude: 38.9197},
  // bbox: [-123.8501, 38.08, -117.5604, 39.8735]
};

const styles = {
  input: {
    // backgroundColor: 'white',
    borderRadius: 4,
    '&$cssFocused $notchedOutline': {
      borderColor: 'green'
    }
  },
  notchedOutline: {},
  cssFocused: {},
  textField: {
    // backgroundColor: 'blue',
  }
};

const initialViewport = {
  width: window.innerWidth || 400,
  height: window.innerHeight || 400,
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 8
};

const Demo = ({classes}) => {
  const [viewport, setViewport] = useState(initialViewport);

  const _onViewportChange = useCallback((viewport) => {
    setViewport(viewport);
  }, []);

  const _handleGeocoderSelect = useCallback(
    (result) => {
      const newViewport = {
        ...viewport,
        longitude: result.center[0],
        latitude: result.center[1],
        zoom: 18,
        transitionDuration: 4000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic
      };
      _onViewportChange(newViewport);
    },
    [viewport, _onViewportChange]
  );

  return (
    <div className="App">
      <MapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={_onViewportChange}
      >
        <div className="navControls">
          <NavigationControl onViewportChange={_onViewportChange} />
        </div>

        <div className="geocoder">
          <MatGeocoder
            focusOnMount
            inputPlaceholder="Search Address"
            accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            onSelect={(result) => _handleGeocoderSelect(result)}
            showLoader={true}
            {...geocoderApiOptions}
            inputPaperProps={{square: true}}
            suggestionsPaperProps={{square: true}}
            inputTextFieldProps={{
              variant: 'outlined',
              fullWidth: true,
              classes: {
                root: classes.textField,

                notchedOutline: classes.notchedOutline,
                focused: classes.focused
              }
            }}
            showInputContainer={false}
            // inputTextFieldProps={{
            //   variant: 'outlined',
            //   fullWidth: false,
            //   classes: {
            //     root: classes.textField
            //   }
            // }}
            // inputClasses={{root: classes.input}}
            inputClasses={{
              root: classes.input,
              notchedOutline: classes.notchedOutline,
              focused: classes.cssFocused
            }}
            // showInputContainer={false}
          />
        </div>
      </MapGL>
    </div>
  );
};

export default withStyles(styles)(Demo);
