/**
 * Created by Hel on 06.10.2015.
 */
//
angular.module('tstApp')
  .config(function ($provide) {
    $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
  })
  .run(function ($httpBackend) {

    var okUser = {
      result: true,
      name: "Кок-оол Белекмаа Даваадоровна",
      isAdmin: false
    }

    var okAdmin = {
      result: true,
      name: "Токаш-оол Кан-Демир Сергеевич",
      isAdmin: true
    }

    var failUser = {
      result: false
    }

    var dashes = [
      {
        name: "Сказочная статистика",
        id: 105,
        group: "Fary tales"
      },
      {
        name: "Космические данные",
        id: 104,
        group: "Deep space"
      },
      {
        name: "Адовы показатели",
        id: 101,
        group: "Hell's stat"
      },
      {
        name: "Сказочная статистик 2а",
        id: 105,
        group: "Fary tales"
      },
      {
        name: "Космические данные 2",
        id: 104,
        group: "Deep space"
      },
      {
        name: "Адовы показатели 2",
        id: 101,
        group: "Hell's stat"
      },
      {
        name: "Сказочная статистика 3",
        id: 105,
        group: "Fary tales"
      },
      {
        name: "Космические данные 3 ",
        id: 104,
        group: "Deep space"
      },
      {
        name: "Адовы показатели 3",
        id: 101,
        group: "Hell's stat"
      }
    ]

    var charts = [

      //{
      //  name: "Purgatory average boiling temperature",
      //  id: 0,
      //  settings: {
      //    chartConfig: {
      //      startValue: 10,
      //      endValue: 400,
      //      majorTick: 10,
      //      ranges: [
      //        {startValue: 10, endValue: 90},
      //        {startValue: 90, endValue: 130},
      //        {startValue: 130, endValue: 200},
      //        {startValue: 200, endValue: 400},
      //      ],
      //      valueIndicatorType: 'triangleNeedle',
      //      valueIndicatorColor: 'black'
      //    },
      //    dataConfig: {
      //      ggg: 0
      //    },
      //    tableConfig: {},
      //    defaultKind: 'gauge',
      //    defaultHeight: 300,
      //    defaultWidth: 300,
      //    table: 'simple'
      //  },
      //  processor: 16
      //}
      //,
      //{
      //  name: "No text No name No number",
      //  id: 1,
      //  settings: {
      //    chartConfig: {
      //    },
      //    dataConfig: {
      //
      //    },
      //    defaultKind: 'text',
      //    defaultHeight: 200,
      //    defaultWidth: 200,
      //    table: false
      //  },
      //  processor: 18
      //},
      //{
      //  name: "Средняя длина чертова достоинства <br/> (левого рога, измеренного в полнолуние)",
      //  id: 2,
      //  settings: {
      //    chartConfig: {
      //      startValue: 1,
      //      endValue: 20,
      //      majorTick: 5,
      //      minorTick: 2.5,
      //      orientation: 'horizontal',
      //      valueIndicatorType: 'textCloud',
      //      valueIndicatorColor: 'black',
      //      subtitle: 'в сантидлинах',
      //      ranges: [
      //        { startValue: 0, endValue: 5, color: 'purple' },
      //        { startValue: 5, endValue: 7, color: 'red' },
      //        { startValue: 7, endValue: 9, color: 'orange' },
      //        { startValue: 9, endValue: 15, color: 'green' },
      //        { startValue: 15, endValue: 20, color: 'blue' }
      //      ]
      //    },
      //    dataConfig: {
      //      ggg: 0
      //    },
      //    defaultKind: 'scale',
      //    defaultHeight: 350,
      //    defaultWidth: 200,
      //    table: false
      //  },
      //  processor: 17
      //},
      {
        name: "Зависимость удельного удоенавысера-копыта коров от курса евро Зависимость удельного удоенавысера-копыта коров от курса евро Зависимость удельного удоенавысера-копыта коров от курса евро",
        id: 0,
        processor: 10,
        settings: {
          chartConfig: {},
          dataConfig: [
            {
              fieldName: "Совхоз",
              fieldAlias: 'sovhoz',
              type: 'string',
              pivot: {
                role: 'row'
              }
            },
            {
              fieldName: "Корова",
              fieldAlias: 'x',
              type: 'string',
              pivot: {
                role: 'row'
              }
            },

            {
              fieldName: "Имя показателя",
              fieldAlias: 'type',
              type: 'string',
              pivot: {
                role: 'row'
              }
            },
            {
              fieldName: "Период",
              fieldAlias: 'period',
              isX: true,
              type: 'date',
              pivot: {
                role: 'column',
                group: ['year', 'quarter', 'month']
              }
            },
            {
              fieldName: "Показатель",
              fieldAlias: 'value',
              isX: false,
              type: 'number',
              pivot: {
                role: 'data',
                format: 'fixedPoint',  //http://js.devexpress.com/Documentation/Guide/Data_Visualization/Common/Data_Formatting/?version=15_1#Data_Visualization_Common_Data_Formatting_Available_Formats_Numeric_Formats
                precision: 2
              }
            },
            {
              fieldName: "Коммент",
              fieldAlias: 'comment'
            }
          ],
          tableConfig: {
            table: "pivot",
            pivotConfig: {
              summaryType: 'sum',
              expandRows: true,
              expandColumns: true,
              showColumnGrandTotals: true,
              showRowGrandTotals: true,
              showColumnTotals: true,
              showRowTotals: true
            }
          },
          defaultKind: 'stackedBar',
          defaultHeight: 300,
          defaultWidth: 300,

        }

      }
      //,
      //{
      //  name: "Площадь стран",
      //  id: 4,
      //  settings: {
      //    chartConfig: {
      //      //====Что за карта
      //      mapURL: 'app/ko/ko',
      //      //====Размеры
      //      precision: 2, //сколько точек после запятой
      //      zoom: 65,
      //      center: [49.64, 58.59],
      //      //size: {
      //      //  width: 1000,
      //      //  height: 700
      //      //},
      //      //====Палитра
      //      //palette: "Pastel",
      //      //paletteSize: 9,
      //      //====Маркеры
      //      markers: {
      //        enabled: true,
      //        markerValuesNames: ['Эстерриториальное ТО1', 'Еще херня-2', 'Еще херня-3'],
      //        mapMarkerType: "bubble",
      //        sizeGroups: [0, 7000, 10000, 100000, 500000]
      //      },
      //      //===Лейблы
      //      label: {
      //        enabled: true
      //      },
      //      //====Группы значений
      //      grouping: {
      //        enabled: true,
      //        groups: [0, 20, 24, 26, 30, 300],
      //        palette: 'Ocean', //['blue', 'yellow']
      //      }
      //
      //    },
      //    dataConfig: {
      //      ggg: 0
      //    },
      //    defaultKind: 'map',
      //    defaultHeight: 600,
      //    defaultWidth: 600,
      //  },
      //  //pivot: true,
      //  processor: 15
      //},
      //{
      //  name: "Богатенькие картишки кто вызолочен кто задолжал главное название длинное запилить",
      //  id: 5,
      //  processor: 11,
      //  settings: {
      //    chartConfig: {},
      //    dataConfig:  [
      //      {
      //        fieldName: "Достоинство",
      //        fieldAlias: 'rang',
      //        isX: true
      //      },
      //      {
      //        fieldName: "Имя показателя",
      //        fieldAlias: 'type',
      //        groupIndex: 0
      //      },
      //      {
      //        fieldName: "Показатель",
      //        fieldAlias: 'value'
      //      }
      //    ],
      //    defaultKind: 'stackedBar',
      //    defaultHeight: 300,
      //    defaultWidth: 600,
      //    table: "simple"
      //  },
      //
      //
      //
      //}
      //{
      //  name: "Осадки в стране Оз",
      //  id: 2,
      //  defaultKind: 'stackedLine',
      //  defaultHeight: 300,
      //  defaultWidth: 200,
      // // pivot: true,
      //  processor: 12
      //},
      //{
      //  name: "Возраст",
      //  id: 3,
      //  defaultKind: 'stackedArea',
      //  defaultHeight: 500,
      //  defaultWidth: 700,
      //  //pivot: false,
      //  processor: 13
      //},
      //{
      //  name: "Ассортимент велосипедов Почвомаша",
      //  id: 4,
      //  defaultKind: 'fullstackedBar',
      //  defaultHeight: 100,
      //  defaultWidth: 100,
      //  //pivot: false,
      //  processor: 14
      //}
    ];

    var chartsConfig = []

    var thingsEmpty = [];


    var proc10 = [
        {
          sovhoz: "Заполярье",
          x: "Буренка",
          value: 10,
          type: "Надой",
          comment: "Так себе коровка",
          period: '2012-01-01'
        },
        {
          sovhoz: "Заполярье",
          x: "Буренка",
          value: 10,
          type: "Надой",
          comment: "На мясо ее! ЕЕЕЕЕЕ!",
          period: '2012-04-01'
        },
        {
          sovhoz: "Заполярье",
          x: "Буренка",
          value: 10,
          type: "Надой",
          comment: "Будущая тушенка",
          period: '2012-08-01'
        },
        {
          sovhoz: "Заполярье",
          x: "Буренка",
          value: 10,
          type: "Надой",
          comment: "Тушенка образумилась!",
          period: '2012-12-01'
        },
        {
          sovhoz: "Заполярье",
          x: "Буренка",
          value: 20,
          type: "Накопыт",
          comment: "Хорошая корова",
          period: '2012-01-01'
        },
        {
          sovhoz: "Заполярье",
          x: "Буренка",
          value: 25,
          type: "Накопыт",
          comment: "Хорошая корова",
          period: '2012-04-01'
        },
        {
          sovhoz: "Заполярье",
          x: "Буренка",
          value: 30,
          type: "Накопыт",
          comment: "Хорошая корова",
          period: '2012-08-01'
        },
        {
          sovhoz: "Заполярье",
          x: "Буренка",
          value: 25,
          type: "Накопыт",
          comment: "Хорошая корова",
          period: '2012-12-01'
        },
        {
          sovhoz: "ЗРЯ",
          x: "Тыковка",
          value: 70,
          type: "Надой",
          comment: "Хорошая корова",
          period: '2012-01-01'
        },
        {
          sovhoz: "ЗРЯ",
          x: "Тыковка",
          value: 75,
          type: "Надой",
          comment: "Хорошая корова",
          period: '2012-04-01'
        },
        {
          sovhoz: "ЗРЯ",
          x: "Тыковка",
          value: 80,
          type: "Надой",
          comment: "Хорошая корова",
          period: '2012-08-01'
        },
        {
          sovhoz: "ЗРЯ",
          x: "Тыковка",
          value: 85,
          type: "Надой",
          comment: "Хорошая корова",
          period: '2012-12-01'
        },
        {
          sovhoz: "ЗРЯ",
          x: "Тыковка",
          value: 10,
          type: "Накопыт",
          comment: "Хорошая корова",
          period: '2012-01-01'
        },
        {
          sovhoz: "ЗРЯ",
          x: "Тыковка",
          value: 15,
          type: "Накопыт",
          comment: "Хорошая корова",
          period: '2012-04-01'
        },
        {
          sovhoz: "ЗРЯ",
          x: "Тыковка",
          value: 13,
          type: "Накопыт",
          comment: "Хорошая корова",
          period: '2012-08-01'
        },
        {
          sovhoz: "ЗРЯ",
          x: "Тыковка",
          value: 15,
          type: "Накопыт",
          comment: "Хорошая корова",
          period: '2012-12-01'
        }
      ];

    var proc11 =  [
        {
          rang: "Дама пик",
          value: 10,
          type: 'Богатство'
        },
        {
          rang: "Валет бубен",
          value: 25,
          type: 'Богатство'

        },
        {
          rang: "Король треф",
          value: 55,
          type: 'Богатство'

        },
        {
          rang: "Туз пик",
          value: 71,
          type: 'Богатство'

        },
        {
          rang: "Дама пик",
          value: 20,
          type: 'Должочки'
        },
        {
          rang: "Валет бубен",
          value: 70,
          type: 'Должочки'

        },
        {
          rang: "Король треф",
          value: 10,
          type: 'Должочки'

        },
        {
          rang: "Туз пик",
          value: 50,
          type: 'Должочки'

        }
      ];

    var proc12 = {
      data: [
        {
          area: "Нэверленд",
          type: "дождь",

          date: '2015-10-02',
          value: 10
        },
        {
          area: "Нэверленд",
          type: "снег",

          date: '2015-10-02',
          value: 50
        },
        {
          area: "Нэверленд",
          type: "дождь",

          date: '2015-10-03',
          value: 90
        },
        {
          area: "Нэверленд",
          type: "снег",

          date: '2015-10-03',
          value: 40
        },
        {
          area: "Нэверленд",
          type: "дождь",

          date: '2015-10-04',
          value: 70
        },
        {
          area: "Нэверленд",
          type: "снег",

          date: '2015-10-04',
          value: 50
        },
        {
          area: "Киминоюта",
          type: "дождь",

          date: '2015-10-02',
          value: 10
        },
        {
          area: "Киминоюта",
          type: "снег",

          date: '2015-10-02',
          value: 10
        },
        {
          area: "Киминоюта",
          type: "дождь",

          date: '2015-10-03',
          value: 80
        },
        {
          area: "Киминоюта",
          type: "снег",

          date: '2015-10-03',
          value: 59
        },
        {
          area: "Киминоюта",
          type: "дождь",

          date: '2015-10-04',
          value: 12
        }
      ],
      config: [
        {
          fieldName: "Местность",
          fieldAlias: 'area',
          isX: true,
          isY: false,
          checked: true,
          type: 'string',
          pivot: {
            role: 'row'
          }
        },


        {
          fieldName: "Значение",
          fieldAlias: 'value',
          isX: false,
          isY: true,
          checked: true,
          type: 'number',
          pivot: {
            role: 'data',
            format: 'fixedPoint'
          }
        },
        {
          fieldName: "Денек",
          fieldAlias: 'date',
          isX: true,
          isY: false,
          checked: true,
          type: 'date',
          pivot: {
            role: 'column',
            group: ['quarter', 'month', 'day']
          }
        },
        {
          fieldName: "Тип осадка",
          fieldAlias: 'type',
          isX: false,
          isY: false,
          checked: true,
          type: 'string',
          pivot: {
            role: 'row'
          }
        }
      ]
    };

    var proc13 = {
      data: [
        {
          state: "Germany",
          young: 6.7,
          middle: 28.6,
          older: 5.1
        }, {
          state: "Japan",
          young: 9.6,
          middle: 43.4,
          older: 9
        }, {
          state: "Russia",
          young: 13.5,
          middle: 49,
          older: 5.8
        }, {
          state: "USA",
          young: 30,
          middle: 90.3,
          older: 14.5
        }
      ],
      config: [
        {
          fieldName: "Страна",
          fieldAlias: 'state',
          isX: true,
          isY: false,
          checked: true,
          type: 'string'
        },
        {
          fieldName: "Молодежь",
          fieldAlias: 'young',
          isX: false,
          isY: true,
          checked: true,
          type: 'number'
        },
        {
          fieldName: "Средних лет",
          fieldAlias: 'middle',
          isX: false,
          isY: true,
          checked: true,
          type: 'number'
        },
        {
          fieldName: "Старички",
          fieldAlias: 'older',
          isX: false,
          isY: true,
          checked: true,
          type: 'number'
        }
      ]
    };

    var proc14 = {
      data: null,
      config: null
    };

    var proc15 =  [

        {
          okato: "33221",
          name: "Лебяжский район",
          type: "Налов блох",
          value: 20,
          color: "#1E90FF"
        },

        {
          okato: "33587",
          name: "ЗАТО Первомайский",
          type: "Налов блох",
          value: 29,
          color: "#B8860B"
        },

        {
          okato: "33218",
          name: "Кирово-Чепецкий район",
          type: "Налов блох",
          value: 28,
          color: "#BDB76B"
        },

        {
          okato: "33227",
          name: "Нолинский район",
          type: "Налов блох",
          value: 27,
          color: "#FFA07A"
        },

        {
          okato: "33241",
          name: "Уржумский район",
          type: "Налов блох",
          value: 26,
          color: "#1E90FF"
        },

        {
          okato: "33220",
          name: "Кумёнский район",
          type: "Налов блох",
          value: 50,
          color: "#3CB371"
        },

        {
          okato: "33237",
          name: "Сунский район",
          type: "Налов блох",
          value: 25,
          color: "#D8BFD8"
        },

        {
          okato: "33235",
          name: "Слободской район",
          type: "Налов блох",
          value: 210,
          color: "#1E90FF"
        },
        {
          okato: "33225",
          name: "Нагорский район",
          type: "Налов блох",
          value: 22,
          color: "#1E90FF"
        },
        {
          okato: "33407",
          name: "городской округ Кирово-Чепецк",
          type: "Налов блох",
          value: 23,
          color: "#1E90FF"
        },
        {
          okato: "33223",
          name: "Малмыжский район",
          type: "Налов блох",
          value: 24,
          color: "#1E90FF"
        },
        {
          okato: "33226", name: "Немский район",
          type: "Налов блох",
          value: 22,
          color: "#CD5C5C"
        },
        {
          okato: "33413",
          name: "городской округ Слободской",
          type: "Налов блох",
          value: 25,
          color: "#3CB371"
        },
        {
          okato: "33205",
          name: "Белохолуницкий район",
          type: "Налов блох",
          value: 23,
          color: "pink"
        },
        {
          okato: "33206",
          name: "Богородский район",
          type: "Налов блох",
          value: 21,
          color: "#FFA07A"
        },
        {
          okato: "33217",
          name: "Кильмезский район",
          type: "Налов блох",
          value: 23,
          color: "orange"
        },
        {
          okato: "33214",
          name: "Зуевский район",
          type: "Налов блох",
          value: 26,
          color: "#D8BFD8"
        },
        {
          okato: "33401",
          name: "Киров",
          type: "Налов блох",
          value: 96,
          color: "blue"
        },
        {
          coordinates: [48.32, 57.68],
          text: 'пгт. Арбаж',
          value: 3245,
          values: [9, 5, 14]
        },
        {
          coordinates: [51.08, 57.03],
          text: 'пгт. Кильмезь',
          value: 5678,
          values: [56, 7, 1]
        },
        {
          coordinates: [49.91, 58.11],
          text: 'пгт. Кумёны',
          value: 4767,
          values: [2, 7, 1]
        },
        {
          coordinates: [49.93, 57.56],
          text: 'г. Нолинск',
          value: 9752,
          values: [56, 7, 1]
        },
        {
          coordinates: [50.06, 57.83],
          text: 'пгт. Суна',
          value: 2093,
          values: [560, 256, 199]
        },
        {
          coordinates: [49.97, 58.53],
          text: 'г. Кирово-Чепецк',
          value: 75002,
          values: [560, 256, 199]
        },
        {
          coordinates: [50.17, 58.73],
          text: 'г. Слободской',
          value: 33449,
          values: [560, 256, 199]
        },
        {
          coordinates: [49.64, 58.59],
          text: 'г. Киров',
          value: 493336,
          values: [560, 256, 199]
        }
      ];

    var proc16 =  [
        {
          x: "something",
          value: 110,
          type: "Жар пламени, в градусах праведниках Кельвинах"
        }
      ];

    var proc17 = [
        {
          x: "something-2",
          value: 11.987,
          type: "Рогатость"
        }
      ]


    //pass html
    $httpBackend.whenGET(/.*html/).passThrough();

    //$httpBackend.whenGET(/kiselev:8181\/bi\/api\/dashboards\/.*/).passThrough();
    $httpBackend.whenGET(/kiselev:8181\/bi\/api\/dashboards.*/).passThrough();


    $httpBackend.whenGET(/.*\/api\/auth.*/).respond(200, okAdmin);
    $httpBackend.whenGET('/api/dashboards/105/processors').respond(200, charts);
    //
    $httpBackend.whenGET('/api/dashboards').respond(200, dashes);
    $httpBackend.whenGET(/.*\/processors.*10/).respond(200, proc10);
    $httpBackend.whenGET(/.*\/processors.*11/).respond(200, proc11);
    $httpBackend.whenGET(/.*\/processors.*12/).respond(200, proc12);
    $httpBackend.whenGET(/.*\/processors.*13/).respond(200, proc13);
    $httpBackend.whenGET(/.*\/processors.*14/).respond(200, proc14);
    $httpBackend.whenGET(/.*\/processors.*15/).respond(200, proc15);
    $httpBackend.whenGET(/.*\/processors.*16/).respond(200, proc16);
    $httpBackend.whenGET(/.*\/processors.*17/).respond(200, proc17);
    $httpBackend.whenGET(/\/api\/dashboards\/.*/).respond(200, thingsEmpty);

  });

