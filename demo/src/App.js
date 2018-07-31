import React, {Component} from 'react';
import MapGL, {NavigationControl, FlyToInterpolator} from 'react-map-gl';
import {easeCubic} from 'd3-ease';
// import MatGeocoder from 'react-mui-mapbox-geocoder/dist/src';
// import for use with developing component from copy of source.
import MatGeocoder from './lib/MatGeocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';

const geocoderApiOptions = {
  country: 'us',
  proximity: {longitude: -121.0681, latitude: 38.9197},
  bbox: [-123.8501, 38.08, -117.5604, 39.8735]
};

class Demo extends Component {
  state = {
    viewport: {
      width: window.innerWidth || 400,
      height: window.innerHeight || 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  };

  _handleGeocoderSelect = (result) => {
    const viewport = {
      ...this.state.viewport,
      longitude: result.center[0],
      latitude: result.center[1],
      zoom: 18,
      transitionDuration: 4000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic
    };
    this._onViewportChange(viewport);
  };

  _onViewportChange = (viewport) => {
    this.setState({viewport});
  };

  render() {
    return (
      <div className="App">
        <MapGL
          {...this.state.viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          onViewportChange={this._onViewportChange}
        >
          <div className="navControls">
            <NavigationControl onViewportChange={this._onViewportChange} />
          </div>

          <div className="geocoder">
            <MatGeocoder
              inputPlaceholder="Search Address"
              accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              onSelect={(result) => this._handleGeocoderSelect(result)}
              showLoader={true}
              {...geocoderApiOptions}
              inputPaperProps={{square: true}}
              suggestionsPaperProps={{square: true}}
            />
          </div>
        </MapGL>
      </div>
    );
  }
}

export default Demo;
