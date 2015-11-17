/**
 * Created by Hel on 30.09.2015.
 */

//Директива следит за флагами процессора:
//1) rendered - закончена ли отрисовка бокса
//2) dataLoaded - успел ли контроллер бокса получить данные через РЕСТ
//когда оба флага в true, можно чертить чарты

tstApp.directive('afterRenderTbl', ['$timeout', function ($timeout, $rootScope) {
  var def = {
    restrict: 'A',
    terminal: true,
    transclude: false,
    link: function (scope, element, attrs) {

      scope.$watch(function (scope) {
          var ready = (scope.$root.mycharts[(scope.chartInfo.id)].rendered && scope.$root.mycharts[(scope.chartInfo.id)].dataLoaded);
          return ready
        },
        function (newValue, oldValue) {
          if (newValue == true) {
            $timeout(scope.$eval(attrs.afterRenderTbl), 0);  //Calling a scoped method
          }
        });
    }
  };
  return def;
}]);
