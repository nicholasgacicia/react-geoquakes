import React from "react";
import { GoogleApiWrapper, Map, InfoWindow, Marker } from "google-maps-react";
import { v4 as uuidv4 } from "uuid";
import icon from "../images/earthquake.png";


const API_KEY = `AIzaSyDq9Qg59ppIwA5vsoGWMRnNfzw75xn7N_I`;

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }
  markerClickHandler = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };
  mapClickHandler = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  render() {
    const google = window.google;
    const mapStyle = {
      position: "relative",
      width: "90%",
      height: "90%",
    };
    const quakeMarkers = this.props.data.map((quake) => {
      let markerSize;
      if (quake.properties.mag < 4) {
        markerSize = new google.maps.Size(15, 15);
      } else if (quake.properties.mag < 6) {
        markerSize = new google.maps.Size(25, 25);
      } else if (quake.properties.mag < 8) {
        markerSize = new google.maps.Size(35, 35);
      } else {
        markerSize = new google.maps.Size(50, 50);
      }
      return (
        <Marker
          onClick={this.markerClickHandler}
          title={quake.properties.title}
          name={quake.properties.title}
          position={{
            lat: quake.geometry.coordinates[1],
            lng: quake.geometry.coordinates[0],
          }}
          icon={{
            url: icon,
            scaledSize: markerSize,
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0),
          }}
          key={uuidv4()}
        />
      );
    });
    return (
      <Map
        style={mapStyle}
        google={this.props.google}
        zoom={2}
        initialCenter={{ lat: 47.6, lng: -122.3 }}
      >
        {quakeMarkers}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div className="info">
            <p>{this.state.selectedPlace.name}</p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY,
})(MapContainer);
