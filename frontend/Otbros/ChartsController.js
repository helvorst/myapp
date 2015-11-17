/**
 * Created by Hel on 24.09.2015.
 */
tstApp.controller('ChartsController', function ($scope) {

  console.log('jogiya');
  $scope.redraw('bar');






})



//
//$scope.myData = [
//  {
//    sovhoz: "Заполярье",
//    x: "Буренка",
//    y: 100,
//    y1: 5,
//    poo: 40,
//    kopyta: 100,
//    word: "Хорошая корова",
//    period: '2012-01-01'
//  },
//  {
//    sovhoz: "Заполярье",
//    x: "Буренка",
//    y: 100,
//    y1: 5,
//    poo: 40,
//    kopyta: 100,
//    word: "Хорошая корова",
//    period: '2012-05-01'
//  },
//  {
//    sovhoz: "Заполярье",
//    x: "Буренка",
//    y: 100,
//    y1: 5,
//    poo: 40,
//    kopyta: 100,
//    word: "Хорошая корова",
//    period: '2012-10-01'
//  },
//  {
//    sovhoz: "Заполярье",
//    x: "Машунька",
//    y: 100,
//    y1: 5,
//    poo: 40,
//    kopyta: 100,
//    word: "Хорошая корова",
//    period: '2012-01-01'
//  },
//  {
//    sovhoz: "Заполярье",
//    x: "Машунька",
//    y: 100,
//    y1: 5,
//    poo: 40,
//    kopyta: 100,
//    word: "Хорошая корова",
//    period: '2012-5-01'
//  },
//  {
//    sovhoz: "Заполярье",
//    x: "Машунька",
//    y: 200,
//    y1: 8,
//    poo: 40,
//    kopyta: 100,
//    word: "Неплохая корова",
//    period: '2012-11-01'
//  },
//  {
//    sovhoz: "ЗРЯ",
//    x: "Тыковка",
//    y: 120,
//    y1: 10,
//    poo: 40,
//    kopyta: 100,
//    word: "Неплохая корова, но могла быть лучше",
//    period: '2012-01-01'
//  },
//  {
//    sovhoz: "ЗРЯ",
//    x: "Тыковка",
//    y: 120,
//    y1: 10,
//    poo: 40,
//    kopyta: 100,
//    word: "Неплохая корова, но могла быть лучше",
//    period: '2012-10-01'
//  },
//  {
//    sovhoz: "ЗРЯ",
//    x: "Тыковка",
//    y: 120,
//    y1: 10,
//    poo: 40,
//    kopyta: 100,
//    word: "Неплохая корова, но могла быть лучше",
//    period: '2012-11-01'
//  },
//  {
//    sovhoz: "Звезда смерти",
//    x: "Пуковка",
//    y: 20,
//    y1: 1,
//    poo: 40,
//    kopyta: 100,
//    word: "молодая корова, простим",
//    period: '2012-01-01'
//  },
//  {
//    sovhoz: "Звезда смерти",
//    x: "Пуковка",
//    y: 20,
//    y1: 1,
//    poo: 40,
//    kopyta: 100,
//    word: "молодая корова, простим",
//    period: '2012-08-01'
//  },
//  {
//    sovhoz: "Звезда смерти",
//    x: "Пуковка",
//    y: 20,
//    y1: 1,
//    poo: 40,
//    kopyta: 100,
//    word: "молодая корова, простим",
//    period: '2012-12-01'
//  }
//];

//
//$scope.myDataConfig = [
//  {
//    fieldName: "Корова",
//    fieldAlias: 'x',
//    isX: true,
//    isY: false,
//    checked: false,
//    type: 'string',
//    pivot: {
//      role: 'row'
//    }
//  },
//  {
//    fieldName: "Совхоз",
//    fieldAlias: 'sovhoz',
//    isX: true,
//    isY: false,
//    checked: true,
//    type: 'string',
//    pivot: {
//      role: 'row'
//    }
//  },
//  {
//    fieldName: "Период",
//    fieldAlias: 'period',
//    isX: true,
//    isY: false,
//    checked: false,
//    type: 'date',
//    pivot: {
//      role: 'column',
//      group: ['year', 'quarter', 'month']
//    }
//  },
//  {
//    fieldName: "Надой",
//    fieldAlias: 'y',
//    isX: false,
//    isY: true,
//    checked: true,
//    type: 'number',
//    pivot: {
//      role: 'data',
//      format: 'fixedPoint',  //http://js.devexpress.com/Documentation/Guide/Data_Visualization/Common/Data_Formatting/?version=15_1#Data_Visualization_Common_Data_Formatting_Available_Formats_Numeric_Formats
//      precision: 2
//    }
//  },
//  {
//    fieldName: "Нажор",
//    fieldAlias: 'y1',
//    isX: false,
//    isY: true,
//    checked: false,
//    type: 'number',
//    pivot: {
//      role: 'data',
//      format: 'decimal'
//      //precision: 2
//    }
//  },
//  {
//    fieldName: "Насер",
//    fieldAlias: 'poo',
//    isX: false,
//    isY: true,
//    checked: false
//  },
//  {
//    fieldName: "Накопыт",
//    fieldAlias: 'kopyta',
//    isX: false,
//    isY: true,
//    checked: false
//  }
//  ,
//  {
//    fieldName: "Коммент",
//    fieldAlias: 'word',
//    isX: false,
//    isY: true,
//    checked: false
//  }
//]

