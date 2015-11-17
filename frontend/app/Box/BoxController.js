/**
 * Created by Hel on 24.09.2015.
 */
tstApp.controller('BoxController', function ($scope, $state, chartsOptions, $rootScope, REST, $stateParams, $compile, $uibModal, ServiceDraw, ServiceTable) {

    $scope.spinner = true;
    $scope.myData = undefined;
    $scope.myDataConfig = $scope.chartInfo.settings.dataConfig;
    $scope.myChartConfig = $scope.chartInfo.settings.chartConfig;

    /////////////////////////////////////////////////////////////////////////////
    //FIRST OF ALL, LETS REST OUR DATA
    /////////////////////////////////////////////////////////////////////////////

    REST.getChartData($rootScope.dashId, $scope.chartInfo.processor)
      .then(function (chartDatus) {
        //получить  дата
        var chartData = chartDatus.plain();
        console.log('got my data for proc ' + $scope.chartInfo.processor);
        $scope.myData = chartData;
        console.log($scope.myData);

        $rootScope.mycharts[$scope.chartInfo.id].dataLoaded = true;


      }, function (error) {
        console.log("Не удалось получить данные для процессора дэшборда с ИД " + $scope.chartInfo.processor);
        console.log(error);
      })

    /////////////////////////////////////////////////////////////////////////////
    //Начальные настройки Ш и В бокса
    /////////////////////////////////////////////////////////////////////////////
    function setupBox() {

      var thisChart = "#fuckenSingleChartID" + $scope.chartInfo.id;
      $(thisChart).css('min-height', ($scope.chartInfo.settings.defaultHeight + "px"));
      $(thisChart).css('min-width', ($scope.chartInfo.settings.defaultWidth + "px"));


      var box = "#box" + $scope.chartInfo.id;
      $(box).css('min-height', (($scope.chartInfo.settings.defaultHeight + 5) + "px"));
      $(box).css('min-width', ($scope.chartInfo.settings.defaultWidth + "px"));
    }


    /////////////////////////////////////////////////////////////////////////////
    //////////////////////////OPEN MODAL
    /////////////////////////////////////////////////////////////////////////////
    $("#box" + $scope.chartInfo.id).dblclick(function (e) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/Box/ZoomView.html',
        controller: 'ZoomViewController',
        windowClass: 'zoom-view-modal',
        backdrop: 'static',
        resolve: {
          DataToPassInModal: function () {

            var datus = {
              chartInfo: $scope.chartInfo,
              myData: $scope.myData,
              whoIsActive: $scope.whoIsActive
            }
            return datus;
          }
        }
      });

      modalInstance.result.then(function (editedSubjectFromModal) {
      })
    })

    /////////////////////////////////////////////////////////////////////////////
    ///////////////////////////REDRAW
    /////////////////////////////////////////////////////////////////////////////
    $scope.AppendTableAndChartToBox = function () {

      var tableSelector = "#fuckenTableID" + $scope.chartInfo.id;
      var chartSelector = "#fuckenSingleChartID" + $scope.chartInfo.id;
      var tablePivotSelector = "#fuckenPivotTableID" + $scope.chartInfo.id;
      $scope.whoIsActive = $scope.chartInfo.settings.defaultKind;
      $rootScope.mycharts[$scope.chartInfo.id].whoIsActive = $scope.whoIsActive;

      //---0) APPEND TABLE
      if ($scope.chartInfo.settings.tableConfig.table == 'simple')
        ServiceTable.simpleTable(tableSelector, $scope.chartInfo, $scope.myData)
      //---1) APPEND TABLE PIVOT
      if ($scope.chartInfo.settings.tableConfig.table == 'pivot')
        ServiceTable.pivotTable(tablePivotSelector, $scope.chartInfo, $scope.myData, $scope.whoIsActive, chartSelector)
      //---2) Resize container
      setupBox();
      //---3) APPEND CHART
      if ($scope.chartInfo.settings.defaultKind != 'table')
        ServiceDraw.whoToRedraw($scope.whoIsActive, chartSelector, $scope.chartInfo, $scope.myData);

    }


  }
)


////---5) INIT EXPORTER
//chartsOptions.exporterOptions.sourceContainer = '#fuckenSingleChartID' + $scope.chartInfo.id;
//chartsOptions.exporterOptions.fileName = $scope.chartInfo.name.substring(0, 255);
//$("#exportMenu" + $scope.chartInfo.id).dxExporter(chartsOptions.exporterOptions);
/////////////////////////////////////////////////////////////////////////////
//TWO TABLES
/////////////////////////////////////////////////////////////////////////////
//$scope.AppendTableToContainer = function () {
//
//
//  var myPulledColumnsAll = [];
//  for (var i = 0; ($scope.myDataConfig && i < $scope.myDataConfig.length); i++) {
//
//    var myNewColumn = {
//      dataField: $scope.myDataConfig[i].fieldAlias,
//      caption: $scope.myDataConfig[i].fieldName
//    }
//    myPulledColumnsAll.push(myNewColumn);
//  }
//
//  //DATA
//  chartsOptions.gridOptions.dataSource = $scope.myData;
//  //COLUMNS
//  chartsOptions.gridOptions.columns = myPulledColumnsAll;
//
//  //Когда отрисован чарт и таблица - можно задавать ширину и высоту бокса, чтобы бокс авторастянулся
//  setupBox();
//
//  //BIND OPTIONS
//  var tableID = "#fuckenTableID" + $scope.chartInfo.id;
//  //console.log($(tableID).width());
//  $(tableID).dxDataGrid(chartsOptions.gridOptions);
//
//
//}

//$scope.pullMyColumnsY = function () {
//
//  //console.log('pullMyColumnsX for cht:' + $scope.chartInfo.id);
//  for (var i = 0; (($scope.myDataConfig!=undefined) && i < $scope.myDataConfig.length); i++) {
//    if ($scope.myDataConfig[i].isY) {
//      var myNewColumnY = {
//        dataField: $scope.myDataConfig[i].fieldAlias,
//        caption: $scope.myDataConfig[i].fieldName,
//        checked: $scope.myDataConfig[i].checked
//      }
//      $scope.myPulledColumnsY.push(myNewColumnY);
//    }
//  }
//}
//
//$scope.pullMyColumnsX = function () {
//  for (var i = 0; (($scope.myDataConfig!=undefined) && i < $scope.myDataConfig.length); i++) {
//    if ($scope.myDataConfig[i].isX) {
//      var myNewColumnX = {
//        dataField: $scope.myDataConfig[i].fieldAlias,
//        caption: $scope.myDataConfig[i].fieldName,
//        checked: $scope.myDataConfig[i].checked,
//        dataType: $scope.myDataConfig[i].type
//      }
//      $scope.myPulledColumnsX.push(myNewColumnX);
//    }
//  }
//}


//$scope.newArgumentForOptions = undefined;
//$scope.newValueSeriesForOptions = [];
//
//$scope.defineNewArgumentAndValue = function () {
//
//  console.log('defineNewArgumentAndValue');
//  //Подготовить серии икс и игрек, если их еще нет
//  if ($scope.myPulledColumnsX.length == 0)
//    $scope.pullMyColumnsX();
//  if ($scope.myPulledColumnsY.length == 0)
//    $scope.pullMyColumnsY();
//
//  //console.log('pulled:');
//  //console.log($scope.myPulledColumnsX);
//  //console.log($scope.myPulledColumnsY);
//
//  //clean before use
//  $scope.newValueSeriesForOptions = [];
//  //Find X
//  for (var i = 0; i < $scope.myPulledColumnsX.length; i++) {
//    if ($scope.myPulledColumnsX[i].checked == true) {
//      $scope.newArgumentForOptions =
//      {
//        argField: $scope.myPulledColumnsX[i].dataField,
//        argType: $scope.myPulledColumnsX[i].dataType
//      }
//    }
//  }
//  //Find Y
//  for (var i = 0; i < $scope.myPulledColumnsY.length; i++) {
//    if ($scope.myPulledColumnsY[i].checked == true) {
//      var newEntry = {
//        //argumentField: 'x',
//        valueField: $scope.myPulledColumnsY[i].dataField,
//        name: $scope.myPulledColumnsY[i].caption
//
//      }
//      $scope.newValueSeriesForOptions.push(newEntry);
//    }
//  }
//}


//if (whoToRedraw == 'pie') {
//прочистить щеки
//$scope.newArgument = [];
//$scope.newValue = [];
//
//chartsOptions.myOptions.commonSeriesSettings.argumentField = undefined;
//chartsOptions.myOptions.series = undefined;
//
//for (var i = 0; i < $scope.myDataConfig.length; i++) {
//
//  //Find X
//  if (($scope.myDataConfig[i].isX == true) && ($scope.myDataConfig[i].checked == true)) {
//    var newEntryX = {
//      argumentField: $scope.myDataConfig[i].fieldAlias
//      //argType: $scope.myPulledColumnsX[i].dataType
//    }
//    $scope.newArgument.push(newEntryX);
//  }
//  //Find Y
//  if (($scope.myDataConfig[i].isY == true) && ($scope.myDataConfig[i].checked == true)) {
//    var newEntryY = {
//      valueField: $scope.myDataConfig[i].fieldAlias,
//      name: $scope.myDataConfig[i].fieldName
//    }
//    $scope.newValue.push(newEntryY);
//  }
//
//}
//
//if (($scope.newArgument != undefined) && ($scope.newValue != undefined)) {
//  if ($scope.newArgument.length > 0) {
//    chartsOptions.myOptions.commonSeriesSettings.argumentField = $scope.newArgument[0].argumentField;
//    if ($scope.newValue.length > 0) {
//
//      //Series
//      chartsOptions.myOptions.series = $scope.newValue;
//      //DATA
//      chartsOptions.myOptions.dataSource = $scope.myData;
//      //TYPE
//      chartsOptions.myOptions.commonSeriesSettings.type = whoToRedraw;
//
//      //X-axis type   SHOULD I USE IT?
//      //chartsOptions.myOptions.argumentAxis.argumentType = $scope.newArgumentForOptions.argType;
//      //NAME
//      chartsOptions.myOptions.title.text = $rootScope.mycharts[$scope.chartInfo.id].name;
//    }
//  }
//}


//$("#fuckenSingleChartID" + $scope.chartInfo.id).dxPieChart(chartsOptions.myOptions);
//$("#fuckenSingleChartID" + $scope.chartInfo.id).dxPieChart("option", "dataSource", createChartDataSource(pivotGridDataSource));
//}
//else {

//$scope.redraw = function (whoToRedraw) {
//
//
//  console.log('Gonna draw:' + whoToRedraw);
//
//  $rootScope.mycharts[$scope.chartInfo.id].active = whoToRedraw;
//  $scope.whoIsActive = whoToRedraw;
//
//  //прочистить щеки
//  $scope.newArgument = [];
//  $scope.newValue = [];
//
//  chartsOptions.myOptions.commonSeriesSettings.argumentField = undefined;
//  chartsOptions.myOptions.series = undefined;
//
//  for (var i = 0; i < $scope.myDataConfig.length; i++) {
//
//    //Find X
//    if (($scope.myDataConfig[i].isX == true) && ($scope.myDataConfig[i].checked == true)) {
//      var newEntryX = {
//        argumentField: $scope.myDataConfig[i].fieldAlias
//        //argType: $scope.myPulledColumnsX[i].dataType
//      }
//      $scope.newArgument.push(newEntryX);
//    }
//    //Find Y
//    if (($scope.myDataConfig[i].isY == true) && ($scope.myDataConfig[i].checked == true)) {
//      var newEntryY = {
//        valueField: $scope.myDataConfig[i].fieldAlias,
//        name: $scope.myDataConfig[i].fieldName
//      }
//      $scope.newValue.push(newEntryY);
//    }
//
//  }
//
//  if (($scope.newArgument != undefined) && ($scope.newValue != undefined)) {
//    if ($scope.newArgument.length > 0) {
//      chartsOptions.myOptions.commonSeriesSettings.argumentField = $scope.newArgument[0].argumentField;
//      if ($scope.newValue.length > 0) {
//
//        //Series
//        chartsOptions.myOptions.series = $scope.newValue;
//        //DATA
//        chartsOptions.myOptions.dataSource = $scope.myData;
//        //TYPE
//        chartsOptions.myOptions.commonSeriesSettings.type = whoToRedraw;
//
//        //X-axis type   SHOULD I USE IT?
//        //chartsOptions.myOptions.argumentAxis.argumentType = $scope.newArgumentForOptions.argType;
//        //NAME
//        chartsOptions.myOptions.title.text = $rootScope.mycharts[$scope.chartInfo.id].name;
//      }
//
//      console.log('cht options');
//      console.log(chartsOptions.myOptions);
//
//      var chartID = "#fuckenSingleChartID" + $scope.chartInfo.id;
//      $(chartID).empty();
//      $(chartID).removeData();
//      if (whoToRedraw == 'pie')
//        $(chartID).dxPieChart(chartsOptions.myOptions);
//      else
//        $(chartID).dxChart(chartsOptions.myOptions);
//
//
//    }
//  }
//
//
//}


//OPEN LEFT PANEL
//$scope.openLeftPanel = function (id) {
//  var lMenu = $("#leftPanel" + id);
//  if (lMenu.hasClass("underCover")) {
//    lMenu.removeClass('underCover'); //.animate({'margin-left': '0px'});
//  } else {
//    lMenu.addClass('underCover'); //.animate({'margin-left': '-50%'})
//  }
//};
//$(".mycontainer").click(function (e) {
//  $("#leftPanel" + $scope.chartInfo.id).addClass('underCover');
//})
////OPEN TABLE
//$scope.openTable = function (id) {
//  var tbl = $("#fuckenTableID" + id)
//  if (tbl.hasClass("underCover")) {
//    tbl.removeClass('underCover'); //.animate({'margin-left': '0px'});
//  } else {
//    tbl.addClass('underCover'); //.animate({'margin-left': '-50%'})
//  }
//
//  var tblPiv = $("#fuckenPivotTableID" + id);
//  if (tblPiv.hasClass("underCover")) {
//    tblPiv.removeClass('underCover'); //.animate({'margin-left': '0px'});
//  } else {
//    tblPiv.addClass('underCover'); //.animate({'margin-left': '-50%'})
//  }
//
//
//  //redraw box
//  var args = {};
//  args.id = "box" + id;
//  args.width = false;
//  //a bit of cheating
//  args.height = 1; // $( "#box" + id).height();
//
//  $rootScope.resizeCalculations(args);
//
//};
//ZOOM VIEW
//$scope.zoomView = function (id) {
//
//  var modalInstance = $uibModal.open({
//    animation: true,
//    templateUrl: 'app/Box/ZoomView.html',
//    controller: 'ZoomViewController',
//    windowClass: 'zoom-view-modal',
//    backdrop: 'static',
//    resolve: {
//      DataToPassInModal: function () {
//
//        var datus = {
//          chartInfo: $scope.chartInfo,
//          myData: $scope.myData
//        }
//
//        return datus;
//
//      }
//    }
//  });
//
//  modalInstance.result.then(function (editedSubjectFromModal) {
//
//
//  })
//}
