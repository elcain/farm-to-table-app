// used to load all the required modules
require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/TileLayer",
    "esri/layers/FeatureLayer",
    "dojo/dom",
    "dojo/on",
    "dojo/domReady!"
    ], function(Map, MapView, TileLayer, FeatureLayer, dom, on) {
        // Code to create the map and view will go here

        var myMap = new Map({
          basemap: "streets" // satellite, hybrid, topo, gray, dark-gray, oceans, osm, national-geographic
        });

        // Create a MapView instance (for 2D viewing) and reference the map instance
        var view = new MapView({
          container: "localfoodie",  // Reference to the DOM node that will contain the view
          map: myMap
        });

        // Set the center and zoom level on the view
        // view.center = [-95, 38];  // Sets the center point of the view at a specified lon/lat
        view.center = [-93, 41];
        view.zoom = 8;  // Sets the zoom LOD to 13

        // view.when(function(){
        //   // All the resources in the MapView and the map have loaded. Now execute additional processes

        // }, function(error){
        //   // Use the errback function to handle when the view doesn't load properly
        //   console.log("The view's resources failed to load: ", error);
        // });

        var farm2table = new FeatureLayer({
          url: "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/Farm2Table_PublicView/FeatureServer/0",
          title: "Local Food Product",
        });

        myMap.layers.add(farm2table);

        // Create a variable referencing the checkbox node
        var streetsLayerToggle = dom.byId("streetsLayer");

        // Listen to the onchange event for the checkbox
        on(streetsLayerToggle, "change", function(){
          // When the checkbox is checked (true), set the layer's visibility to true
          farm2table.visible = streetsLayerToggle.checked;
        });

        // var highlight;
        // view.whenLayerView(treesLayer).then(function(layerView){
        // var query = treesLayer.createQuery();
        // query.where = "type = 'Quercus'";
        // treesLayer.queryFeatures(query).then(function(result){
        //     if (highlight) {
        //       highlight.remove();
        //     }
        //     highlight = layerView.highlight(result.features);
        //   })
        // });
    }
);
