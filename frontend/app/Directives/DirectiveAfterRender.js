/**
 * Created by Hel on 30.09.2015.
 */

//Директива выставляет флаг, когда отрисовка всех my-box закончена (переменные ангуляра готовы, и можно рисовать чарты)

tstApp.directive('afterRender', ['$timeout', function ($timeout, $rootScope) {
  var def = {
    restrict: 'A',
    terminal: true,
    transclude: true,
    link: function (scope, element, attrs) {

     $timeout(scope.$eval(attrs.afterRender), 0);  //Calling a scoped method
    }
  };
  return def;
}]);
