import React, { Component } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Quakes from "./components/Quakes";
import MapContainer from "./components/Map";
import Navbar from "./components/Navbar";
import { getQueryString } from "./utils";
import "./App.css";


const URL = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quakesData: [],
      timeframe: "",
      magnitude: "",
      error: null,
      isLoaded: false,
    };
  }
  componentDidMount() {
    axios
      .get(URL)
      .then((response) => {
        this.setState({ quakesData: response.data.features });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // setState for magnitutde/timeframe on option/select input chnage
  magnitudeHandler = (e) => {
    this.setState({ magnitude: e.target.value });
  };
  timeframeHandler = (e) => {
    this.setState({ timeframe: e.target.value });
  };
  // Make API call
  submitHandler = (e) => {
    e.preventDefault();

    let [startTime, endTime, minmag] = getQueryString(
      this.state.magnitude,
      this.state.timeframe
    );

    const api_url = `https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=${startTime}&endtime=${endTime}&minmagnitude=${minmag}&orderby=magnitude&limit=100`;
    axios
      .get(api_url)
      .then((response) => {
        this.setState({ quakesData: response.data.features });
      })
      .catch((error) => {
        this.setState({ error });
        // console.log(error);
      });
  };

  render() {
    const quakes = this.state.quakesData.map((data) => {
      return <Quakes key={uuidv4()} data={data} />;
    });
    // Check state to determine time frame and use below to return values for start and end date
    const startDate = new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 7
    ).toLocaleDateString();
    const endDate = new Date(Date.now()).toLocaleDateString();
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    } else {
      return (
        <div className="app">
          <Navbar
            magnitudeHandler={this.magnitudeHandler}
            timeframeHandler={this.timeframeHandler}
            submitHandler={this.submitHandler}
            data={this.state.quakesData}
          />
          <div className="main-content-div">
            <div className="mapContainer">
              <MapContainer data={this.state.quakesData} />
            </div>
            <div className="quakeContainer">
              <div>
                {/* <h2>
                  {this.state.quakesData.length > 0
                    ? `${startDate} - ${endDate}`
                    : "Select a Timeframe and Magnitude"}
                </h2> */}
                <div>
                  <h2 className="quake-count">
                    {this.state.quakesData.length}
                  </h2>
                  <p>earthquakes</p>
                </div>
              </div>
              <div id="info">{quakes}</div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
