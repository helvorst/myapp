/**
 * Created by Hel on 11.11.2015.
 */
tstApp.factory("ServiceExport", function ($window) {

  return {
    image: function (selector, filename) {

      var svg = $(selector)[0].childNodes[0];
      var s = new XMLSerializer().serializeToString(svg);
      var imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(s)));
      console.log(imgsrc);
      var canvas = document.querySelector("canvas"),
        context = canvas.getContext("2d");
      canvas.setAttribute('width', $(selector).width());
      canvas.setAttribute('height', $(selector).height());

      var image = new Image;
      image.src = imgsrc;
      image.onload = function () {
        context.drawImage(image, 0, 0);
        var canvasdata = canvas.toDataURL("image/png");
        var data = atob(canvasdata.substring("data:image/png;base64,".length)),
          asArray = new Uint8Array(data.length);
        for (var i = 0, len = data.length; i < len; ++i) {
          asArray[i] = data.charCodeAt(i);
        }
        var blob = new Blob([asArray.buffer], {type: "image/png"});
        saveAs(blob, (filename + ".png"));
      }
    },

    excel: function (chartSelector, filename) {

      var chartHTML = '', pivotTableHTML = '', simpleTableHTML = '';
      var ctx = {worksheet: filename};

      var  base64 = function (s) {
          return $window.btoa(unescape(encodeURIComponent(s)));
        },
        format = function (s, c) {
          return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
          })
        },
        loadAndSave = function(chartHTML, pivotTableHTML, simpleTableHTML, ctx ){

          var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>'
              + chartHTML + pivotTableHTML + simpleTableHTML + '</body></html>';


          var excel = uri + base64(format(template, ctx));

          location.href = excel;
          //var a = document.createElement("a");
          //a.download = filename + ".xls";
          //a.href = excel;
          //a.click();
          //a.remove();
        };

      if (chartSelector) {
        var svg = $(chartSelector)[0].childNodes[0];
        var s = new XMLSerializer().serializeToString(svg);
        var imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(s)));
        var canvas = document.querySelector("canvas"),
          context = canvas.getContext("2d");
        canvas.setAttribute('width', $(chartSelector).width());
        canvas.setAttribute('height', $(chartSelector).height());

        var image = new Image;
        var img;
        image.src = imgsrc;
        image.onload = function () {
          context.drawImage(image, 0, 0);
          var canvasdata = canvas.toDataURL("image/png");
          var data = atob(canvasdata.substring("data:image/png;base64,".length)),
            asArray = new Uint8Array(data.length);
          for (var i = 0, len = data.length; i < len; ++i) {
            asArray[i] = data.charCodeAt(i);
          }

          var imname = /*filename + "_" +*/ Date.now() + ".png";
          var blob = new Blob([asArray.buffer], {type: "image/png"});
          saveAs(blob, imname);

          chartHTML = '<img src="{pic}"/>';
          ctx.pic = imname;

          //remove dx-loadpanel-message
          try {
            pivotTableHTML = '<table>{pivotTable}</table>';
            ctx.pivotTable = $('#pivotTable').html().replace("Loading...","") ;
          } catch (e) {}
          try {
            simpleTableHTML = '<table>{simpleTable}</table>';
            ctx.simpleTable = $('#simpleTable').html().replace("Loading...","");
          } catch (e) {}
          loadAndSave(chartHTML, pivotTableHTML, simpleTableHTML, ctx );

        }

      }
      else {
        try {
          pivotTableHTML = '<table>{pivotTable}</table>';
          ctx.pivotTable = $('#pivotTable').html().replace("Loading...","");
        } catch (e) {}
        try {
          simpleTableHTML = '<table>{simpleTable}</table>';
          ctx.simpleTable = $('#simpleTable').html().replace("Loading...","");
        } catch (e) {}
        loadAndSave(chartHTML, pivotTableHTML, simpleTableHTML, ctx );
      }
    }
  }
})
