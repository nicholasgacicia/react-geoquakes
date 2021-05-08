import React from "react";
import icon from "../images/earthquake.png";

function Navbar(props) {
  return (
    <div className="navbar">
      <div className="logo-title">
        <img className="quake-icon" src={icon} alt="quake icon" />
        <h1>Geoquakes</h1>
      </div>
      <form action="/" method="get">
        <div className="form-input">
          <label htmlFor="magnitude">Magnitude</label>
          <select
            name="magnitude"
            id="magnitude"
            onChange={props.magnitudeHandler}
          >
            <option value="1">1+</option>
            <option value="2.5">2.5+</option>
            <option value="4.5">4.5+</option>
            <option value="significant">significant</option>
          </select>
        </div>
        <div className="form-input">
          <label htmlFor="timeframe">Timeframe</label>
          <select
            name="timeframe"
            id="timeframe"
            onChange={props.timeframeHandler}
          >
            <option value="hour">the past hour</option>
            <option value="day">the past day</option>
            <option value="week">the past week</option>
            <option value="month">the past month</option>
            <option value="all-time">all time</option>
          </select>
        </div>
        <input type="submit" value="search" onClick={props.submitHandler} />
      </form>
    </div>
  );
}

export default Navbar;
