var tstApp = angular.module('tstApp', ['ui.bootstrap', 'restangular', 'ui.router', 'ui.sortable', 'angularResizable', 'dx', 'ngCookies']);

//Правило для запрета доступа
angular.module('tstApp').run(['$rootScope', '$state', '$cookies', function ($rootScope, $state, $cookies) {
  $rootScope.$on('$stateChangeStart', function (e, to) {

    //не залогиненых не пускать
    if (to.data && to.data.needToBeLoggedIn) {
      if(localStorage.getItem('LoggedInAs')) {
        $rootScope.LoggedInAs = JSON.parse(localStorage.getItem('LoggedInAs'));

        console.log('$rootScope.LoggedInAs  from RUN');
        console.log($rootScope.LoggedInAs);
      }
      else
      {
        e.preventDefault();
        $state.go('login');
      }
    }

    //доступ к админке
    if (to.data && to.data.needAdmin) {
      var public = undefined;
      IsAdminModeService.getMode()
        .then(function (isPublic) {
          public = isPublic.plain().isPublic;
          if (public) {
            e.preventDefault();
            $state.go('main.results');
          }
        }),
        function (error) {
          //console.log("Не удалось получить режим работы приложения");
          //console.log(error);
          e.preventDefault();
          $state.go('main.results');
        }

    }

  });
}])


