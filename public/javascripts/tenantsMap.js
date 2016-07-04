let circle;
let map;
let latlng = [];
const markers = [];

function requestReport() {
  const center = circle.getCenter();
  const latcenter = center.lat().toString();
  const lngcenter = center.lng().toString();
  const radius = circle.getRadius().toString();
  $('#radius').val(radius);
  $('#latcenter').val(latcenter);
  $('#lngcenter').val(lngcenter);
}

function initialize() {
  const center = new google.maps.LatLng(52.2514845,-7.1265728);
  const initRadius = 10000;
  const mapProp = {
    center: center,
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROAD
  };
  
  const mapDiv = document.getElementById('map-canvas');
  const map = new google.maps.Map(mapDiv, mapProp);
  mapDiv.style.width = '500px';
  mapDiv.style.height = '400px';


  circle = new google.maps.Circle({
    center: center,
    radius: initRadius,
    strokeColor: '#0000FF',
    strokeOpacity: 0.4,
    strokeWeight: 1,
    fillColor: '#0000FF',
    fillOpacity: 0.4,
    draggable: true,
  });
  circle.setEditable(true);//allows radius be dragging anchor point
  circle.setMap(map);
  map.setCenter(center);
  
  circleListener();
  
  retrieveMarkerLocations();
  
  
}

function circleListener()
{
google.maps.event.addListener(circle, 'center_changed', function() {
  circleData();
});
google.maps.event.addListener(circle, 'radius_changed', function() {
  circleData();
});
}

function retrieveMarkerLocations()
{
  const latlng = [];
    $(function() {
        $.get("/Tenants/Report", function(data) {
        }).done(function(data) {
             $.each(data, function(index, geoObj) 
             {
                   console.log(geoObj[0] + " " + geoObj[1] + " " + geoObj[2]);
             });
             positionMarkers(data);
        });
    });
 }

function positionMarkers(data)
{
  latlngStr = [];
  $.each(data, function(index, geoObj) 
  {
      latlngStr.push(geoObj);
      });
      return latlngStr;
      //fitBounds(latlngStr);
      for(i=0; i<latlngStr.length; i++){
          addMarker(map, getLatLng(latlngStr[i]));
        }
}

function getLatLng(str)
{ 
  let latLng =  str[1].split(',');
  const lat = Number(latLng[0]);
  const lon = Number(latLng[1]);
  return new google.maps.LatLng(lat, lon);
}

function addMarker(map, value)
{
	for(i=0; i<latlngStr.length; i++){
  // create a marker
    marker = new google.maps.Marker({
      map: map,
      position: getLatLng(latlngStr[i]),
      title: 'Drag and drop on your property!',
      draggable: true,
    });
	
  marker.setMap(map);
	}
};

/*function fitBounds(latlngStr)
{
    const bounds = new google.maps.LatLngBounds();
    const infowindow = new google.maps.InfoWindow();
    
    for (i = 0; i < latlngStr.length; i++) 
    {
      marker = new google.maps.Marker({
          position: getLatLng(latlngStr[i]),
          map: map
      });
        click marker displays message (infowindow) 
      google.maps.event.addListener(marker, 'click', (function (marker, i) {
          return function () {
            infowindow.setContent('Eircode ' + latlngStr[i][0] + " : " + latlngStr[i][1]);
              infowindow.open(map, marker);
          }
      })(marker, i));
      markers[i] = marker;
      
      //bounds.extend(marker.position);
      
      //markers.push(marker); // to facilitate removel of markers
      
    }
    marker.setMap(map);
    //map.fitBounds(bounds);
}*/

google.maps.event.addDomListener(window, 'load', initialize);
