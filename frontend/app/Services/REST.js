/**
 * Created by Hel on 06.10.2015.
 */
tstApp.factory("REST", function (Restangular) {

  return {
    userAuthenticate: function(login, password){
      console.log('REST.userAuthenticate');
      var credentials = {
        login: login,
        password: password
      }
      return Restangular.one("auth").get({where: credentials});
    },

    getDashList: function () {

      //console.log('REST.getDashList');
      return Restangular.all("dashboards").getList();
    },

    getChartList: function (dashID) {

      //console.log('REST.getChartList for dash ' + dashID);
      return Restangular.all("dashboards/" + dashID + "/processors").getList();
    },

    getChartData: function (dashID, processorID) {
      //console.log('REST.getChartData:' + "dashboards/" + dashID + "/processors/" + processorID);
      return Restangular.one("dashboards/" + dashID + "/processors/" + processorID + "/data").get()
    }


  }

})
