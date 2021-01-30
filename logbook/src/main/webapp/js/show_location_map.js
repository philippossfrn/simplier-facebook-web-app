
//Function that put a map in html page
//1st param --lon
//2nd param --lat
//3rd param --id of html element to put map in
function show_map(lon, lat, area_to_display_map_by_id) {

  //Set the size of map
  document.getElementById(area_to_display_map_by_id).style.width = '600px';
  document.getElementById(area_to_display_map_by_id).style.height = '200px';

  //create a map and put it in specific area given by caller function through parameter
  //Transform coords
  //Set the zoom on the map
  //Put a marker on it
  var map = new OpenLayers.Map(area_to_display_map_by_id);
  map.addLayer(new OpenLayers.Layer.OSM());

  var lonLat = new OpenLayers.LonLat(lon, lat)
    .transform(
      new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
      map.getProjectionObject() // to Spherical Mercator Projection
    );

  var zoom = 16;

  var markers = new OpenLayers.Layer.Markers("Markers");
  map.addLayer(markers);

  markers.addMarker(new OpenLayers.Marker(lonLat));

  map.setCenter(lonLat, zoom);
}