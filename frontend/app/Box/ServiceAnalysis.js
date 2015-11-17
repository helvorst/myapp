/**
 * Created by Hel on 13.11.2015.
 */
tstApp.factory("ServiceAnalysis", function () {

  return {
    heatmap: function () {
      function morph(start, stop, point) {
        return (Math.round(stop - start) * point / 100 + start);
      }

      console.log('heatmap');
      var tableData = $('.dx-bottom-row');
      var tableDataMeat = $('.dx-pivotgrid-area-data', tableData);
      console.log(tableDataMeat)
      $('td', tableDataMeat).each(function () {
        var value = parseInt($(this).text());

        var minNorm = 35;
        var minValue = 0;
        var maxNorm = 130;
        var maxValue = 560;
        var color;
        if (!isNaN(value)) {
          if (value <= minNorm) {
            var blue = Math.round(value / (minNorm - minValue) * 255) + 100;
            var red = Math.round(value / (minNorm - minValue) * 120) + 100;
            var green = Math.round(value / (minNorm - minValue) * 190) + 100;
            color = red + "," + green + "," + blue;
            $(this).css('background-color', 'rgb(' + color + ')');
          }
          if (value >= maxNorm) {
            var blue = 220 - Math.round((value - maxNorm) / (maxValue - maxNorm) * 150);
            var red = 255 - Math.round((value - maxNorm) / (maxValue - maxNorm) * 150);
            var green = 220 - Math.round((value - maxNorm) / (maxValue - maxNorm) * 150);
            color = red + "," + green + "," + blue;
            //console.log(color)
            $(this).css('background-color', 'rgb(' + color + ')');
          }
        }
      });
    }
  }
})
