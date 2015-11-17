/**
 * Created by Hel on 05.11.2015.
 */
tstApp.factory("ServiceDraw", function ($rootScope, chartsOptions) {

  return {
    whoToRedraw: function (whoToRedraw, selector, chartInfo, data) {
      $rootScope.mycharts[chartInfo.id].active = whoToRedraw;
      //$scope.whoIsActive = whoToRedraw;

      //clean whatever exists
      $(selector).empty();
      $(selector).removeData();

      switch (whoToRedraw) {
        case "pie":
          this.pie(chartInfo, data, selector, 'pie');
          break
        case "doughnut":
          this.pie(chartInfo, data, selector, 'doughnut');
          break
        case "map":
          this.map(chartInfo, data, selector);
          break
        case "gauge":
          this.gauge(chartInfo, data, selector);
          break
        case "scale":
          this.scale(chartInfo, data, selector);
          break
        case "text":
          this.text(chartInfo, data, selector);
          break
        case "table":
          //do nothing
          break
        default:
          this.defaultChart(chartInfo, data, selector, whoToRedraw);
      }
      return null;
    },

    //*************************************************************
    //***************************DEFAULT***************************
    //*************************************************************
    defaultChart: function (chartInfo, data, selector, whoToRedraw) {

      //Configuration
      var defOpts = {
        dataSource: [],
        commonSeriesSettings: {
          argumentField: "arg",
          valueField: "val",
          type: whoToRedraw
        },
        tooltip: {
          enabled: true,
          percentPrecision: 2,
          customizeTooltip: function (value) {
            return {
              text: (value.argument + ", " + value.seriesName + ": " + value.value)
            };
          },
          location: "edge"
        },
        title: {
          text: chartInfo.name,
          font: {
            color: 'black',
            family: 'Play',
            opacity: 0.9,
            size: 20,
            weight: 400
          }
        },
        legend: {
          position: "inside",
          horizontalAlignment: "left",
          border: {
            visible: true
          }
        },
        seriesTemplate: {
          nameField: "name"
        },
        margin: {
          left: 10,
          right: 10,
          top: 20
        }
      };

      $(selector).dxChart(defOpts);

      //datasource for PivotTable
      //if (chartInfo.settings.table && (chartInfo.settings.table == 'pivot')) {
      //  var pivotGridDataSource = $("#fuckenPivotTableID" + chartInfo.id).dxPivotGrid("instance").getDataSource();
      //  $(selector).dxChart("option", "dataSource", createChartDataSource(pivotGridDataSource));
      //}
      //datasource for SimpleTable
      if (chartInfo.settings.table && (chartInfo.settings.table == 'simple')) {
        var rearrangedData = [];
        var dataConfig = chartInfo.settings.dataConfig;
        var whoIsX = [];
        var whoIsNotXButSomething = [];
        for (var i = 0; (dataConfig && i < dataConfig.length); i++) {
          if (dataConfig[i].hasOwnProperty('isX') && (dataConfig[i].isX == true)) {
            whoIsX.push(dataConfig[i].fieldAlias);
          }
          else if (dataConfig[i].fieldAlias != 'type' && dataConfig[i].fieldAlias != 'value' && dataConfig[i].fieldAlias != 'comment')
            whoIsNotXButSomething.push(dataConfig[i].fieldAlias)
        }


        for (var i = 0; (data && i < data.length); i++) {
          for (var j = 0; j < whoIsX.length; j++) {
            if (data[i].hasOwnProperty(whoIsX[j])) {
              var myNewDataPortion = {
                arg: data[i][whoIsX[j]],
                val: data[i].value,
                name: data[i].type
              }
              for (var k = 0; k < whoIsNotXButSomething.length; k++) {
                if (data[i][whoIsNotXButSomething[k]])
                  myNewDataPortion.name = myNewDataPortion.name + "; " + data[i][whoIsNotXButSomething[k]];
              }
              rearrangedData.push(myNewDataPortion);
            }
          }
        }
        $(selector).dxChart("option", "dataSource", rearrangedData);
      }

    },

    //*************************************************************
    //***************************GAUGE*****************************
    //*************************************************************
    gauge: function (chartInfo, data, selector) {
      //Закинемся конфигом гауджа
      var gaugeConfig = chartInfo.settings.chartConfig;

      //Расставим параметры
      var gaugeOptions = {
        scale: {
          startValue: gaugeConfig.startValue,
          endValue: gaugeConfig.endValue,
          majorTick: {
            tickInterval: gaugeConfig.majorTick
          },
          label: {
            useRangeColors: true
          }
        },
        rangeContainer: {
          palette: 'pastel',
          ranges: gaugeConfig.ranges
        },
        title: {
          text: chartInfo.name,
          font: {
            color: 'black',
            family: 'Play',
            opacity: 0.9,
            size: 20,
            weight: 400
          }
        },

        margin: {
          left: 20,
          right: 20,
          top: 20
        },
        value: data[0].value,
        animation: {
          easing: 'easeOutCubic',
          duration: 5000
        },
        valueIndicator: {
          type: gaugeConfig.valueIndicatorType,
          color: gaugeConfig.valueIndicatorColor
        },
        subtitle: gaugeConfig.subtitle,

      };

      //Возьмемся за кисть
      $(selector).dxCircularGauge(gaugeOptions);

    }

    ,

    //*************************************************************
    //***************************SCALE*****************************
    //*************************************************************
    scale: function (chartInfo, data, selector) {
      //Закинемся конфигом скейла
      var scaleConfig = chartInfo.settings.chartConfig;

      //Расставим параметры
      var scaleOptions = {
        scale: {
          startValue: scaleConfig.startValue,
          endValue: scaleConfig.endValue,
          majorTick: {
            tickInterval: scaleConfig.majorTick
          },
          minorTick: {
            visible: true,
            tickInterval: scaleConfig.minorTick
          }
        },
        title: {
          text: chartInfo.name,
          position: 'top-left',
          font: chartsOptions.chartNameOptions.font
        },
        //margin:  chartsOptions.chartNameOptions.margin,
        margin: {
          left: 20,
          right: 20,
          top: 10,
          bottom: 20
        },
        value: data[0].value,
        animation: {
          easing: 'easeOutCubic',
          duration: 2500
        },
        geometry: {
          orientation: scaleConfig.orientation
        },
        valueIndicator: {
          type: scaleConfig.valueIndicatorType,
          color: scaleConfig.valueIndicatorColor
        },
        subtitle: scaleConfig.subtitle,
        rangeContainer: {
          ranges: scaleConfig.ranges
        }
      };

      //Возьмемся за кисть
      $(selector).dxLinearGauge(scaleOptions);
    }
    ,

    //*************************************************************
    //***************************MAP*****************************
    //*************************************************************
    map: function (chartInfo, data, selector) {


      //Закинемся конфигом карты
      var mapConfig = chartInfo.settings.chartConfig;

      //...и раздерем беспорядок входных данных на areas и labeles
      var districts = {};
      var markers = [];

      for (var i = 0; i < data.length; i++) {
        //area
        if (data[i].hasOwnProperty('okato')) {
          var reorganized = {};
          var propOKATO;
          for (var name in data[i]) {
            if (name != 'okato')
              reorganized[name] = data[i][name];
            else
              propOKATO = data[i][name];
          }
          districts[propOKATO] = reorganized;

        }

        //label
        if (data[i].hasOwnProperty('coordinates')) {
          markers.push(data[i]);
        }
      }
      //=1==========GET MY data for map from "mapConfig.mapURL": extract and parse DBF and SHP
      DevExpress.viz.vectormaputils.parse(mapConfig.mapURL, {precision: mapConfig.precision}, function (data) {

        //IF I USE GROUPS: ADD GROUPING VALUES TO ATTRIBUTES
        $.each(data.features, function (_, item) {
          if (districts[item.properties.TERR_ID])
            item.properties.value = districts[item.properties.TERR_ID].value;
        });

        //IF I USE LABELS: ADD NAMES TO ATTRIBUTES (create new attribute "label" to use it in map config)
        if (mapConfig.label.enabled) {
          $.each(data.features, function (_, item) {
            if (districts[item.properties.TERR_ID])
              item.properties.label = districts[item.properties.TERR_ID].name;
          });
        }

        //console.log(data);
        var map = $(selector).dxVectorMap('instance');
        map.option('mapData', data);


      })

      //=2=============
      var i = 0; //индекс для раскраски палитрой
      var mapOptions = {
        //------------SIZE----------------------------------------
        zoomFactor: mapConfig.zoom,
        center: mapConfig.center,
        size: mapConfig.size,
        bounds: mapConfig.bounds,
        background: {
          borderColor: 'white'
        },
        //------------MARKERS----------------------------------------
        markers: mapConfig.markers.enabled ? markers : null,
        markerSettings: {
          sizeGroups: mapConfig.markers.sizeGroups,
          sizeGroupingField: 'value',
          type: mapConfig.markers.mapMarkerType,
          label: {
            enabled: mapConfig.markers.enabled
          },
          selectedColor: 'dodgerblue',
          borderColor: 'mistyrose',
          borderWidth: mapConfig.mapMarkerType == 'bubble' ? 4 : 0,
          hoveredBorderColor: 'midnightblue',
          hoveredBorderWidth: mapConfig.mapMarkerType == 'bubble' ? 4 : 0
        },

        //------------TOOLTIP----------------------------------------
        tooltip: {
          enabled: true,
          border: {
            border: {color: 'white'},
          },
          font: {color: "#565656"},
          customizeTooltip: function (arg) {
            if (arg.type === 'marker') {                                                        //...for marker
              var markertooltip = "<strong> " + arg.text + "</strong> ";
              if (arg.value)
                markertooltip = markertooltip + "</br> Значение: " + arg.value;
              if (arg.values && mapConfig.markers.markerValuesNames) {
                for (var i = 0; i < mapConfig.markers.markerValuesNames.length; i++)
                  markertooltip = markertooltip + "</br> " + mapConfig.markers.markerValuesNames[i] + ": " + arg.values[i];
              }
              return {html: markertooltip};

            }
            else {                                                                              //...for area

              var id = arg.attribute("TERR_ID");
              var county = districts[id];
              if (county) {
                return {html: "<strong> " + county.name + "</strong> " + "</br> Показатель: " + county.type + "</br> Значение: " + county.value};
              }
            }
          }
        },
        //------------AREA----------------------------------------
        areaSettings: {
          //-1)Labels for areas
          label: {
            enabled: mapConfig.label.enabled,
            dataField: "label", //я сам создал такой атрибут из поля данных name: "33217": {name: "Кильмезский район", type: "Налов блох", value: 23, color: "orange"},
            font: {
              family: 'Play',
              color: 'white',
              opacity: 1,
              weight: 100
            }
          },
          //0)Palette
          palette: mapConfig.grouping.enabled ? mapConfig.grouping.palette : mapConfig.palette,
          paletteSize: mapConfig.paletteSize ? mapConfig.paletteSize : 4,

          //1)GROUPS if they are enabled
          colorGroups: mapConfig.grouping.enabled ? mapConfig.grouping.groups : null,
          colorGroupingField: mapConfig.grouping.enabled ? 'value' : null, //поле из данных:  "33217": {name: "Кильмезский район", type: "Налов блох", value: 23, color: "orange"},

          //2)CUSTOM colouring
          customize: function (arg) {
            var district = districts[arg.attribute('TERR_ID')];
            if (district) {
              if (district.color) //when colour is explicitly set in data apply it
                return {
                  color: district.color,
                  hoveredColor: "#e0e000",
                  selectedColor: "#008f00"
                }
              else //otherwise apply palette
                return {
                  paletteIndex: i++ % ( mapConfig.paletteSize ? mapConfig.paletteSize : 4)
                }
            }
          }
        },
        //------------LEGENDS----------------------------------------
        legends: [{
          source: 'areaColorGroups',
          customizeText: function (arg) {
            return 'c ' + arg.start + ' по ' + arg.end;
          }
        },
          {
            source: "markerSizeGroups",
            markerType: "circle",
            horizontalAlignment: "left",
            verticalAlignment: "bottom",
            visible: mapConfig.markers.enabled,
            customizeText: function (arg) {
              return "c " + arg.start + " по " + arg.end; // ['< 8000K', '8000K to 10000K', '> 10000K'][arg.index];
            }
          }
        ],

        //------------EVENTS: CLICK----------------------------------------
        onAreaClick: function (e) {
          var target = e.target;
          if (districts[target.attribute("TERR_ID")]) {
            target.selected(!target.selected());
          }
        }

        ,
        onMarkerClick: function (info) {
          var clickedMarker = info.target;
          clickedMarker.selected(!clickedMarker.selected());
          info.component.center(info.target.coordinates());
        }


      };

      $(selector).dxVectorMap(mapOptions);
    }
    ,

    //*************************************************************
    //***************************TEXT*****************************
    //*************************************************************
    text: function (chartInfo, data, selector) {
    }
    ,

    //*************************************************************
    //***************************PIE*****************************
    //*************************************************************


    pie: function (chartInfo, data, selector, type) {


      var pieOpt = {
        dataSource: [],
        series: [{
          argumentField: 'arg',
          valueField: 'val',
          type: type
          //name: 'type'
        }],
        //series,
        tooltip: {
          enabled: true,
          percentPrecision: 2,
          customizeTooltip: function (value) {
            return {
              text: (value.argument + ": " + value.value)
            };
          },
          location: "edge"
        },
        title: {
          text: chartInfo.name,
          font: {
            color: 'black',
            family: 'Play',
            opacity: 0.9,
            size: 20,
            weight: 400
          }
        },
        legend: {
          position: "inside",
          horizontalAlignment: "left",
          border: {
            visible: true
          }
        },
        onPointClick: function (e) {
          var point = e.target;
          point.isVisible() ? point.hide() : point.show();
        }
      }
      $(selector).dxPieChart(pieOpt);

      //datasource for SimpleTable
      if (chartInfo.settings.table && (chartInfo.settings.table == 'simple')) {
        var rearrangedData = [];
        var dataConfig = chartInfo.settings.dataConfig;
        var whoIsX = [];
        var whoIsNotXButSomething = [];
        for (var i = 0; (dataConfig && i < dataConfig.length); i++) {
          if (dataConfig[i].hasOwnProperty('isX') && (dataConfig[i].isX == true)) {
            whoIsX.push(dataConfig[i].fieldAlias);
          }
          //else if (dataConfig[i].fieldAlias != 'type' && dataConfig[i].fieldAlias != 'value' && dataConfig[i].fieldAlias != 'comment')
          //  whoIsNotXButSomething.push(dataConfig[i].fieldAlias)
        }


        for (var i = 0; (data && i < data.length); i++) {
          for (var j = 0; j < whoIsX.length; j++) {
            if (data[i].hasOwnProperty(whoIsX[j])) {
              var myNewDataPortion = {
                arg: data[i][whoIsX[j]],
                val: data[i].value
                //,
                //name: data[i].type
              }
              //for (var k = 0; k < whoIsNotXButSomething.length; k++) {
              //  if (data[i][whoIsNotXButSomething[k]])
              //    myNewDataPortion.name = myNewDataPortion.name + "; " + data[i][whoIsNotXButSomething[k]];
              //}
              rearrangedData.push(myNewDataPortion);
            }
          }
        }
        $(selector).dxPieChart("option", "dataSource", rearrangedData);
        console.log(rearrangedData);
      }

      //datasource for PivotTable
      if (chartInfo.settings.table && (chartInfo.settings.table == 'pivot')) {
        var pivotGridDataSource = $('#pivotTable').dxPivotGrid("instance").getDataSource();
        $(selector).dxPieChart("option", "dataSource", createChartDataSource(pivotGridDataSource));
      }
    }

  }
})


