/**
 * Created by Hel on 29.09.2015.
 */
tstApp.constant('chartsOptions', {


  gridOptions: {

    dataSource: undefined
    ,
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
    columns: undefined,
    allowColumnResizing: true

  },

  pivotOptons:  {
    allowSortingBySummary: true,
    allowSorting: true,
    allowFiltering: true,
    allowExpandAll: true,
    //height: 440,

    dataSource: {
      fields: undefined,

      store: undefined
    }
  },

  chartNameOptions: {
    font: {
      color: 'black',
      family: 'Play',
      opacity: 0.9,
      size: 20,
      weight: 400
    },
    margin: {
      left: 10,
      right: 10,
      top: 20
    }
  },

  exporterOptions: {
    sourceContainer: undefined ,
    serverUrl: 'http://127.0.0.1:3003',
    exportFormat: ['PDF', 'PNG', 'SVG', 'JPEG', 'GIF'],
    fileName: undefined
  }

});





