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
    
        // Setup URL Parameter
        var urlParam = function(name, w){
    	w = w || window;
   		var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
        val = w.location.search.match(rx);
    	return !val ? '':val[1];
		}
		
	var whereroute = decodeURIComponent(urlParam('route'));
	var wherefarm = decodeURIComponent(urlParam('farm'));
	var wherebusiness = decodeURIComponent(urlParam('business'));
	
	// 
        
        // Code to create the map and view will go here

        var myMap = new Map({
          basemap: "streets", // satellite, hybrid, topo, gray, dark-gray, oceans, osm, national-geographic
        });

        // Create a MapView instance (for 2D viewing) and reference the map instance
        var view = new MapView({
          container: "localfoodie",  // Reference to the DOM node that will contain the view
          map: myMap
        });

        // Set the center and zoom level on the view
        // view.center = [-95, 38];  // Sets the center point of the view at a specified lon/lat
        view.center = [-117.18, 34.08];
        view.zoom = 13;  // Sets the zoom LOD to 13

        // view.when(function(){
        //   // All the resources in the MapView and the map have loaded. Now execute additional processes

        // }, function(error){
        //   // Use the errback function to handle when the view doesn't load properly
        //   console.log("The view's resources failed to load: ", error);
        // });

        var template = {
          title: "Farm Info",
          location: event.mapPoint, // Set the location of the popup to the clicked location
          content: "{NAME}"
          // content: [
          //   {
          //     name: "{NAME}", 
          //     city: "{CITY}", 
          //     state: "{STATE}", 
          //     contact: "{CONTACT_PHONE}", 
          //     speciality: "{FEATURED}"
          //   }
          // ]
        };

        var farms = new FeatureLayer({
          url: "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/Farm2Table_PublicView/FeatureServer/0",
          title: "Local Food Product", 
          popupTemplate: template,
	definitionExpression: wherefarm
        });

        var businesses = new FeatureLayer({
          url: "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/Farm2Table_PublicView/FeatureServer/1",
          title: "2", 
	definitionExpression: wherebusiness

        });

        // var farm2table3 = new FeatureLayer({
        //   url: "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/ArcGIS/rest/services/Farm2Table_Routes_PublicView/FeatureServer/0",
        //   title: "3", 
        // });

        var farm2table = new FeatureLayer({
          url: "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/Farm2Table_Routes_PublicView/FeatureServer/0",
          title: "4", 
          definitionExpression: whereroute
          // definitionExpression: "DestinationOID = 6 AND OriginOID = 113"
        });

        

        myMap.layers.add(farm2table);
        myMap.layers.add(farms);
        myMap.layers.add(businesses);

        // view.on("click", function(event) {
        //   setTimeout(()=> {view.hitTest(event).then(test)}, 8000); 
        // });

        function test(response) {
          if(response.results.length !== 0) {
            console.log("Hey you clicked me!");
            window.open("https://localhost:3344/webappbuilder/apps/2/");
          }
        }
      
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
