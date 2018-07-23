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
	//var extent = [Number(urlParam('x')), Number(urlParam('y'))];
	//var zoom = Number(urlParam('z'));
	var type = urlParam('type');
	var harvested = decodeURIComponent(urlParam('harvested'));
	var planted = decodeURIComponent(urlParam('planted'));
	var product = decodeURIComponent(urlParam('product'));
	
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
        //if (extent instanceof Array) {}
		//else {extent = [-117.15, 34.05]}
		//if (!zoom) zoom = 13;
		
        view.center = [-117.15, 34.05];
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
         content: [{
           // type: "esriFieldTypeString",
           type: "fields",
           fieldInfos: [{            
             fieldName: "NAME",
             visible: true
           }, {
             fieldName: "WEBSITE",
             visible: true
           }]
         }]
       };

	   
        var farms = new FeatureLayer({
          url: "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/Farm2Table_PublicView/FeatureServer/0",
          title: "Local Food Product", 
          outFields: ["*"],
          popupTemplate: template,
		  
		  //portalItem{
		//	  id: "6e79187b93a3452c904208b84fdca75d"
		  //},
		  //layerId: 0,
	definitionExpression: wherefarm
        });

        var businesses = new FeatureLayer({
          url: "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/Farm2Table_PublicView/FeatureServer/1",
          title: "Local Businesses/Restaurants", 
          outFields: ["*"],
		  popupTemplate: template,
	definitionExpression: wherebusiness

        });
        
        var farm2table = new FeatureLayer({
          url: "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/Farm2Table_Routes_PublicView/FeatureServer/0",
          title: "Routes", 
          outFields: ["*"],
          definitionExpression: whereroute
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

		var listElement = document.createElement('div');
 
      // Add it to the page
      listContainer.appendChild(listElement);
      document.getElementById("listContainer").appendChild(listElement);
	  	
	  	// THE FOLLOWING IS A URL FOR PULLING ROUTE INFO. Ideally it would be dynamically (iterative loop through the farm or business results) created using the routing API so I don't have to worry about the 1:many or many:1 matches.
	  	// routeInfoURL = "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/Farm2Table_Routes_PublicView/FeatureServer/0/query?where=" + whereroute + "&outFields=*&returnGeometry=true&f=pjson";
	  	
	  	if(type="farm" || type="item") listURL = "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/ArcGIS/rest/services/Farm2Table_PublicView/FeatureServer/0/query?where=" + wherefarm + "&outFields=*&returnGeometry=true&f=pjson";
		else if(type="business") listURL = "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/ArcGIS/rest/services/Farm2Table_PublicView/FeatureServer/0/query?where=" + wherebusiness + "&outFields=*&returnGeometry=true&f=pjson";
        
        esriRequest(listURL, {
        responseType: "json"
      }).then(function makeList(response){
        // The requested data
       // console.log(response.data.features[]); 
      //  var listContainer = document.createElement('div');

       // Add it to the page
      //  document.getElementsByTagName('body')[0].appendChild(listContainer);
   
       
        for(x in response.data.features){
          var listItem = document.createElement('p');
       listItem.setAttribute("class", "content");

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
         var productImg1 = response.data.features[x].attributes.PRODUCT1_IMGURL;
         var productImg2 = response.data.features[x].attributes.PRODUCT2_IMGURL;
    	 var productImg3 = response.data.features[x].attributes.PRODUCT3_IMGURL;
		 
		 
		 if(type="item" && product != "" && planted != "" && harvested != "") listItem.innerHTML = "Your <b>" + product + "</b> was planted: " + planted + " and harvested: " + harvested + " from " + name + ".<br>";
		 else if(type != "item") listItem.innerHTML = "";
		 if(productImg1) listItem.innerHTML = listItem.innerHTML + '<img style="width: 100%; max-height: 200px;" src="' + productImg1 + '" /> <br>';
         else if(!productImg1) listItem.innerHTML = listItem.innerHTML;
         if(name) listItem.innerHTML = listItem.innerHTML + "<b>" + name + "</b> <br>"; 
         else if(!name) listItem.innerHTML = listItem.innerHTML;
         if(featured) listItem.innerHTML = listItem.innerHTML + "<i>" + featured + "</i> <br>"; 
         else if(!featured) listItem.innerHTML = listItem.innerHTML;
         if(d1) listItem.innerHTML = listItem.innerHTML + d1 + "<br>"; 
         else if(!d1) listItem.innerHTML = listItem.innerHTML;
         if(d2) listItem.innerHTML = listItem.innerHTML + d2 + "<br>";
         else if(!d2) listItem.innerHTML = listItem.innerHTML;
         if(d3) listItem.innerHTML = listItem.innerHTML + d3 + "<br>"; 
         else if(!d3) listItem.innerHTML = listItem.innerHTML;  
         
         if(address) listItem.innerHTML = listItem.innerHTML + "Contact Us: " + address; 
         if(city) listItem.innerHTML = listItem.innerHTML +  ", " + city;  
         if(state) listItem.innerHTML = listItem.innerHTML + ", " + state + "<br>";
         else if(!state) listItem.innerHTML = listItem.innerHTML + "<br>"; 
         
         //listItem.innerHTML = listItem.innerHTML + "For more Info:"; 
         if(contact_name) listItem.innerHTML = listItem.innerHTML + contact_name + " | ";
         if(contact_phone) listItem.innerHTML = listItem.innerHTML + contact_phone;
        // Add listItem to the listElement
        listElement.appendChild(listItem); 
        }
        //document.getElementById("farms").innerHTML = txt;
      });
      // makeList(); 

    }
);