/**
 * Created by austin on 08/07/2016.
 */

/**
 * loads the jsonArray into the page
 */
window.onload = function () {
  $(function () {
    $.get('/Administrator/findAllResidences', function (data) {
      $.each(data, function (index, reportdata) {
            console.log(reportdata);
          }
      );
      callback(data);
    });
  });
};

/**
 * Clears the table data
 */
function deleteTable() {
  document.getElementById('markertable').innerHTML = '';
}

/**
 *
 * we've got the data in ajax call back
 *
 */
function callback(data) {
  adminSort = data; // store the array of data in a global for later use
  populateTable();  // within view
}

/**
 * Populates table, required deleteTable first as old data would remain on screen
 */
function populateTable() {
  $.each(adminSort, function (i, val) {
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
  const rent = '<td><i class=\"euro icon\"></i>' + data[6] + '</td>';
  $('#markertable').append('<tr>' + eircode + landlord + rent + '</tr>');
}
