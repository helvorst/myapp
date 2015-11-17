/**
 * Created by Hel on 05.11.2015.
 */


tstApp.directive('afterRenderModal', ['$timeout', function ($timeout) {
  return {
    restrict: 'A',
    //terminal: true,
    //transclude: true,
    link: function (scope, element, attrs) {
      var unregister = scope.$watch(function (scope) {

          //var underControl;
          //if(scope.chartInfo.settings.defaultKind != 'table')
          //  underControl = $("#chart");
          //else {
          //  if (scope.chartInfo.settings.tableConfig == 'pivot')
          //    underControl = $("#pivotTable");
          //  if (scope.chartInfo.settings.tableConfig == 'simple')
          //    underControl = $("#simpleTable");
          //}
          return ($("#chart"))
        },
        function (newValue, oldValue) {
          $timeout(scope.$eval(attrs.afterRenderModal), 0);  //Calling a scoped method
          if (newValue[0].firstChild!=null)
             unregister();

          if(scope.chartInfo.settings.defaultKind == 'table')
            unregister();
        });
    }
  }

}]);

//
//tstApp.directive('watchTableChange', ['$timeout', function ($timeout) {
//  return {
//    restrict: 'A',
//    //terminal: true,
//    //transclude: true,
//    link: function (scope, element, attrs) {
//      var unregister = scope.$watch(function (scope) {
//
//          //var underControl;
//          //if(scope.chartInfo.settings.defaultKind != 'table')
//          //  underControl = $("#chart");
//          //else {
//          //  if (scope.chartInfo.settings.tableConfig == 'pivot')
//          //    underControl = $("#pivotTable");
//          //  if (scope.chartInfo.settings.tableConfig == 'simple')
//          //    underControl = $("#simpleTable");
//          //}
//          console.log('watch')
//          return ($("#pivotTable"))
//        },
//        function (newValue, oldValue) {
//          console.log('watch fire')
//          if (newValue[0].firstChild!=null)
//          $timeout(scope.$eval(attrs.watchTableChange), 0);  //Calling a scoped method
//
//        });
//    }
//  }
//
//}]);

