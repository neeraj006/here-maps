import React, { Component } from "react";

const divStyle = {
  width: "100%",
  height: "400px",
  marginTop: "20px",
  background: "grey"
};

class Map extends Component {
  componentDidMount() {
    var platform = new window.H.service.Platform({
      app_id: "XgZsVTfSK6Z2ox4YJPa0",
      app_code: "xXePigxOBorFbcC-wxqnow"
    });

    // Instantiate a map inside the DOM element with id map. The
    // map center is in Rajeev chowk delhi, the zoom level is 10:

    var maptypes = platform.createDefaultLayers(
      256,
      160,
      false,
      false,
      null,
      /*pois*/ true
    );

    var map = new window.H.Map(
      document.getElementById("map"),
      maptypes.normal.map,
      {
        center: { lat: 28.65381, lng: 77.22897 },
        zoom: 15
      }
    );
  }

  render() {
    return (
      <div>
        <div id="map" style={divStyle} />
      </div>
    );
  }
}

export default Map;
