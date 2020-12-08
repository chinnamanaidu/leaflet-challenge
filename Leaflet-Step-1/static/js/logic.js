//var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


var newYorkCoords = [-115.814, 32.7488333];
var mapZoomLevel = 8;

// Create the createMap function

// Creating map object

// Adding tile layer

// Load in GeoJson data
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//var tecPlates = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

//var tecPlates = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
var myMap = L.map("map", {
    center: [32.7488333,-115.814],
    zoom: mapZoomLevel
   });

var geojson;
//d3.json(geoData, creaetMarkers);
var satelite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

//.addTo(myMap);
// Streetmap Layer


var grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

var outdoor = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v11",
  accessToken: API_KEY
});

var erthQuakeMarkers = [];
var tectonicLines = [];
d3.json(geoData, function (response) {
 //console.log(response);
 //console.log(response.features[0]);
 //console.log(response.features.length);

 
 var opac=0.9;
 var cl="lightred";
 for (var i=0; i<response.features.length; i++) {
   var location = response.features[i];
//console.log(location);
//console.log(location.geometry.coordinates[0]);
//console.log(location.geometry.coordinates[1]);
//console.log(location.properties.mag);
//console.log(location.properties.place);

  if (location.properties.mag <=1) {
  cl="green"
  opac=0.4;
  } else if (location.properties.mag <=2) {
    cl="yellow"
  opac=0.5;
} else if (location.properties.mag <=3) {
    cl="gold"
  opac=0.6;
} else if (location.properties.mag <=4) {
    cl="red"
  opac=0.7;
} else if (location.properties.mag <=5) {
    cl="red"
  opac=0.8;
} else  {
    cl="red"
  opac=0.9;
}
  

erthQuakeMarkers.push(L.circle([location.geometry.coordinates[1], location.geometry.coordinates[0]], {
    fillOpacity: opac,
    color: "black",
    fillColor: cl,
    // Setting our circle's radius equal to the output of our markerSize function
    // This will make our marker's size proportionate to its population
    radius: location.properties.mag*10000
  }).bindPopup("<h1> Location:" + location.properties.place + "</h1> <hr> <h3>Magnitude: " + location.properties.mag + "<br>Sig: " + location.properties.sig + "</h3>"));
  //erthQuakeMarkers.addTo(myMap);

  L.circle([location.geometry.coordinates[1], location.geometry.coordinates[0]], {
    fillOpacity: opac,
    color: "black",
    fillColor: cl,
    // Setting our circle's radius equal to the output of our markerSize function
    // This will make our marker's size proportionate to its population
    radius: location.properties.mag*10000
  }).bindPopup("<h1> Location:" + location.properties.place + "</h1> <hr> <h3>Magnitude: " + location.properties.mag + "<br>Sig: " + location.properties.sig + "</h3>").addTo(myMap);
 }

  
 //myMap.addLayer(markers);
});






satelite.addTo(myMap);



// Set up the legend
//this is the lgend layer mapping
var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");

  var labels = [];
  var clr = [];
  var txtLb = [];
  var opact = [];

      clr.push("green");
      txtLb.push("0-1");
      opact[0]="0.4";
      clr[1]="yellow"
      txtLb[1]="1-2";
      opact[1]="0.5";
      clr[2]="gold";
      txtLb[2]="2-3";
      opact[2]="0.6";
      clr[3]="red";
      txtLb[3]="3-4";
      opact[3]="0.7";
      clr[4]="red";
      txtLb[4]="4-5";
      opact[4]="0.8";
      clr[5]="red";
      txtLb[5]="5+";
      opact[5]="0.9";
    

 var legendInfoVal = "<h4>Mag Range</h4><div class=\"labels\"></div>" ;
 var legendInfo = "<h4> The Mag Range</h4><div class=\"labels\">" ;
 var legendsubset = "";
 txtLb.forEach(function(txtLbs, index) {
     console.log(txtLbs);
  legendsubset =legendsubset+"<div class=\""+index+"\">" + txtLbs + "</div>";
});
console.log("legendsubset");
console.log(legendsubset);
console.log("legendInfo");
console.log(legendInfo);  
legendInfo = legendInfo+legendsubset+"</div>";
console.log("legendInfo");
console.log(legendInfo);
div.innerHTML = legendInfoVal;

 console.log("the clrs value");
 console.log(clr);
 console.log("the txtlb value");
 console.log(txtLb);

 clr.forEach(function(clrs, index) {
    labels.push("<li style=\"background-color: " + clrs + ";opacity: "+opact[index]+"\">"+txtLb[index]+"</li>");
  });
  console.log(labels);
  div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  return div;
};

  legend.addTo(myMap);
   