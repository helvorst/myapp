/**
 * Created by Hel on 28.09.2015.
 */
tstApp.controller('DashController', function ($scope, $rootScope, appConstants, $stateParams, ServiceResize) {


  //Раскопать имя текущего дэшборда из параметров стейта
  $rootScope.dashId = $stateParams.dashID;
  $scope.dashName = $stateParams.dashName;

  ///////////////////////////////////////////////////////////////////////////////////////
  //RESIZING//////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  $rootScope.resizeCalculations = function (args) {

    //console.log(args);
    var thisBoxID = args.id.substring(3);
    var whoIsActive = $rootScope.mycharts[thisBoxID].whoIsActive;
    //Refresh
    ServiceResize.renderChartDependingOnItsType(whoIsActive, '#fuckenSingleChartID' + thisBoxID);
    if ($rootScope.mycharts[thisBoxID].settings.tableConfig.table == 'pivot')
      ServiceResize.renderChartDependingOnItsType('pivot', '#fuckenPivotTableID' + thisBoxID);
    if ($rootScope.mycharts[thisBoxID].settings.tableConfig.table == 'simple')
      ServiceResize.renderChartDependingOnItsType('simple', '#fuckenTableID' + thisBoxID);


  }

  $scope.$on("angular-resizable.resizing", function (event, args) {
    $rootScope.resizeCalculations(args);
  });


  $scope.$on("angular-resizable.resizeEnd", function (event, args) {
    $rootScope.resizeCalculations(args);
  });


  //Сигнализировать, что отрисовка бокса закончена и переменные ангуляра инициализированы - можно рисовать чарт
  $scope.renderFinished = function (chartID) {
    $rootScope.mycharts[chartID].rendered = true;
    console.log(chartID + " rendered box")

  }


})


//
//if (args.width == false) //VERTICAL RS
//{
//  var availableHeight = args.height;
//  var navbarHeight = $('#navbar' + thisBoxID).height() + $('#chartName' + thisBoxID).height() + 5 ;
//
//  //depends on either table hidden or not
//  //if ($rootScope.mycharts[thisBoxID].pivot == false) { //...for ordinary tbl
//  //  if ($('#fuckenTableID' + thisBoxID).hasClass("underCover"))
//  //    var tableHeight = 3;
//  //  else
//  //    var tableHeight = $('#fuckenTableID' + thisBoxID).height();
//  //}
//  //if ($rootScope.mycharts[thisBoxID].pivot == true) { //...for pivot
//    if ($('#fuckenPivotTableID' + thisBoxID).hasClass("underCover"))
//      var tableHeight = 3;
//    else
//      var tableHeight = $('#fuckenPivotTableID' + thisBoxID).height();
//  //}
//
//  var chartHeight = $rootScope.mycharts[thisBoxID].settings.defaultHeight;
//  var neededHeight = navbarHeight + 20  + tableHeight + $rootScope.mycharts[thisBoxID].settings.defaultHeight;
//
//  if (availableHeight <= neededHeight) {
//    $('#box' + thisBoxID).css('min-height', (neededHeight + "px"));
//  }
//  else {
//    var chartHeight = (availableHeight - navbarHeight  - tableHeight - 20);
//  }
//  if (chartHeight < 0) //when width is negative chart is rendered with auto width
//    chartHeight = 1;
//
//  $('#boxContent' + thisBoxID).height(chartHeight);
//  $('#fuckenSingleChartID' + thisBoxID).height(chartHeight);
//
//  ServiceResize.renderChartDependingOnItsType(thisBoxID);
//}
//
//if (args.height == false) //HORIZONTAL RS
//{
//  var whoIsActive = $rootScope.mycharts[thisBoxID].active;
//  //Refresh
//  ServiceResize.renderChartDependingOnItsType(whoIsActive, '#fuckenSingleChartID' + thisBoxID);
//  if ($scope.chartInfo.settings.tableConfig.table == 'pivot')
//    ServiceResize.renderChartDependingOnItsType('pivot', '#fuckenPivotTableID' + thisBoxID);
//  if ($scope.chartInfo.settings.tableConfig.table == 'simple')
//    ServiceResize.renderChartDependingOnItsType('simple', '#fuckenTableID' + thisBoxID);
//
//  //var availableWidth = args.width;
//  //
//  ////hideNavbarbuttonsOnSmallBoxes(thisBoxID, availableWidth)
//  //
//  //  var chartWidth =   $('#navbar' + thisBoxID).width(); //((availableWidth) - freeSpaceWidth * 4);
//  //
//  //if (chartWidth < 0) //when width is negative chart is rendered with auto width
//  //{
//  //  chartWidth = 1;
//  //
//  //}
//  //
//  //$('#fuckenSingleChartID' + thisBoxID).width(chartWidth);
//  //ServiceResize.renderChartDependingOnItsType(thisBoxID);
//
//  //dont forget fucking table
//  //if ($rootScope.mycharts[thisBoxID].pivot == false) { //...for ordinary tbl
//  //  //костыляка уродливый: при отрисовке я принудительно потавил ширину(иначе разопрет таблицу на всю страницу), а если у контейнера задана ширина - DxDataGrid и не подумает растянуться
//  //  $('#fuckenTableID' + thisBoxID).width('auto');
//  //  var dataGrid = $('#fuckenTableID' + thisBoxID).dxDataGrid('instance');
//  //  dataGrid.repaint();
//  //}
//
//  //and fucken pivot, too
//  //if ($rootScope.mycharts[thisBoxID].pivot == true) { //...for ordinary tbl
//    //костыляка уродливый: при отрисовке я принудительно потавил ширину(иначе разопрет таблицу на всю страницу), а если у контейнера задана ширина - DxDataGrid и не подумает растянуться
//    //$('#fuckenTableID' + thisBoxID).width('auto');
//    //var dataGridPivot = $('#fuckenPivotTableID' + thisBoxID).dxPivotGrid('instance');
//    //dataGridPivot.repaint();
// // }

//}

//function hideNavbarbuttonsOnSmallBoxes(chartID, boxWidth) {
//
//  var lNB = $('#leftNavbarPortion' + chartID);
//  var rNB = $('#rightNavbarPortion' + chartID);
//  var totalNB = lNB.width() + rNB.width();
//  //var navbar = $('#navbar' + chartID);
//  if (totalNB < (boxWidth - appConstants.freeSpaceWidth * 2)) {
//    lNB.removeClass('hideBehind'); //.animate({'margin-left': '0px'});
//    rNB.removeClass('hideBehind'); //.animate({'margin-left': '0px'});
//    //lNB.attr( "disabled", true  );
//    //rNB.attr( "disabled", true  );
//
//  }
//  else {
//    lNB.addClass('hideBehind'); //.animate({'margin-left': '-50%'})
//    rNB.addClass('hideBehind'); //.animate({'margin-left': '0px'});
//  }
//}

//$rootScope.renderChartDependingOnItsType = function(chartID) {
//
//  var active = $rootScope.mycharts[chartID].active;
//
//  switch (active) {
//    case "pie":
//      var chart = $('#fuckenSingleChartID' + chartID).dxPieChart('instance');
//      break
//    case "map":
//      var chart = $('#fuckenSingleChartID' + chartID).dxVectorMap('instance');
//      break
//    case "gauge":
//      var chart = $('#fuckenSingleChartID' + chartID).dxCircularGauge('instance');
//      break
//    case "scale":
//      var chart = $('#fuckenSingleChartID' + chartID).dxLinearGauge('instance');
//      break
//    case "text":
//      var chart = null; //$('#fuckenSingleChartID' + chartID).dxLinearGauge('instance');
//      break
//
//    default:
//      var chart = $('#fuckenSingleChartID' + chartID).dxChart('instance');
//  }
//
//  if(chart)
//    chart.render();
//}
