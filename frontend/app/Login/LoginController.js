/**
 * Created by Hel on 13.10.2015.
 */
tstApp.controller('LoginController', function ($scope, $rootScope, REST, $state) {

  $scope.okCredentials = true;

  $scope.doAuth = function(login, password){

    REST.userAuthenticate(login, password)
      .then(function (authAnswer) {

        var ans = authAnswer.plain();
        if(ans.result == true)
        {

          //store in cookies
          $rootScope.LoggedInAs = ans;
          localStorage.setItem('LoggedInAs', JSON.stringify(ans));
          $state.go('main');

        }
        else
        {
          $scope.okCredentials = false;
        }

      },
      function (error) {
        console.log("Не удалось авторизоваться ");
        console.log(error);
      })
  }
})
