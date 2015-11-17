/**
 * Created by Hel on 13.10.2015.
 */
tstApp.controller('MainController', function ($scope, $rootScope, $cookies, ServiceExport) {

  //expose service
  $scope.$ServiceExport= ServiceExport;

//***********************SORTABLE***************************
//**********************************************************
  $scope.sortableOptions = {
    //update: function(e, ui) { ... },
    axis: 'y, x',
    disabled: true
    //start: function(e, ui) {
    //  console.log('sort: ' + ui.item.sortable.model.sorting);
    //  //if (ui.item.sortable.model.sorting != true) {
    //    ui.item.sortable.cancel();
    //  //}
    //}
  };

  //Включение/отключение возможности таскания боксов
  $scope.allowSorting = function (id){
    $scope.sortableOptions.disabled = !$scope.sortableOptions.disabled;
  }

//***********************THEME***************************
//**********************************************************
  $scope.changeTheme = function (theme) {
    $rootScope.theme = theme;
    //Запомнить
    localStorage.setItem('theme', JSON.stringify(theme));
  }

})
