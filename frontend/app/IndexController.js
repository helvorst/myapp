/**
 * Created by Hel on 08.10.2015.
 */
tstApp.controller('IndexController', function ($scope, $rootScope, $state) {

  //Установить тему
  if(localStorage.getItem('theme')) {
    $rootScope.theme = JSON.parse(localStorage.getItem('theme'));
  }
  else {
    $rootScope.theme = 'light';
  }


  //Функция для кнопки ВЫХОД
  $scope.signOut = function () {
    localStorage.removeItem('LoggedInAs');
    $rootScope.LoggedInAs = undefined;
    $state.go('login');
  }




})


//FILTER FOR SOME REASON
//var filteredData1 = [];
//for (var i=0; i<data.features.length; i++ )
//{
//  if((data.features[i].properties.ADMIN_LVL) && (data.features[i].properties.ADMIN_LVL == "6"))
//    filteredData1.push(data.features[i])
//}
//var filteredData= {
//  type: data.type,
//  bbox: data.bbox,
//  features: filteredData1
//};
//
//console.log(filteredData);
//map.option('mapData', filteredData);

//drawMap();
//
//function drawMap() {
//
//  var districts = {
//
//    "33221": {name: "Лебяжский район", type: "Налов блох", value: 20, color: "#1E90FF"},
//    "33587": {name: "ЗАТО Первомайский", type: "Налов блох", value: 29, color: "#B8860B"},
//    "33218": {name: "Кирово-Чепецкий район", type: "Налов блох", value: 28, color: "#BDB76B"},
//    "33227": {name: "Нолинский район", type: "Налов блох", value: 27, color: "#FFA07A"},
//    "33241": {name: "Уржумский район", type: "Налов блох", value: 26, color: "#1E90FF"},
//    "33220": {name: "Кумёнский район", type: "Налов блох", value: 50, color: "#3CB371"},
//    "33237": {name: "Сунский район", type: "Налов блох", value: 25, color: "#D8BFD8"},
//    "33235": {name: "Слободской район", type: "Налов блох", value: 210, color: "#1E90FF"},
//    "33225": {name: "Нагорский район", type: "Налов блох", value: 22, color: "#1E90FF"},
//    "33407": {name: "городской округ Кирово-Чепецк", type: "Налов блох", value: 23, color: "#1E90FF"},
//    "33223": {name: "Малмыжский район", type: "Налов блох", value: 24, color: "#1E90FF"},
//    "33226": {name: "Немский район", type: "Налов блох", value: 22, color: "#CD5C5C"},
//    "33413": {name: "городской округ Слободской", type: "Налов блох", value: 25, color: "#3CB371"},
//    "33205": {name: "Белохолуницкий район", type: "Налов блох", value: 23, color: "pink"},
//    "33206": {name: "Богородский район", type: "Налов блох", value: 21, color: "#FFA07A"},
//    "33217": {name: "Кильмезский район", type: "Налов блох", value: 23, color: "orange"},
//    "33214": {name: "Зуевский район", type: "Налов блох", value: 26, color: "#D8BFD8"},
//    "33401": {name: "Киров", type: "Налов блох", value: 96, color: "blue"}
//
//  }
//
//  var mapConfig = {
//    //====Размеры
//    zoom: 1,
//    center: [52, 57],
//    size: {
//      width: 1200,
//      height: 700
//    },
//    //====Палитра
//    //palette: "Pastel",
//    //paletteSize: 9,
//    //====Маркеры
//    markers: {
//      enabled: false,
//      markerValuesNames: ['Эстерриториальное ТО1', 'Еще херня-2', 'Еще херня-3'],
//      mapMarkerType: "bubble",
//      sizeGroups: [0, 7000, 10000, 100000, 500000]
//    },
//    //===Лейблы
//    label: {
//      enabled: true
//    },
//    //====Группы значений
//    grouping: {
//      enabled: true,
//      groups: [0, 20, 24, 26, 30, 300],
//      palette: 'Ocean', //['blue', 'yellow']
//    }
//
//  };
//
//  //Если маркеры отключены, то переменная ДОЛЖНА БЫТЬ, но пустая: var markers = [], иначе сломается конфиг мапа
//  var markers = [
//    {
//      coordinates: [48.32, 57.68],
//      text: 'пгт. Арбаж',
//      value: 3245,
//      values: [9, 5, 14]
//    },
//    {
//      coordinates: [51.08, 57.03],
//      text: 'пгт. Кильмезь',
//      value: 5678,
//      values: [56, 7, 1]
//    },
//    {
//      coordinates: [49.91, 58.11],
//      text: 'пгт. Кумёны',
//      value: 4767,
//      values: [2, 7, 1]
//    },
//    {
//      coordinates: [49.93, 57.56],
//      text: 'г. Нолинск',
//      value: 9752,
//      values: [56, 7, 1]
//    },
//    {
//      coordinates: [50.06, 57.83],
//      text: 'пгт. Суна',
//      value: 2093,
//      values: [560, 256, 199]
//    },
//    {
//      coordinates: [49.97, 58.53],
//      text: 'г. Кирово-Чепецк',
//      value: 75002,
//      values: [560, 256, 199]
//    },
//    {
//      coordinates: [50.17, 58.73],
//      text: 'г. Слободской',
//      value: 33449,
//      values: [560, 256, 199]
//    },
//    {
//      coordinates: [49.64, 58.59],
//      text: 'г. Киров',
//      value: 493336,
//      values: [560, 256, 199]
//    }
//
//    //1	Арбажский район
//    //2	Афанасьевский район	посёлок Афанасьево
//    //3	Белохолуницкий район	город Белая Холуница
//    //4	Богородский район	посёлок Богородское
//    //5	Верхнекамский район	город Кирс
//    //6	Верхошижемский район	посёлок Верхошижемье
//    //7	Вятско-Полянский район	город Вятские Поляны
//    //8	Даровской район	посёлок Даровской
//    //9	Зуевский район	город Зуевка
//    //10	Кикнурский район	посёлок Кикнур
//    //11	Кильмезский район	посёлок Кильмезь
//    //12	Кирово-Чепецкий район	город Кирово-Чепецк
//    //13	Котельничский район	город Котельнич
//    //14	Кумёнский район	посёлок Кумёны
//    //15	Лебяжский район	посёлок Лебяжье
//    //16	Лузский район	город Луза
//    //17	Малмыжский район	город Малмыж
//    //18	Мурашинский район	город Мураши
//    //19	Нагорский район	посёлок Нагорск
//    //20	Немский район	посёлок Нема
//  ]
//
//
//  var assignData = function () {
//
//    DevExpress.viz.vectormaputils.parse('app/ko/ko', {precision: 2}, function (data) {
//
//      //IF I USE GROUPS: ADD GROUPING VALUES TO ATTRIBUTES
//      $.each(data.features, function (_, item) {
//        if (districts[item.properties.TERR_ID])
//          item.properties.value = districts[item.properties.TERR_ID].value;
//      });
//
//      //IF I USE LABELS: ADD NAMES TO ATTRIBUTES (create new attribute "label" to use it in map config)
//      if (mapConfig.label.enabled) {
//        $.each(data.features, function (_, item) {
//          if (districts[item.properties.TERR_ID])
//            item.properties.label = districts[item.properties.TERR_ID].name;
//        });
//      }
//
//      console.log(data);
//      var map = $("#map").dxVectorMap('instance');
//      map.option('mapData', data);
//
//
//    })
//
//  };
//
//
//  var i = 0; //индекс для раскраски палитрой
//  var mapOptions = {
//    mapData: DevExpress.viz.map.sources.world,
//    //------------SIZE----------------------------------------
//    zoomFactor: mapConfig.zoom,
//    center: mapConfig.center,
//    size: mapConfig.size,
//    bounds: mapConfig.bounds,
//
//    //------------MARKERS----------------------------------------
//    markers: mapConfig.markers.enabled ? markers : null,
//    markerSettings: {
//      sizeGroups: mapConfig.markers.sizeGroups,
//      sizeGroupingField: 'value',
//      type: mapConfig.markers.mapMarkerType,
//      label: {
//        enabled: mapConfig.markers.enabled
//      },
//      selectedColor: 'dodgerblue',
//      borderColor: 'mistyrose',
//      borderWidth: mapConfig.mapMarkerType == 'bubble' ? 4 : 0,
//      hoveredBorderColor: 'midnightblue',
//      hoveredBorderWidth: mapConfig.mapMarkerType == 'bubble' ? 4 : 0
//    },
//
//    //------------TOOLTIP----------------------------------------
//    tooltip: {
//      enabled: true,
//      border: {
//        border: {color: 'white'},
//      },
//      font: {color: "#565656"},
//      customizeTooltip: function (arg) {
//        if (arg.type === 'marker') {                                                        //...for marker
//          var markertooltip = "<strong> " + arg.text + "</strong> ";
//          if (arg.value)
//            markertooltip = markertooltip + "</br> Значение: " + arg.value;
//          if (arg.values && mapConfig.markers.markerValuesNames) {
//            for (var i = 0; i < mapConfig.markers.markerValuesNames.length; i++)
//              markertooltip = markertooltip + "</br> " + mapConfig.markers.markerValuesNames[i] + ": " + arg.values[i];
//          }
//          return {html: markertooltip};
//
//        }
//        else {                                                                              //...for area
//
//          var id = arg.attribute("TERR_ID");
//          var county = districts[id];
//          if (county) {
//            return {html: "<strong> " + county.name + "</strong> " + "</br> Показатель: " + county.type + "</br> Значение: " + county.value};
//          }
//        }
//      }
//    },
//    //------------AREA----------------------------------------
//    areaSettings: {
//      //-1)Labels for areas
//      label: {
//        enabled: mapConfig.label.enabled,
//        dataField: "label", //я сам создал такой атрибут из поля данных name: "33217": {name: "Кильмезский район", type: "Налов блох", value: 23, color: "orange"},
//        font: {
//          family: 'Play',
//          color: 'white',
//          opacity: 1,
//          weight: 100
//        }
//      },
//      //0)Palette
//      palette: mapConfig.grouping.enabled ? mapConfig.grouping.palette : mapConfig.palette,
//      paletteSize: mapConfig.paletteSize ? mapConfig.paletteSize : 4,
//
//      //1)GROUPS if they are enabled
//      colorGroups: mapConfig.grouping.enabled ? mapConfig.grouping.groups : null,
//      colorGroupingField: mapConfig.grouping.enabled ? 'value' : null, //поле из данных:  "33217": {name: "Кильмезский район", type: "Налов блох", value: 23, color: "orange"},
//
//      //2)CUSTOM colouring
//      customize: function (arg) {
//        var district = districts[arg.attribute('TERR_ID')];
//        if (district) {
//          if (district.color) //when colour is explicitly set in data apply it
//            return {
//              color: district.color,
//              hoveredColor: "#e0e000",
//              selectedColor: "#008f00"
//            }
//          else //otherwise apply palette
//            return {
//              paletteIndex: i++ % ( mapConfig.paletteSize ? mapConfig.paletteSize : 4)
//            }
//        }
//      }
//    },
//    //------------LEGENDS----------------------------------------
//    legends: [{
//      source: 'areaColorGroups',
//      customizeText: function (arg) {
//        return arg.start + ' to ' + arg.end;
//      }
//    },
//      {
//        source: "markerSizeGroups",
//        markerType: "circle",
//        horizontalAlignment: "left",
//        verticalAlignment: "bottom",
//        visible: mapConfig.markers.enabled,
//        customizeText: function (arg) {
//          console.log(arg);
//          return "c " + arg.start + " по " + arg.end; // ['< 8000K', '8000K to 10000K', '> 10000K'][arg.index];
//        }
//      }
//    ],
//
//    //------------EVENTS: CLICK----------------------------------------
//    onAreaClick: function (e) {
//      var target = e.target;
//      if (districts[target.attribute("TERR_ID")]) {
//        target.selected(!target.selected());
//      }
//    }
//
//    ,
//    onMarkerClick: function (info) {
//      var clickedMarker = info.target;
//      clickedMarker.selected(!clickedMarker.selected());
//      info.component.center(info.target.coordinates());
//    }
//
//
//
//  };
//
//  console.log(mapOptions);
//
//  //assignData();
//  $('#map').dxVectorMap(mapOptions);
//
//
//  var exporterOptions = {
//    sourceContainer: '#map',
//    serverUrl: 'http://127.0.0.1:3003',
//    exportFormat: ['PDF', 'PNG', 'SVG', 'JPEG', 'GIF'],
//    fileName: 'hernya'
//  };
//
//  $("#exportMenu").dxExporter(exporterOptions);
//
//
//}

