function initialize() {
  unsorted();
  rented();
  byRent();
  byType();  
}

/**
 *
 * Use ajax call to get users and their geolocations pass returned array marker
 * locations to callback method Here is the format in which marker data stored
 * geoObj[0] is eircode. geoObj[1] is a string of latitude and longitude We use
 * geoObj[0] in the infoWindow. Click marker to reveal description.
 *
 */
function unsorted() {
  $(function () {
    $.get('/Administrator/findAllResidences', function (data) {
      $.each(data, function (index, geoObj) {
        console.log(geoObj[0] + ' ' + geoObj[1]+' '+ geoObj[2]+' '+ geoObj[3]);
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
  populateTable();
  // within view

}

/*******************************populating table with marker data*************************/
/**
 * Populates table with complete marker list + it's gps coords
 */
function populateTable()
{
  $.each(latlng, function(i, val) {
    populateTableRow(val);
  });
}

/**
 * renders table row comprising marker and its gps coordinates
 * @param data the array comprising description + gps (lat, lng)
 */
function populateTableRow(data)
{
  const eircode = "<td>" + data[0] + "</td>";
  const landlord = "<td>" + data[1] + " " + data[2] + "</td>"
  const tenantName   = "<td>" + data[3] + " " + data[4] + "</td>";
  const date = "<td>" + data[5] + "</td>";
  const rent = "<td>" + data[6] + "</td>";
  const typeDwelling = "<td>" + data[7] + "</td>";
  const bedroom = "<td>" + data[8] + "</td>";
  const bathroom = "<td>" + data[9] + "</td>";
  const area = "<td>" + data[10] + "</td>";
  $('#markertable').append("<tr>" + eircode + landlord + tenantName + date + rent+ typeDwelling+ bedroom+ bathroom+ area+ "</tr>");
}