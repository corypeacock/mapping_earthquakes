// check the code is being accessed
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "streets-v11",
    maxZoom: 18,
    accessToken: API_KEY
});

// create dark view tile layer for second option for map
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "satellite-streets-v11",
    maxZoom: 18,
    accessToken: API_KEY
});

// create a base layer that holds both maps
let baseMaps = {
    Streets: streets,
    Satellite: satelliteStreets
};

// create the eq layer for our map
let earthquakes = new L.layerGroup();

// define object that contains the overlays
// this overlay will be visible all the time
let overlays = {
    Earthquakes: earthquakes
};

// create the map object with a center and zoom level
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// pass our map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps, overlays).addTo(map);

// Accessing the earthquake GeoJSON URL
let eq_past7days = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
 
d3.json(eq_past7days).then(function(data) {
    // function returns style data for each eq. magnitude of eq into a function to calc radius
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            storke: true,
            weight: 0.5
        }
    }
    
    // function deteremines color of circle based on eq magnitude
    function getColor(magnitude) {
        if (magnitude > 5) {
            return "#ea2c2c";
        }
        if (magnitude > 4) {
            return "#ea822c";
        }
        if (magnitude > 3) {
            return "#ee9c00";
        }
        if (magnitude > 2) {
            return "#eecc00";
        }
        if (magnitude >1) {
            return "#d4ee00";
        }
        return "#98ee00";
    }

    // function determines radius of eq based on magnitude
    // eq w/ mag 0 plotted w/ radius 1
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }

    // creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        // turn each feature into a circleMarker on the map
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },
        // set type using function
        style: styleInfo,

        // set popup for each circle to display mag and location
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(earthquakes);

    // add earthquake layer to map
    earthquakes.addTo(map);
});