/**
 * Created by Hel on 03.11.2015.
 */
tstApp.controller("ZoomViewController", function ($scope, $uibModalInstance, DataToPassInModal, ServiceDraw, ServiceExport, ServiceResize, ServiceTable, ServiceAnalysis, $rootScope, $timeout, $window) {


  $scope.chartInfo = DataToPassInModal.chartInfo;
  $scope.myData = DataToPassInModal.myData;
  $scope.whoIsActive = DataToPassInModal.whoIsActive;

  //expose service
  $scope.$ServiceExport = ServiceExport;

  $scope.draw = function (whoIsActive) {

    $scope.whoIsActive = whoIsActive;
    $rootScope.mycharts[$scope.chartInfo.id].whoIsActive = $scope.whoIsActive;

    if (whoIsActive != 'table') {
      var width = $(window).width(), height = $(window).height();
      if (whoIsActive == 'map') { //scale chart for maps only
        $('#zoomViewMainPanelTopContainer').height((height * 0.85) + "px");
      }
      else
        $('#zoomViewMainPanelTopContainer').height((height * 0.65) + "px");
    }

    if ($scope.chartInfo.settings.defaultKind != 'table')
      ServiceDraw.whoToRedraw(whoIsActive, "#chart", $scope.chartInfo, $scope.myData);

    if ($scope.chartInfo.settings.tableConfig.table == 'simple')
      ServiceTable.simpleTable("#simpleTable", $scope.chartInfo.settings.dataConfig, $scope.myData);

    if ($scope.chartInfo.settings.tableConfig.table == 'pivot') {
      try {
        $("#pivotTable").dxPivotGrid('instance');
        if ($scope.chartInfo.settings.defaultKind != 'table')
          $("#chart").dxChart("option", "dataSource", createChartDataSource($("#pivotTable").dxPivotGrid("instance").getDataSource()));
      } catch (e) {
        ServiceTable.pivotTable("#pivotTable", $scope.chartInfo, $scope.myData, whoIsActive, '#chart');
      }
    }
  }

  $scope.ok = function () {

    $uibModalInstance.close($scope.subject);

  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };


  $scope.$on("angular-resizable.resizing", function (event, args) {
    ServiceResize.renderChartDependingOnItsType($scope.chartInfo.settings.defaultKind, "#chart");
  });


  $scope.hideSettings = function () {
    if ($("#zoomViewLeftPanel").hasClass('col-md-4')) {
      $("#zoomViewLeftPanel").removeClass('col-md-4');
      $("#zoomViewLeftPanel").addClass('underCover');
      $("#zoomViewMainPanel").removeClass('col-md-8');
      $("#zoomViewMainPanel").addClass('col-md-12');
    }
    else {
      $("#zoomViewLeftPanel").removeClass('underCover');
      $("#zoomViewLeftPanel").addClass('col-md-4');
      $("#zoomViewMainPanel").removeClass('col-md-12');
      $("#zoomViewMainPanel").addClass('col-md-8');
    }
    //Refresh
    ServiceResize.renderChartDependingOnItsType($scope.whoIsActive, "#chart");
    if ($scope.chartInfo.settings.tableConfig.table == 'pivot')
      ServiceResize.renderChartDependingOnItsType('pivot', "#pivotTable");
    if ($scope.chartInfo.settings.tableConfig.table == 'simple')
      ServiceResize.renderChartDependingOnItsType('simple', "#simpleTable");

  }


  $scope.modifyPivotTable = function () {

    $('#pivotTable').dxPivotGrid($scope.chartInfo.settings.tableConfig.pivotConfig);

  }

  $scope.expand = function () {
    $scope.chartInfo.settings.tableConfig.pivotConfig.heatmap.minTotal=undefined;
    ServiceTable.expand($scope.chartInfo.settings.tableConfig.pivotConfig.expandRows, $scope.chartInfo.settings.tableConfig.pivotConfig.expandColumns);
  }

  $scope.totalFunction = function (newType) {

    $scope.chartInfo.settings.tableConfig.pivotConfig.heatmap.minTotal=undefined;
    $scope.chartInfo.settings.tableConfig.pivotConfig.summaryType = newType;

    var dataSource = $('#pivotTable').dxPivotGrid('instance').getDataSource();

    var datas = dataSource.getAreaFields("data");
    for (var i = 0; i < datas.length; i++) {
      datas[i].summaryType = $scope.chartInfo.settings.tableConfig.pivotConfig.summaryType;

      //example: http://jsfiddle.net/gq4b63oL/40/
      if (newType == 'custom') {
        datas[i].calculateCustomSummary = function (options) {

          if (options.summaryProcess == 'start') {
            // Initializing "totalValue" here
            var deviation = {
              prev: 0,
              total: 0
            }
            options.totalValue = deviation;
            console.log('stage: start, val: ' + options.value);
            //console.log(options);
          }
          if (options.summaryProcess == 'calculate') {
            // Modifying "totalValue" here
            //console.log('stage: calculate ' );
            //console.log(options);
            var deviation = {
              prev: options.value,
              total: options.value - options.totalValue.prev
            }
            options.totalValue = deviation;
            console.log(deviation);
          }
          if (options.summaryProcess == 'finalize') {
            // Assigning the final value to "totalValue" here
            //console.log('stage: finalize ' );
            //console.log(options);
            options.totalValue = options.totalValue.total ; //- options.totalValue.prev;
            console.log('fin: ' + options.totalValue )
          }
        };
      }
    }


    $('#pivotTable').dxPivotGrid($scope.chartInfo.settings.tableConfig.pivotConfig);
    $('#pivotTable').dxPivotGrid({dataSource: dataSource});
  }

  $scope.heatmap = function () {

    //when main turned off, minor also should be
    if(!$scope.chartInfo.settings.tableConfig.pivotConfig.heatmap.on)
       $scope.chartInfo.settings.tableConfig.pivotConfig.heatmap.onWithTotal = false;

    $('#pivotTable').dxPivotGrid($scope.chartInfo.settings.tableConfig.pivotConfig);
  }



    //if($scope.heatmapOn){
    //  $scope.chartInfo.settings.tableConfig.pivotConfig.onOptionChanged = function () {
    //    console.log('op chnd');
    //    $scope.heatmap();
    //  }
    //  $('#pivotTable').dxPivotGrid($scope.chartInfo.settings.tableConfig.pivotConfig);
    //}
    //else{
    //  //$('#pivotTable').dxPivotGrid('instance').off('optionChanged');
    //}

  //}

  //$scope.$watch(function (scope) {
  //
  //    //var underControl;
  //    //if(scope.chartInfo.settings.defaultKind != 'table')
  //    //  underControl = $("#chart");
  //    //else {
  //    //  if (scope.chartInfo.settings.tableConfig == 'pivot')
  //    //    underControl = $("#pivotTable");
  //    //  if (scope.chartInfo.settings.tableConfig == 'simple')
  //    //    underControl = $("#simpleTable");
  //    //}
  //    console.log('watch')
  //    //$scope.heatmap();
  //    return $('#pivotTable').dxPivotGrid('instance').getDataSource(); //$scope.chartInfo.settings.tableConfig.pivotConfig ; //($("#pivotTable"))
  //  },
  //  function (newValue) {
  //    console.log('watch fire')
  //    $scope.heatmap();
  //    //if (newValue[0].firstChild!=null)
  //    //  $timeout( $scope.heatmap(), 0);  //Calling a scoped method
  //
  //  });
  //$scope.$watch(function ($scope){
  //    console.log('watch')
  //    //$('#pivotTable').dxPivotGrid('instance').getDataSource();
  //    var tableData = $('.dx-bottom-row');
  //    var tableDataMeat = $('.dx-pivotgrid-area-data', tableData);
  //    return tableDataMeat;
  //  },
  //  function(newValue, oldValue) {
  //    console.log('watch fire')
  //  //$scope.heatmap();
  //});

})

