// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "light-v10",
    maxZoom: 18,
    accessToken: API_KEY
});

// create dark view tile layer for second option for map
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "dark-v10",
    maxZoom: 18,
    accessToken: API_KEY
});

// create a base layer that holds both maps
let baseMaps = {
    Light: light,
    Dark: dark
};

// create the map object with a center and zoom level
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [light]
});

// pass our map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);

// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

// Accessing the airport GeoJSON URL
let torontotData = "https://raw.githubusercontent.com/corypeacock/mapping_earthquakes/mapping_geojson_linestrings/mapping_geojson_linestrings/static/data/torontoRoutes.json";
 
// Grabbing our GeoJSON data
let myStyle = {
    color: "#ffffa1",
    weight: 2
}

d3.json(torontotData).then(function(data) {
    console.log(data);
    // creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        style: myStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr><h3> Destination: " + feature.properties.dst + "</h3>");
        }
    })
    .addTo(map);
});