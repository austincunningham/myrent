/**
 * Created by austin on 08/07/2016.
 * Pie chart implementation with use of CanvasJS and pulling imput date from jsonArray
 * Find all rented residences and get the total spent on rent , Find Landlord of rented residences
 * Sum rent of landlords residences and get percentage of whole market
 * chart.options.data[0].dataPoints.push({y: 23}); // Add a new dataPoint to dataPoints array
 */

window.onload = function () {
        var chart = new CanvasJS.Chart('chartContainer',
            {
              title: {
                text: '% Rental income by Landlord',
              },
              data: [
                {
                  type: 'pie',
                  toolTipContent: '{y} %',
                  dataPoints: [],
                },
              ],
            });

        $(function loadChartData() {
          $.get('/Administrator/dataCharts', function (data) {
            $.each(data, function (index, chartData) {
                  console.log(chartData);
                }
            );
            chartCallback(data);
            $.each(chartSort, function (i, val) {
                  let j = 0;
                }
            );

            let total = 0;
            for (j = 0; j < chartSort.length; j++) {
              total += parseFloat(chartSort[j][0]);
            }

            console.log('landlord ' + chartSort);
            console.log('total rent :' + total);
            let val;
            let i = 0;
            for (val of chartSort) {
              console.log('Getting added to pie ' + chartSort[i][1]);
              chart.options.data[0].dataPoints.push({
                y: (Math.round((parseInt(val[0]) / total) * 100)),
                indexLabel: val[1] + ' €' + val[0] + ' Percentage : '
                + (Math.round((parseFloat(val[0] / total) * 100))) + '%',
              });
              console.log(chart.options.data[0].dataPoints);
              chart.render();
            }

          });
        });
      };

function chartCallback(data) {
  chartSort = data;
  return chartSort;
}

function reloadPie() {
  location.reload();
}

function loadChart() {
  var chart = new CanvasJS.Chart('chartContainer',
      {
        title: {
          text: '% Rental income by Landlord',
        },
        data: [
          {
            type: 'column',
            toolTipContent: '{y} %',
            dataPoints: [],
          },
        ],
      });

  $(function loadChartData() {
    $.get('/Administrator/dataCharts', function (data) {
      $.each(data, function (index, chartData) {
            console.log(chartData);
          }
      );
      chartCallback(data);
      $.each(chartSort, function (i, val) {
            let j = 0;
          }
      );

      let total = 0;
      for (j = 0; j < chartSort.length; j++) {
        total += parseFloat(chartSort[j][0]);
      }

      console.log('landlord ' + chartSort);
      console.log('total rent :' + total);
      let val;
      let i = 0;
      for (val of chartSort) {
        console.log('Getting added to pie ' + chartSort[i][1]);
        chart.options.data[0].dataPoints.push({
          y: (Math.round((parseInt(val[0]) / total) * 100)),
          indexLabel: val[1] + ' €' + val[0],
        });
        console.log(chart.options.data[0].dataPoints);
        chart.render();
      }

    });
  });
};
