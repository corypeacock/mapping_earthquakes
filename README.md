# mapping_earthquakes
BC Mod13

## Overview
This project was designed to create a simple website showing earthquakes on a world map. The final version of the map includes three different base layers (street map, satellite, dark), and three different overlays (all earthquakes, tectonic plates, major earthquakes) within the past seven days.  

### Resources
* index.html: html, css, js, leaflet  
* style.css: minor styling  
* challenge_logic.js: mpbox, openstreetmap, earthquake.usgs.gov, githubusercontent(fraxen)  

## Results
The index page is a map of the entire world centered on latitude 40.7 and longitude -94.5. Using a zoom level of 3, which puts approximately 85% of the world on the screen at a given time. The default base layer is the street map. All three overlays are selected by default.  

Only one base layer may be selected at a time. To do so, the user selects the "waffle icon" on the top right of the screen, thereby revealing the options. Overlays may be selected in any combination of zero or more overlays.  

There is a simple legend on the bottom right showing the color for earthquake magnitudes. One minor flaw in this challenge is that two of the overlays require different scales for the earthquake magnitudes. The basic earthquake overlay scale colors every earthquake over 5 with one color. The major earthquakes overlay differentiates between earthquakes of magnitude 5-6, and earthquakes over 6. So, any earthquakes over 6 will have two different colors depending on which overlay is active. The default is the base earthquake overlay.

## Summary
This is a good project that allows us to work with base layers and overlays. Despite the minor flaw mentioned above, there is much to work with here. With more exploration, the minor problem could be rectified with a little ingenuity.
