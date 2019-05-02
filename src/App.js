import React, { Component } from "react";
import "./App.css";
import Map from "./map";
import Map2 from "./map2";

class App extends Component {
  componentDidMount() {
    var platform = new window.H.service.Platform({
      app_id: "XgZsVTfSK6Z2ox4YJPa0",
      app_code: "xXePigxOBorFbcC-wxqnow"
    });
    var defaultLayers = platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    var map = new window.H.Map(
      document.getElementById("mapContainer"),
      defaultLayers.normal.map,
      {
        zoom: 10,
        center: { lat: 52.5, lng: 13.4 }
      }
    );
    // Create the parameters for the routing request:
    var routingParameters = {
      // The routing mode:
      mode: "fastest;car",
      // The start point of the route:
      waypoint0: "geo!28.4277856,77.14265639999999",
      // The end point of the route:
      waypoint1: "geo!28.5524,76.90470000000005",
      // To retrieve the shape of the route we choose the route
      // representation mode 'display'
      representation: "display"
    };

    // Define a callback function to process the routing response:
    var onResult = function(result) {
      var route, routeShape, startPoint, endPoint, linestring;
      if (result.response.route) {
        // Pick the first route from the response:
        route = result.response.route[0];
        // Pick the route's shape:
        routeShape = route.shape;

        // Create a linestring to use as a point source for the route line
        linestring = new window.H.geo.LineString();

        // Push all the points in the shape into the linestring:
        routeShape.forEach(function(point) {
          var parts = point.split(",");
          linestring.pushLatLngAlt(parts[0], parts[1]);
        });

        // Retrieve the mapped positions of the requested waypoints:
        startPoint = route.waypoint[0].mappedPosition;
        endPoint = route.waypoint[1].mappedPosition;

        // Create a polyline to display the route:
        var routeLine = new window.H.map.Polyline(linestring, {
          style: { lineWidth: 10 },
          arrows: { fillColor: "white", frequency: 2, width: 0.8, length: 0.7 }
        });

        // Create a marker for the start point:
        var startMarker = new window.H.map.Marker({
          lat: startPoint.latitude,
          lng: startPoint.longitude
        });

        // Create a marker for the end point:
        var endMarker = new window.H.map.Marker({
          lat: endPoint.latitude,
          lng: endPoint.longitude
        });

        // Add the route polyline and the two markers to the map:
        map.addObjects([routeLine, startMarker, endMarker]);

        // Set the map's viewport to make the whole route visible:
        map.setViewBounds(routeLine.getBounds());
      }
    };

    // Get an instance of the routing service:
    var router = platform.getRoutingService();

    // Call calculateRoute() with the routing parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    router.calculateRoute(routingParameters, onResult, function(error) {
      alert(error.message);
    });
  }

  render() {
    return (
      <div>
        <div className="mapContainer" id="mapContainer" />
        <Map />
        <Map2 />
      </div>
    );
  }
}

export default App;
