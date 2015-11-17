/**
 * Created by Hel on 28.09.2015.
 */
tstApp.controller('TableCtrl', function ($scope) {

  var myPulledColumnsAll = [];

  $scope.pullMyColumnsForTable = function () {


    for (var i = 0; i < $scope.myDataConfig.length; i++) {

      var myNewColumn = {
        dataField: $scope.myDataConfig[i].fieldAlias,
        caption: $scope.myDataConfig[i].fieldName
      }
      myPulledColumnsAll.push(myNewColumn);


    }

  }

  $scope.fillWithData=function(){
    $scope.pullMyColumnsForTable();
    //$('#fuckenTableID').dxChart(chartsOptions.myOptions);
    $("#fuckenTableID").dxDataGrid($scope.gridOptions);
  }

  $scope.gridOptions = {
    bindingOptions: {
      dataSource: 'myData'
    },
    paging: {
      enabled: true
    },
    //editing: {
    //  editMode: 'row',
    //  editEnabled: true,
    //  removeEnabled: true,
    //  insertEnabled: true,
    //  removeConfirmMessage: 'Are you sure you want to delete this record?'
    //},
    //selection: {
    //  mode: 'multiple'
    //},
    columns: myPulledColumnsAll

  }

})
