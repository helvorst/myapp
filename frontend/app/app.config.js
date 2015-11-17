angular.module('tstApp').config(function ($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider) {

  // Общая часть пути до ресурсов запрашиваемых через RestAngular
  RestangularProvider.setBaseUrl('http://kiselev:8181/bi/api');
  //RestangularProvider.setBaseUrl('/api');

//Получать предметы для редактирования по коду предмета
  RestangularProvider.setRestangularFields({id: "processor"});


  //****dirtynote****//
  //it was like $urlRouterProvider.otherwise('/main'); first but
  //with e.preventDefault(); in checking if user is logged in $rootScope.$on('$stateChangeStart'... the app goes in infinite loop for some reason
  //github issue: https://github.com/angular-ui/ui-router/issues/600
  // URL по умолчанию
  $urlRouterProvider.otherwise(function ($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("main");
  });

  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: 'app/Main/Main.html',
      controller: 'MainController',
      //template: '',
      //abstract: true,
      data: {
        needToBeLoggedIn: true
      },
      resolve: {
        //Получить список дэшбордов
        getDashList: function (REST, $rootScope) {
          if ($rootScope.mydashes == undefined)
            return REST.getDashList()
              .then(function (dashList) {

                var dirtyDashes = dashList.plain();

                var uniqueDashes = $.unique(dirtyDashes.map(function (d) {
                  return d.group;
                }));

                var uniqueDashesList = [];
                for (var i = 0; i < uniqueDashes.length; i++) {
                  var newGroup = {
                    group: uniqueDashes[i],
                    groupDashes: []
                  };
                  uniqueDashesList.push(newGroup);
                }
                for (var i = 0; i < dirtyDashes.length; i++) {
                  var newDash = {
                    id: dirtyDashes[i].id,
                    name: dirtyDashes[i].name
                  }
                  uniqueDashesList.map(function (d) {
                    if (d.group == dirtyDashes[i].group)
                      d.groupDashes.push(newDash);
                  });

                }

                $rootScope.mydashes = uniqueDashesList;

                console.log($rootScope.mydashes);

              }
              ,
              function (error) {
                console.log("Не удалось получить список дэшбордов");
                console.log(error);
              }
            )
        }
      }
    })

    .state('main.dash', {
      url: '/dash/:dashID/:dashName',
      templateUrl: 'app/Dash/Dash.html',
      controller: 'DashController',
      resolve: {
        //Получить список процессоров
        getChartList: function (REST, $rootScope, $stateParams) {

          console.log('go for: ' + $stateParams.dashID);
          return REST.getChartList($stateParams.dashID)
            .then(function (chartList) {
              //Запомнить список чартов в
              $rootScope.mycharts = chartList.plain();

              console.log($rootScope.mycharts);

            }, function (error) {
              console.log("Не удалось получить список процессоров дэшборда");
              console.log(error);
            })

        }
      }
    })
    .state('main.editdash', {
      url: '/editdash',
      templateUrl: 'app/EditDash/EditDash.html',
      controller: 'EditDashController'
    })

    .state('main.editprocessor', {
      url: '/editprocessor',
      templateUrl: 'app/EditProcessor/EditProcessor.html',
      controller: 'EditProcessorController'
    })

    .state('main.newdash', {
      url: '/newdash',
      templateUrl: 'app/NewDash/NewDash.html',
      controller: 'NewDashController'
    })

    .state('main.newprocessor', {
      url: '/newprocessor',
      templateUrl: 'app/NewProcessor/NewProcessor.html',
      controller: 'NewProcessorController'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'app/Login/Login.html',
      controller: 'LoginController'
    })


})

//tstApp.config(['$httpProvider', function($httpProvider) {
//  $httpProvider.defaults.useXDomain = true;
// // delete $httpProvider.defaults.headers.common['X-Requested-With'];
//}])
