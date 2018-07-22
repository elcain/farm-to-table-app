// used to load all the required modules
require([
    "esri/request",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/TileLayer",
    "esri/layers/FeatureLayer",
    "dojo/dom",
    "dojo/on",
    "dojo/domReady!"
    ], function(esriRequest, Map, MapView, TileLayer, FeatureLayer, dom, on) {
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
          popupTemplate: template
        });

        var businesses = new FeatureLayer({
          url: "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/Farm2Table_PublicView/FeatureServer/1",
          title: "2", 

        });

        // var farm2table3 = new FeatureLayer({
        //   url: "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/ArcGIS/rest/services/Farm2Table_Routes_PublicView/FeatureServer/0",
        //   title: "3", 
        // });

        var farm2table = new FeatureLayer({
          url: "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/Farm2Table_Routes_PublicView/FeatureServer/0",
          title: "4", 
          definitionExpression: "DestinationOID = 6 AND OriginOID = 113"
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

        var url = "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/ArcGIS/rest/services/Farm2Table_PublicView/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&f=pjson"; 
        esriRequest(url, {
        responseType: "json"
      }).then(function makeList(response){
        // The requested data
       // console.log(response.data.features[]); 
      //  var listContainer = document.createElement('div');

       // Add it to the page
      //  document.getElementsByTagName('body')[0].appendChild(listContainer);
   
       // Make the list
       var listElement = document.createElement('div');
   
       // Add it to the page
       listContainer.appendChild(listElement);
       document.getElementById("listContainer").appendChild(listElement);
        for(x in response.data.features){
          // create an item for each one
        var listItem = document.createElement('p');

        // Add the item text
        //listItem.innerHTML = 
         var name = response.data.features[x].attributes.NAME;
         var featured = response.data.features[x].attributes.FEATURED; 
         var d1 = response.data.features[x].attributes.DESC_1;
         var d2 = response.data.features[x].attributes.DESC_2; 
         var d3 = response.data.features[x].attributes.DESC_3; 
         var address = response.data.features[x].attributes.ADDRESS; 
         var city = response.data.features[x].attributes.CITY; 
         var state = response.data.features[x].attributes.STATE; 
         var contact_name = response.data.features[x].attributes.CONTACT_NAME; 
         var contact_phone = response.data.features[x].attributes.CONTACT_PHONE; 

         if(name) listItem.innerHTML = "Title: " + name; 
         if(featured) listItem.innerHTML = listItem.innerHTML + featured + "<br>"; 
         if(d1) listItem.innerHTML = listItem.innerHTML + d1 + "<br>"; 
         if(d2) listItem.innerHTML = listItem.innerHTML + d2 + "<br>"; 
         if(d3) listItem.innerHTML = listItem.innerHTML + d3 + "<br>"; 
         else if(!d3) listItem.innerHTML = listItem.innerHTML + "<br>"; 
         
         if(address) listItem.innerHTML = listItem.innerHTML + "Come visit us: " + address; 
         if(city) listItem.innerHTML = listItem.innerHTML +  ", " + city;  
         if(state) listItem.innerHTML = listItem.innerHTML + ", " + state + "<br>";
         else if(!state) listItem.innerHTML = listItem.innerHTML + "<br>"; 

         //For More Info: {CONTACT_NAME} {CONTACT_PHONE} or Click Here (CLICK HERE WOULD BE THE WEBSITE ADDRESS LINK) 
         listItem.innerHTML = listItem.innerHTML + "For more Info:"; 
         if(contact_name) listItem.innerHTML = listItem.innerHTML + contact_name;
         if(contact_phone) listItem.innerHTML = listItem.innerHTML + 
        // Add listItem to the listElement
        listElement.appendChild(listItem); 
        }
        //document.getElementById("farms").innerHTML = txt;
      });
      // makeList(); 
    }
);
