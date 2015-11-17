/**
 * Created by Hel on 28.09.2015.
 */
tstApp.controller('PieCtrl', function ($scope) {
  $scope.pieOptions = {

    dataSource: $scope.myData,
    series: {
      argumentField: 'x',
      valueField: 'y',
      label: {
        visible: true,
        connector: {
          visible: true
        }
      }
    },
    pathModified: true,
    tooltip: {
      enabled: true,
      percentPrecision: 2,
      customizeTooltip: function (value) {
        return {
          text: value.percentText
        };
      }
    },
    title: {
      text: $scope.chartInfo.name
    },
    legend: {
      horizontalAlignment: 'center',
      verticalAlignment: 'bottom'
    }
  }
})
