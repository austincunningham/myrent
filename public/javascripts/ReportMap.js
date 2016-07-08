let circle;
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
  const center = new google.maps.LatLng(52.2514845, -7.1265728);
  const initRadius = 10000;
  const mapProp = {
    center: center,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROAD,
  };

  const mapDiv = document.getElementById('map-canvas');
  const map = new google.maps.Map(mapDiv, mapProp);
  //const map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  mapDiv.style.width = '500px';
  mapDiv.style.height = '500px';

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
}

google.maps.event.addDomListener(window, 'load', initialize);
