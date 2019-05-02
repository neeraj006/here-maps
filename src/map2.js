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
    var pixelRatio = window.devicePixelRatio || 1;
    var defaultLayers = platform.createDefaultLayers({
      tileSize: pixelRatio === 1 ? 256 : 512,
      ppi: pixelRatio === 1 ? undefined : 320
    });

    var map = new window.H.Map(
      document.getElementById("map"),
      defaultLayers.normal.map,
      {
        // initial center and zoom level of the map
        center: new window.H.geo.Point(28.6304, 77.2177),
        zoom: 17,
        pixelRatio: pixelRatio
      }
    );

    // var defaultLayers = platform.createDefaultLayers();

    // // Add metaInfo layer to the map:
    // map.addLayer(defaultLayers.normal.metaInfo);

    // // Store a reference to the metaInfo TileProvider:
    // var tileProvider = defaultLayers.normal.metaInfo.getProvider();

    // // Subscribe to tap events on all objects of the metaInfo provider:
    // tileProvider.addEventListener("tap", function(e) {
    //   // Save a reference to the clicked spatial object:
    //   var spatial = e.target;

    //   // Output meta data for the spatial object to the console:
    //   console.log(spatial.getData());
    // });

    var behavior = new window.H.mapevents.Behavior(
      new window.H.mapevents.MapEvents(map)
    );
    // Step 4: Create the default UI:
    var ui = window.H.ui.UI.createDefault(map, defaultLayers, "en-US");

    var metainfoService = platform.getMetaInfoService();

    // Create a tile layer with an empty array (this means all categories are included filtered out categories:
    var metainfoLayer = metainfoService.createTileLayer(
      /**tile size*/ 256,
      /** tile pixel ratio*/ 1,
      []
    );
    console.log("metadata", metainfoLayer);
    // Add the Metainfo layer to the map:
    map.addLayer(metainfoLayer);

    const maptypes = platform.createDefaultLayers(
      256,
      160,
      false,
      false,
      null,
      /*pois*/ true
    );

    // Add metainfo layer to the map:
    map.addLayer(maptypes.normal.metaInfo);

    // Store a reference to the metaInfo TileProvider:
    var tileProvider = maptypes.normal.metaInfo.getProvider();

    // Add a listener for pointerdown events -- it displays an info bubble with the POI
    // name when the map user clicks on the POI:
    tileProvider.addEventListener("pointerdown", function(e) {
      // Get the spatial object on which the user clicked:
      var spatial = e.target,
        // Get the meta data for the object:
        metadata = spatial.getData(),
        // Translate the screen coordinates of the click to lat/lon:
        coord = map.screenToGeo(
          e.currentPointer.viewportX,
          e.currentPointer.viewportY
        );

      // Display an info bubble with the name of the object at the location of the click:
      if (true || metadata.category === "POIs") {
        console.log(metadata.category, "cat");
        var bubble = new window.H.ui.InfoBubble(coord, {
          content: metadata.name
        });
        ui.addBubble(bubble);
      }
    });

    // addVenueLayer(map, platform, renderControls);

    // function renderControls(title, buttons) {
    //   var containerNode = document.createElement("div");

    //   containerNode.innerHTML =
    //     '<h4 class="title">' + title + '</h4><div class="btn-group"></div>';
    //   containerNode.setAttribute(
    //     "style",
    //     "position:absolute;top:0;left:0;background-color:#fff; padding:10px;text-align:center"
    //   );

    //   Object.keys(buttons).forEach(function(label) {
    //     var input = document.createElement("input");
    //     input.value = label;
    //     input.type = "button";
    //     input.onclick = buttons[label];
    //     input.className = "btn btn-sm btn-default";
    //     containerNode.lastChild.appendChild(input);
    //   });

    //   map.getElement().appendChild(containerNode);
    // }

    // function addVenueLayer(map, platform, renderControls) {
    //   // Create a tile layer, which will display venues
    //   var customVenueLayer = platform.getVenueService().createTileLayer({
    //     // Provide a callback that will be called for each newly created space
    //     onSpaceCreated: onSpaceCreated
    //   });

    //   // Get TileProvider from Venue Layer
    //   var venueProvider = customVenueLayer.getProvider();
    //   // Add venues layer to the map
    //   map.addLayer(customVenueLayer);

    //   // Use the custom function (i.e. not a part of the API)
    //   // to render buttons with corresponding click callbacks
    //   renderControls("Change floor", {
    //     "+1 Level": function() {
    //       // Increase global floor level on the venue provider
    //       venueProvider.setCurrentLevel(venueProvider.getCurrentLevel() + 1);
    //     },
    //     "-1 Level": function() {
    //       // Decrease global floor level on the venue provider
    //       venueProvider.setCurrentLevel(venueProvider.getCurrentLevel() - 1);
    //     }
    //   });
    // }

    // function onSpaceCreated(space) {
    //   // getData for spaces contains data from the Venue Interaction Tile API,
    //   // see https://developer.here.com/rest-apis/documentation/venue-maps/topics/resource-type-venue-interaction-tile.html
    //   if (space.getData().preview === "H&M") {
    //     space.setStyle({
    //       fillColor: "rgba(0,255,0,0.3)"
    //     });
    //   }
    // }
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
