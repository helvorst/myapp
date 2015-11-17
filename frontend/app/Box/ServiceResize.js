/**
 * Created by Hel on 05.11.2015.
 */
tstApp.factory("ServiceResize", function () {

  return {
    renderChartDependingOnItsType: function (whoToRedraw, selector) {
      switch (whoToRedraw) {
        case "pie":
          var chart = $(selector).dxPieChart('instance');
          break
        case "map":
          var chart = $(selector).dxVectorMap('instance');
          break
        case "gauge":
          var chart = $(selector).dxCircularGauge('instance');
          break
        case "scale":
          var chart = $(selector).dxLinearGauge('instance');
          break
        case "text":
          var chart = null; //$('#fuckenSingleChartID' + chartID).dxLinearGauge('instance');
          break
        case "pivot":
          var table = $(selector).dxPivotGrid('instance');
          break
        case "simple":
          var table = $(selector).dxDataGrid('instance');
          break
        case "table":
          //do nothing
          break
        default:
          var chart = $(selector).dxChart('instance');
      }

      if(chart)
        chart.render();
      if(table)
        table.repaint();
    }
  }
})
