/**
 * Created by Hel on 28.09.2015.
 */
tstApp.controller('BarCtrl', function ($scope) {



  //Сall it before loading anything
  $scope.defineNewArgumentAndValue();

  $scope.barOptions = {

    dataSource: $scope.myData,
    commonSeriesSettings: {
      argumentField: $scope.newArgumentForOptions,
      type: 'bar',
      label: {
        visible: true,
        connector: {
          visible: true
        }
      }
    },
    series: $scope.newValueSeriesForOptions,
    pathModified: true,
    tooltip: {
      enabled: true,
      percentPrecision: 2,
      customizeTooltip: function (value) {
        return {
          text: (value.argument + ", " + value.seriesName + ": " + value.value)
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

  $scope.redrawBar = function () {

    $scope.defineNewArgumentAndValue();

    if ($scope.newArgumentForOptions) {
      $scope.barOptions.commonSeriesSettings.argumentField = $scope.newArgumentForOptions;
      if ($scope.newValueSeriesForOptions.length > 0)
        $scope.barOptions.series = $scope.newValueSeriesForOptions;

      $("#barID").dxChart("instance").option($scope.barOptions);
    }

  }


})
