/**
 * Created by austin on 08/07/2016.
 * Pie chart implementation with use of CanvasJS and pulling imput date from jsonArray
 */

window.onload = function () {
      const chart = new CanvasJS.Chart('chartContainer',
          {
            title: {
              text: 'Precentage of rental market revenu by Landlord',
            },
            data: [
              {
                type: 'pie',
                dataPoints: [
                  { y: 53.37, indexLabel: 'Android' },
                  { y: 35.0, indexLabel: 'Apple iOS' },
                  { y: 7, indexLabel: 'Blackberry' },
                  { y: 2, indexLabel: 'Windows Phone' },
                  { y: 5, indexLabel: 'Others' },
                ],
              },
            ],
          });

      chart.render();
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
