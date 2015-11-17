/**
 *   Created by Hel on 06.11.2015.
 */
tstApp.factory("ServiceTable", function ($rootScope, ServiceAnalysis) {

  var rusification = {
    grandTotal: 'Итог',
    total: 'Подитог',
    sortRowBySummary: 'Сортировать ряды по итогу',
    sortColumnBySummary: 'Сортировать колонки по итогу',
    showFieldChooser: 'Выбор полей',
    removeAllSorting: 'Сбросить сортировку',
    noData: 'Нет данных',
    expandAll: 'Раскрыть все',
    collapseAll: 'Свернуть все'
  };

  var expander = function (expandRows, expandColumns, dataSource) {
    var data = dataSource.getData();
    var state = {expandedRows: [], expandedColumns: []};

    foreachTree(data.rows, function (member, path) {
      //if (member.children) {
      state.expandedRows.push(path.slice(0)) ;
      //}
    });


    foreachTree(data.columns, function (member, path) {
      // if (member.children) {
      state.expandedColumns.push(path.slice(0));
      // }
    });

    $.each(state.expandedRows, function (index, path) {
      if (expandRows)
        dataSource.expandHeaderItem("row", path);
      else
        dataSource.collapseHeaderItem("row", path);
    });
    $.each(state.expandedColumns, function (index, path) {
      if (expandColumns)
        dataSource.expandHeaderItem("column", path);
      else
        dataSource.collapseHeaderItem("column", path);

    });
  };

  var foreachTree = function (items, func, path) {
    path = path || [];
    for (var i = 0; i < items.length; i++) {
      path.push(items[i].value);
      func(items[i], path);
      if (items[i].children) {
        foreachTree(items[i].children, func, path);
      }
      path.pop();
    }
  }


  return {
    simpleTable: function (selector, dataConfig, data) {

      var myPulledColumnsAll = [];
      for (var i = 0; (dataConfig && i < dataConfig.length); i++) {
        var myNewColumn = {
          dataField: dataConfig[i].fieldAlias,
          caption: dataConfig[i].fieldName,
        }
        if (dataConfig[i].hasOwnProperty('groupIndex'))
          myNewColumn.groupIndex = dataConfig[i].groupIndex;

        myPulledColumnsAll.push(myNewColumn);
      }
      var chartOpts = {
        dataSource: data,
        paging: {
          enabled: true
        },
        //editing: {
        //  editMode: 'row',
        //  editEnabled: true,
        //  removeEnabled: true,
        //  insertEnabled: true,
        //  removeConfirmMessage: 'Are you sure you want to delete this record?'
        //},
        //selection: {
        //  mode: 'multiple'
        //},
        columns: myPulledColumnsAll,
        allowColumnResizing: true,
        groupPanel: {visible: true},
        grouping: {autoExpandAll: false}
      };

      //APPEND
      $(selector).dxDataGrid(chartOpts);

    },

    pivotTable: function (selector, chartInfo, data, whoIsActive, chartSelector) {

      var dataConfig = chartInfo.settings.dataConfig;
      //fill in rows
      var tempFields = [];
      for (var i = 0; (dataConfig && i < dataConfig.length); i++) {
        // r-o-w-s
        if (dataConfig[i].pivot && (dataConfig[i].pivot.role == 'row')) {

          var insertThis = {
            caption: dataConfig[i].fieldName,
            width: 120,
            dataField: dataConfig[i].fieldAlias,
            area: dataConfig[i].pivot.role,
          }
          if (dataConfig[i].hasOwnProperty('areaIndex'))
            insertThis.areaIndex = dataConfig[i].areaIndex;

          tempFields.push(insertThis);
        }
        // c-o-l-s
        if (dataConfig[i].pivot && (dataConfig[i].pivot.role == 'column')) {

          for (var j = 0; j < dataConfig[i].pivot.group.length; j++) {

            var groupPeriod = dataConfig[i].pivot.group[j];
            //console.log(groupPeriod);
            var insertThis = {
              caption: dataConfig[i].fieldName,
              dataField: dataConfig[i].fieldAlias,
              area: dataConfig[i].pivot.role,
              dataType: dataConfig[i].type,
              groupInterval: groupPeriod,
            }
            if (dataConfig[i].hasOwnProperty('areaIndex'))
              insertThis.areaIndex = dataConfig[i].areaIndex;
            tempFields.push(insertThis);
          }
        }
        // d-a-t-a
        if (dataConfig[i].pivot && (dataConfig[i].pivot.role == 'data')) {

          var insertThis = {
            caption: dataConfig[i].fieldName,
            dataField: dataConfig[i].fieldAlias,
            area: dataConfig[i].pivot.role,
            dataType: dataConfig[i].type,
            summaryType: chartInfo.settings.tableConfig.pivotConfig.summaryType,
            format: dataConfig[i].pivot.format,
            precision: dataConfig[i].pivot.precision
          }
          //console.log(insertThis);
          tempFields.push(insertThis);
        }

      }

      console.log('tmp flds');
      console.log(tempFields);

      //Stolen from: http://jsfiddle.net/wf1p3bew/
      var dataSource = new DevExpress.data.PivotGridDataSource({
        store: data,
        fields: tempFields,
      });

      dataSource.load().done(function () {

        console.log('DS load done');
        //console.log(chartInfo.settings.tableConfig.pivotConfig.expandRows);
        //console.log(chartInfo.settings.tableConfig.pivotConfig.expandColumns);
        expander(chartInfo.settings.tableConfig.pivotConfig.expandRows, chartInfo.settings.tableConfig.pivotConfig.expandColumns, dataSource);

        //add some params
        chartInfo.settings.tableConfig.pivotConfig.texts = rusification;
        chartInfo.settings.tableConfig.pivotConfig.allowExpandAll = true;
        chartInfo.settings.tableConfig.pivotConfig.allowFiltering = true;
        chartInfo.settings.tableConfig.pivotConfig.allowSorting = true;
        chartInfo.settings.tableConfig.pivotConfig.allowSortingBySummary = true;
        chartInfo.settings.tableConfig.pivotConfig.heatmap = {
          on: false,
          onWithTotal: false,
          min: undefined,
          max: undefined,
          minTotal: undefined,
          maxTotal: undefined,
          minValueWithTotal: undefined,
          maxValueWithTotal: undefined
        };
        chartInfo.settings.tableConfig.pivotConfig.onCellPrepared = function (e) {
          //console.log('onCellPrepared')
          //console.log(e)

          //Find min and max
          //among data
          if (chartInfo.settings.tableConfig.pivotConfig.heatmap.on) {
            if (e.area == "data") {
              var value = parseInt(e.cell.text);
              if (chartInfo.settings.tableConfig.pivotConfig.heatmap.minTotal == undefined)
                chartInfo.settings.tableConfig.pivotConfig.heatmap.minTotal = chartInfo.settings.tableConfig.pivotConfig.heatmap.minValueWithTotal = chartInfo.settings.tableConfig.pivotConfig.heatmap.maxValueWithTotal = chartInfo.settings.tableConfig.pivotConfig.heatmap.maxTotal = chartInfo.settings.tableConfig.pivotConfig.heatmap.min;

              if ((e.cell.rowType == "D") && (e.cell.columnType == "D")) {
                if (value == 363)
                  console.log(e)
                if (chartInfo.settings.tableConfig.pivotConfig.heatmap.minValueWithTotal > value)
                  chartInfo.settings.tableConfig.pivotConfig.heatmap.minValueWithTotal = value;
                if (chartInfo.settings.tableConfig.pivotConfig.heatmap.maxValueWithTotal < value)
                  chartInfo.settings.tableConfig.pivotConfig.heatmap.maxValueWithTotal = value;
              }
              if ((e.cell.rowType == "T") || (e.cell.columnType == "T") || (e.cell.rowType == "GT") || (e.cell.columnType == "GT")) {
                if (chartInfo.settings.tableConfig.pivotConfig.heatmap.minTotal > value)
                  chartInfo.settings.tableConfig.pivotConfig.heatmap.minTotal = value;
                if (chartInfo.settings.tableConfig.pivotConfig.heatmap.maxTotal < value)
                  chartInfo.settings.tableConfig.pivotConfig.heatmap.maxTotal = value;
              }


              var minValue = chartInfo.settings.tableConfig.pivotConfig.heatmap.min;
              var maxValue = chartInfo.settings.tableConfig.pivotConfig.heatmap.max;
              var color;

              if ((e.cell.rowType == "D") && (e.cell.columnType == "D")) {
                if (chartInfo.settings.tableConfig.pivotConfig.heatmap.onWithTotal) {
                  minValue = chartInfo.settings.tableConfig.pivotConfig.heatmap.minValueWithTotal;
                  maxValue = chartInfo.settings.tableConfig.pivotConfig.heatmap.maxValueWithTotal;
                  //console.log('after D' + minValue + '; ' + '; ' + maxValue);
                }
              }
              if ((e.cell.rowType == "T") || (e.cell.columnType == "T") || (e.cell.rowType == "GT") || (e.cell.columnType == "GT")) {
                if (chartInfo.settings.tableConfig.pivotConfig.heatmap.onWithTotal) {
                  minValue = chartInfo.settings.tableConfig.pivotConfig.heatmap.minTotal;
                  maxValue = chartInfo.settings.tableConfig.pivotConfig.heatmap.maxTotal;
                  //console.log('after T ' + minValue + '; ' + '; ' + maxValue);
                }
              }

              if (!isNaN(value)) {
                var variation = Math.round(510 * (value - minValue) / (maxValue - minValue));
                if (variation >= 255) {
                  var b = (510 - variation);
                  var r = 255;
                } else {
                  var b = 255;
                  var r = (variation);
                }
                color = r + ',0,' + b;
                e.cellElement.css("background", 'rgb(' + color + ')');
              }

            }
          }
          else
            e.cellElement.css("background", '');
        };

        $(selector).dxPivotGrid(chartInfo.settings.tableConfig.pivotConfig);

        //APPEND
        $(selector).dxPivotGrid({dataSource: dataSource});

        dataSource.on("changed", function () {
          console.log('DS changed')
          if (chartInfo.settings.defaultKind != 'table') {
            if (whoIsActive == 'pie' || whoIsActive == 'doughnut')
              $(chartSelector).dxPieChart("option", "dataSource", createChartDataSource(dataSource));
            else {
              if (whoIsActive != 'map' && whoIsActive != 'gauge' && whoIsActive != 'scale' && whoIsActive != 'text')
                $(chartSelector).dxChart("option", "dataSource", createChartDataSource(dataSource));
            }
            if ($('#pivotTable').dxPivotGrid('instance')) {
              var data = $('#pivotTable').dxPivotGrid('instance').getDataSource().getData();
              console.log(data)
              var rows_max = [];
              var rows_min = [];
              for (var i = 0; i < data.values.length; i++) {
                var max_of_array = Math.max.apply(Math, data.values[i]);
                var min_of_array = Math.min.apply(Math, data.values[i]);
                rows_max.push(max_of_array);
                rows_min.push(min_of_array);
              }
              var maxOfMaxs = Math.max.apply(Math, rows_max);
              var minOfMins = Math.min.apply(Math, rows_min);
              chartInfo.settings.tableConfig.pivotConfig.heatmap.min = minOfMins;
              chartInfo.settings.tableConfig.pivotConfig.heatmap.max = maxOfMaxs;

              var dataFields = this.getAreaFields("data");
              console.log(dataFields);
            }
          }

          //dataSource.load()
          //  .done(function(result) {
          //    console.log('DS load done')
          //    //ServiceAnalysis.heatmap();
          //  });
        });

      });


    },

    //pivotOnChangeBindingToChart: function (pivotSelector, chartSelector, whoIsActive) {
    //  var pivotGridDataSource = $(pivotSelector).dxPivotGrid("instance").getDataSource();
    //  pivotGridDataSource.on("changed", function () {
    //    if (whoIsActive != 'pie' && whoIsActive != 'map' && whoIsActive != 'gauge' && whoIsActive != 'scale' && whoIsActive != 'text') {
    //      $(chartSelector).dxChart("option", "dataSource", createChartDataSource(pivotGridDataSource));
    //    }
    //  });
    //
    //},

    expand: function (rows, columns) {
      var dataSource = $('#pivotTable').dxPivotGrid('instance').getDataSource();
      expander(rows, columns, dataSource);
      //APPEND

      //$('#pivotTable').dxPivotGrid({dataSource: dataSource});

    }

  }
})
