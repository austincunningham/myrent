/**
 * Author : Austin Cunningham
 * Date:08/07/2016
 * About: does various sorts on button click on a jsonArray
 */

function initialize() {
  unsorted();
  rented();
  byRent();
  byType();
  deleteTable();
}
/**
 * Clears the table data
 */
function deleteTable() {
  document.getElementById('markertable').innerHTML = '';
}


/**
 *
 * Use ajax call to get data from all residences
 *
 */
function unsorted() {
  deleteTable();
  $(function () {
    $.get('/Administrator/findAllResidences', function (data) {
      $.each(data, function (index, geoObj) {
        console.log(geoObj);
      }
      );
      callback(data);
    });
  });
}

/**
 *
 * we've got the data in ajax call back
 *
 */
function callback(data) {
  latlng = data; // store the array of data in a global for later use
  populateTable();  // within view
}

/*function Comparator(a, b) {
  if (a[1] < b[1]) return -1;
  if (a[1] > b[1]) return 1;
  return 0;
}*/

function rented() {
  deleteTable();
  $.each(latlng, function (i, val) {
        console.log('what is val ' + val);
        latlng = latlng.sort(Comparator);

        function Comparator(a, b) {
          if (a[3] < b[3]) return -1;
          if (a[3] > b[3]) return 1;
          return 0;
        };

        populateTable();
      }
  );
}

function byType() {
  deleteTable();
  $.each(latlng, function (i, val) {
        console.log('what is val ' + val);
        latlng = latlng.sort(Comparator);

        function Comparator(a, b) {
          if (a[7] < b[7]) return -1;
          if (a[7] > b[7]) return 1;
          return 0;
        };

        populateTable();
      }
  );
}

function byRent() {
  deleteTable();
  $.each(latlng, function (i, val) {
    console.log('what is val ' + val);
    latlng = latlng.sort(Comparator);

    function Comparator(a, b) {
      console.log('what is a :' + a[6] + ' what is b :' + b[6]);
      return (a[6]) - (b[6]);
    };

    populateTable();

  })

  ;
};

/*******************************populating table with data*************************/
/**
 * Populates table
 */
function populateTable()
{
  $.each(latlng, function (i, val) {
    populateTableRow(val);

  });
}

/**
 * renders table row
 * @param data the array comprising residence data
 */
function populateTableRow(data)
{
  const eircode = '<td><i class=\"world icon\"></i>' + data[0] + '</td>';
  const landlord = '<td><i class=\"legal icon\"></i>' + data[1] + ' ' + data[2] + '</td>';
  const tenantName   = '<td><i class=\"user icon\"></i>' + data[3] + ' ' + data[4] + '</td>';
  const date = '<td><i class=\"calendar icon\"></i>' + data[5] + '</td>';
  const rent = '<td><i class=\"euro icon\"></i>' + data[6] + '</td>';
  const typeDwelling = '<td><i class=\"home icon\"></i>' + data[7] + '</td>';
  const bedroom = '<td><i class=\"bed icon\"></i>' + data[8] + '</td>';
  const bathroom = '<td></i><i class=\"female icon\"></i>' + data[9] + '</td>';
  const area = '<td>' + data[10] + ' &#x33a1;</td>';
  $('#markertable').append('<tr>' + eircode + landlord + tenantName + date + rent + typeDwelling + bedroom + bathroom + area + '</tr>');
}
