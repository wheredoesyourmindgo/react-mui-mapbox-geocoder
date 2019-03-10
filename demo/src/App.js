// @flow
import React, {useState, useCallback} from 'react';
import MapGL, {NavigationControl, FlyToInterpolator} from 'react-map-gl';
import {easeCubic} from 'd3-ease';
// import MatGeocoder from 'react-mui-mapbox-geocoder';
// import for use with developing component from copy of source.
import MatGeocoder from './lib/MatGeocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import {withStyles} from '@material-ui/core/styles';
import './App.css';

type Props = {
  classes: any
};

const geocoderApiOptions = {
  country: 'us'
  // proximity: {longitude: -121.0681, latitude: 38.9197},
  // bbox: [-123.8501, 38.08, -117.5604, 39.8735]
};

const styles = {
  input: {
    backgroundColor: 'white',
    borderRadius: 3
  },
  textField: {
    width: '100%'
  }
};

const initialViewport = {
  width: window.innerWidth || 400,
  height: window.innerHeight || 400,
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 8
};

const Demo = ({classes}: Props) => {
  const [viewport, setViewport] = useState(initialViewport);

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
    [viewport]
  );

  const _onViewportChange = useCallback((viewport) => {
    setViewport(viewport);
  }, []);

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
            inputPlaceholder="Search Address"
            accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            onSelect={(result) => _handleGeocoderSelect(result)}
            showLoader={true}
            {...geocoderApiOptions}
            inputPaperProps={{square: true}}
            suggestionsPaperProps={{square: true}}
            // inputTextFieldProps={{
            //   variant: 'outlined',
            //   fullWidth: false,
            //   classes: {
            //     root: classes.textField
            //   }
            // }}
            // inputClasses={{root: classes.input}}
            // showInputContainer={false}
          />
        </div>
      </MapGL>
    </div>
  );
};

export default withStyles(styles)(Demo);
