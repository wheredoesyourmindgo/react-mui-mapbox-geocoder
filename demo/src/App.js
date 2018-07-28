import React, {Component} from 'react';
import MapGL, {NavigationControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MatGeocoder from 'react-mui-mapbox-geocoder';
// import MatGeocoder from 'react-mui-mapbox-geocoder-src/MatGeocoder';

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

  _onViewportChange = (viewport) => {
    this.setState({viewport});
  };

  render() {
    return (
      <MapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        {...this.state.viewport}
        onViewportChange={this._onViewportChange}
      >
        <div style={{position: 'absolute', left: 10, bottom: 10}}>
          <NavigationControl onViewportChange={this._onViewportChange} />
        </div>
      </MapGL>
    );
  }
}

export default Demo;
