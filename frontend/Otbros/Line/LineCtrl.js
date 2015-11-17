/**
 * Created by Hel on 28.09.2015.
 */
tstApp.controller('LineCtrl', function ($scope) {

  $scope.lineOptions = {
    dataSource: $scope.myData,
    commonSeriesSettings: {
      argumentField: "x",
      type: 'line'
    },
    margin: {
      bottom: 20
    },
    argumentAxis: {
      valueMarginsEnabled: false,
      discreteAxisDivisionMode: "crossLabels",
      grid: {
        visible: true
      }
    },
    series: [
      { valueField: 'y', name: $scope.myDataConfig.yName },
      { valueField: "y1", name: $scope.myDataConfig.y1Name }//,
      //{ valueField: "gas", name: "Natural gas" },
      //{ valueField: "coal", name: "Coal" },
      //{ valueField: "nuclear", name: "Nuclear" }
    ],
    legend: {
      verticalAlignment: "bottom",
      horizontalAlignment: "center",
      itemTextPosition: "bottom"
    },
    title: {
      text: $scope.chartInfo.name
    },
    tooltip: {
      enabled: true,
      customizeTooltip: function (arg) {
        return {
          text: arg.valueText
        };
      }
    }
  };

})
