require(["esri/request"], function(esriRequest) 
{ 
    var url = "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/ArcGIS/rest/services/Farm2Table_PublicView/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&f=pjson"; 
    esriRequest(url, {
        responseType: "json"
      }).then(function makeList(response){
        // The requested data
       // console.log(response.data.features[]); 
       var listContainer = document.createElement('div');

       // Add it to the page
       document.getElementsByTagName('body')[0].appendChild(listContainer);
   
       // Make the list
       var listElement = document.createElement('ul');
   
       // Add it to the page
       listContainer.appendChild(listElement);
        for(x in response.data.features){
          // create an item for each one
        var listItem = document.createElement('li');

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
      makeList(); 
    }); 