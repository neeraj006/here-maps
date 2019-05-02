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
      document.getElementById("map2"),
      maptypes.normal.map,
      {
        center: { lat: 28.65381, lng: 77.22897 },
        zoom: 15
      }
    );

    // Create a group object to hold map markers:
    var group = new window.H.map.Group();

    // Create the default UI components:
    var ui = window.H.ui.UI.createDefault(map, platform.createDefaultLayers());

    // Add the group object to the map:
    map.addObject(group);

    // Obtain a Search object through which to submit search
    // requests:
    var search = new window.window.H.places.Search(platform.getPlacesService()),
      searchResult,
      error;

    // Define search parameters:
    var params = {
      // Plain text search for places with the word "hotel"
      // associated with them:
      q: "hotel",
      //  Search in the Chinatown district in San Francisco:
      at: "28.65381,77.22897"
    };

    // Define a callback function to handle data on success:
    function onResult(data) {
      addPlacesToMap(data.results);
    }

    // Define a callback function to handle errors:
    function onError(data) {
      error = data;
    }

    // This function adds markers to the map, indicating each of
    // the located places:
    function addPlacesToMap(result) {
      group.addObjects(
        result.items.map(function(place) {
          var marker = new window.H.map.Marker({
            lat: place.position[0],
            lng: place.position[1]
          });
          return marker;
        })
      );
    }

    // Run a search request with parameters, headers (empty), and
    // callback functions:
    search.request(params, {}, onResult, onError);
  }

  render() {
    return (
      <div>
        <div id="map2" style={divStyle} />
      </div>
    );
  }
}

export default Map;
