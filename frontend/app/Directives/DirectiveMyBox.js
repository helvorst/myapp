/**
 * Created by Hel on 28.09.2015.
 */

//Директива просто подставляет шаблон бокса в ng-repeat

tstApp.directive('myBox', function ($window) {
  return {
    restrict: 'E',
    scope: {
      chartInfo: '=info'
    },
    templateUrl: 'app/Box/Box.html',
    controller: 'BoxController'

  }

});

