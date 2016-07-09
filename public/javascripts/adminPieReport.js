/**
 * Created by austin on 09/07/2016.
 *
 * we've got the data in ajax call back
 */
$(document).ready(function () {
  /**
   * Retrieve residence data using ajax call
   */
  $.ajax({
    url: '/Administrator/findAllResidences',
  }).done(function (data) {
    $.each(data, function (index, reportdata) {
      console.log(reportdata);

      callback(data);
    });
  });
});
/**
   * Clears the table data
   */
function deleteTable() {
  document.getElementById('markertable').innerHTML = '';
}

function callback(data) {
  adminSort = data; // store the array of data in a global for later use
  populateTable();  // within view
  return adminSort;
}

/**
 * Populates table, required deleteTable first as old data would remain on screen
 */
function populateTable() {
  deleteTable();
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
