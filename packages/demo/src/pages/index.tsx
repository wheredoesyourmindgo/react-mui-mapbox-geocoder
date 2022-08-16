import React, {useCallback, useRef} from 'react';
import MapGL, {NavigationControl, MapRef} from 'react-map-gl';
import {Box} from '@mui/material';
// import for use with developing component from local copy of dist.
import MatGeocoder from '../lib/pkg';

type GeocoderResult = {
  bbox: [number, number, number, number];
  center: [number, number];
  place_name: string;
  place_type: string[];
  relevance: number;
  text: string;
  address: string;
  context: any[];
} & GeoJSON.Feature<GeoJSON.Point>;

const geocoderApiOptions = {
  country: 'us',
  // proximity: {longitude: -121.0681, latitude: 38.9197},
  // bbox: [-123.8501, 38.08, -117.5604, 39.8735]
};

// const useStyles = makeStyles({
//   input: {
//     // backgroundColor: 'white',
//     borderRadius: 4,
//     '&$cssFocused $notchedOutline': {
//       borderColor: 'green'
//     }
//   },
//   notchedOutline: {},
//   cssFocused: {},
//   textField: {
//     // backgroundColor: 'blue',
//   }
// });

const initialViewport = {
  width: '100vw',
  height: '100vh',
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 8,
};

const IndexPage = () => {
  // const classes = useStyles();
  const mapRef = useRef<MapRef>(null);

  const _handleGeocoderSelect = useCallback(({center}: GeocoderResult) => {
    mapRef.current?.flyTo({
      zoom: 18,
      duration: 4000,
      center,
    });
  }, []);

  return (
    <div className="App">
      <MapGL
        initialViewState={initialViewport}
        mapboxAccessToken={
          process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_ACCESS_TOKEN ?? ''
        }
      >
        <div className="navControls">
          <NavigationControl />
        </div>

        <Box className="geocoder" width={300}>
          <MatGeocoder
            disableUnderline
            focusOnMount
            inputPlaceholder="Search for Address"
            inputValue="12345 A Street"
            accessToken={
              process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_ACCESS_TOKEN ?? ''
            }
            onSelect={(result) => _handleGeocoderSelect(result)}
            showLoader={true}
            {...geocoderApiOptions}
            inputPaperProps={{square: false}}
            suggestionsPaperProps={{square: true}}
            // inputTextFieldProps={{
            //   variant: 'outlined',
            //   fullWidth: true,
            //   classes: {
            //     root: classes.textField,
            //     notchedOutline: classes.notchedOutline,
            //     focused: classes.focused
            //   }
            // }}
            // inputClasses={{
            //   root: classes.input,
            //   notchedOutline: classes.notchedOutline,
            //   focused: classes.cssFocused
            // }}
            // showInputContainer={false}
          />
        </Box>
      </MapGL>
    </div>
  );
};

export default IndexPage;
