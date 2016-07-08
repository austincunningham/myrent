/**
 * Created by austin on 08/07/2016.
 * Pie chart implementation with use of CanvasJS and pulling imput date from jsonArray
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
 *  Find all rented residences and get the total spent on rent , Find Landlord of rented residences
 *  Sum rent of landlords residences and get percentage of whole market
 *  chart.options.data[0].dataPoints.push({y: 23}); // Add a new dataPoint to dataPoints array
 */

function loadChart() {
  var chart = new CanvasJS.Chart('chartContainer',
      {
        title: {
          text: 'Precentage of rental market revenu by Landlord',
        },
        data: [
          {
            type: 'pie',
            dataPoints: [
              { y: 0, indexLabel: 'start' },
            ],
          },
        ],
      });

  chart.render();
  $.each(adminSort, function (i, val) {

        let j = 0;
        //work out total rent first
      }
  );
  let total = 0;
  for (i = 0; i < adminSort.length; i++) {
    console.log('How many iterations i: ' + i );
    if (adminSort [i][3] !== 'Vacant') {
      total += parseFloat(adminSort[i][6]);
    }
  }

  console.log('total rent :' + total);

  for (i = 0; i < adminSort.length; i++) {
    console.log('How many iterations i: ' + i );
    if (adminSort [i][3] !== 'Vacant') {
      console.log(adminSort[i][3]);
      chart.options.data[0].dataPoints.push({
        y: ((parseFloat(adminSort[i][6]) / total) * 100),
        indexLabel: adminSort[i][1] + ' ' + adminSort[i][2],
      });
      console.log(chart.options.data[i]);
    }
  }

  console.log('total rent :' + total);

}
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
  //loadChart();
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
