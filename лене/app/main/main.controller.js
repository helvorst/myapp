(function () {
  'use strict';

  angular
    .module('bi')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $window) {

    $scope.sidebarCollapsed = false;
    $scope.toggleSidebar = function () {
      $scope.sidebarCollapsed = !$scope.sidebarCollapsed;
    };

    $scope.isTablet = false;
    var w = angular.element($window);
    w.bind('resize', function () {
      if (w.width() <= 768) {

      }
      $scope.isTablet = w.width() <= 76;
      $scope.$apply();
    });

  }
})();
