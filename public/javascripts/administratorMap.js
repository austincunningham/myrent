const ADMINMAP = (function () {

  let map; // the google map
  let latlng = []; // geolocation data later retrieved from server in func
  // callback
  const markers = []; // array of all markers (unfiltered)

  /**
   * Render the basic google map
   */

  function initialize() {
    rendermap();
    retrieveMarkerLocations();
  }

  /**
   * The basic map
   * Canvas id on html is 'map-canvas'
   */
  function rendermap() {

    const center = new google.maps.LatLng(52.2514845, -7.1265728);
    const initRadius = 10000;

    const mapProp = {
      mapTypeId: google.maps.MapTypeId.ROAD,
    };

    // map = new google.maps.Map(document.getElementById("map-canvas"), mapProp);
    // // using vanilla js
    map = new google.maps.Map($('#map-canvas')[0], mapProp); // using jQuery

  }

  /**
   *
   * Use ajax call to get users and their geolocations pass returned array marker
   * locations to callback method Here is the format in which marker data stored
   * geoObj[0] is eircode. geoObj[1] is a string of latitude and longitude We use
   * geoObj[0] in the infoWindow. Click marker to reveal description.
   *
   */
  function retrieveMarkerLocations() {
    $(function () {
      $.get('/Administrator/administratorResidences', function (data) {
        $.each(data, function (index, geoObj) {
          console.log(geoObj[0] + ' ' + geoObj[1] + ' ' + geoObj[2] + ' ' + geoObj[3]);
        });

        callback(data);
      });
    });
  }

  /**
   *
   * we've got the marker location from data in ajax call we now put data into an
   * array the format is 'firstName, xx.xxxx, yy.yyyyy' -> (firstName, lat, lng)
   * then invoke 'fitBounds' to render the markers, centre map and create
   * infoWindow to display firstName
   *
   */
  function callback(data) {
    latlng = data; // store the array of data in a global for later use
    fitBounds(latlng); // then invoke fitBounds to zoom and display markers
    // within view
    setInfoWindowListener(latlng);
  }

  /**
   * creates and positions markers sets zoom so that all markers visible
   */
  function fitBounds(latlngStr) {
    const bounds = new google.maps.LatLngBounds();
    for (let i = 0; i < latlngStr.length; i++) {
      marker = new google.maps.Marker({
        position: getLatLng(latlngStr[i]),
        map: map,
      });
      markers[i] = marker;
      bounds.extend(marker.position);
    }

    map.fitBounds(bounds);
  }

  function setInfoWindowListener(latlngStr) {
    const infowindow = new google.maps.InfoWindow();
    for (let i = 0; i < latlng.length; i++) {
      /* respond to click on marker by displaying infowindow text */
      const marker = markers[i];
      google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
          infowindow.setContent('Eircode : ' + latlngStr[i][0] + '<div>Tenant : ' + latlngStr[i][2]
              + ' ' + latlngStr[i][3] + '</div>');
          infowindow.open(map, marker);
        };
      })(marker, i));
    }
  }

  /**
   *
   * A helper function to convert the latlng string to individual numbers and
   * thence to a google.maps.LatLng object
   *
   * @param str
   *            str is list of strings : str[0] is eircode
   *            str[1] is location a string of  latitude and longitude
   * @param The
   *            object 'str' holding an individual marker data set
   * @return A google.maps.LatLng object containing the marker coordinates.
   */

  function getLatLng(str) {
    let latLng = str[1].split(',');
    const lat = Number(latLng[0]);
    const lon = Number(latLng[1]);
    return new google.maps.LatLng(lat, lon);
  }

  /**
   *  data comes from /Administrator/administratorResidences again, ajax makes the call
   *  after tenant/landlord has been removed from the database. Regenerates new set of markers after
   *  revmoveMarkers is called.
   * @param data
   */
  function updateMarkers(data)
  {
    removeMarkers();
    latlngStr = [];
    $.each(data, function (index, geoObj)
    {
      latlngStr.push(geoObj);
    });

    const infowindow = new google.maps.InfoWindow();

    for (i = 0; i < latlngStr.length; i++)
    {
      marker = new google.maps.Marker({
        position: getLatLng(latlngStr[i]),
        map: map,
      });
      google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
          infowindow.setContent('Eircode : ' + latlngStr[i][0] + '<div>Tenant : ' + latlngStr[i][2]
              + ' ' + latlngStr[i][3] + '</div>');
          infowindow.open(map, marker);
        };
      })(marker, i));

      markers.push(marker);
    }
  }

  /**
   * Remove existing markers
   */
  function removeMarkers()
  {
    for (i = 0; i < markers.length; i += 1)  {
      markers[i].setMap(undefined);
    }
  }

  google.maps.event.addDomListener(window, 'load', initialize);

  return {
    updateMarkers: updateMarkers,
  };

  google.maps.event.addDomListener(window, 'load', ADMINMAP.initialize);

  //google.maps.event.addDomListener(window, 'load', initialize);

}());
