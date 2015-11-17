/**
 * Created by Hel on 05.11.2015.
 */
//Для расчета чарта по пивоту: http://js.devexpress.com/Documentation/Guide/UI_Widgets/Pivot_Grid/Integration_with_Chart/
var foreachTree = function (items, func, members) {
  members = members || [];
  for (var i = 0; i < items.length; i++) {
    members.unshift(items[i]);
    func(members);
    if (items[i].children) {
      foreachTree(items[i].children, func, members);
    }
    members.shift();
  }
}
var createChartDataSource = function (pivotGridDataSource) {
  var data = pivotGridDataSource.getData(),
    rowLevel = 1,
    columnLevel = 1,
    dataSource = [],
    measureIndex = 0;

  //console.log(data);

  foreachTree(data.rows, function (members) {
    rowLevel = Math.max(rowLevel, members.length);
  });

  foreachTree(data.columns, function (members) {
    columnLevel = Math.max(columnLevel, members.length);
  });

  var rows = data.rows.length ? data.rows : [{index: 0, value: "Grand Total"}];
  var columns = data.columns.length ? data.columns : [{index: 0, value: "Grand Total"}];

  foreachTree(rows, function (rowMembers) {
    if (rowLevel === rowMembers.length) {
      var names = $.map(rowMembers, function (member) {
        return member.value;
      }).reverse();
      foreachTree(columns, function (columnMembers) {
        if (columnLevel === columnMembers.length) {
          var args = $.map(columnMembers, function (member) {
              return member.value;
            }).reverse(),
            value = ((data.values[rowMembers[0].index] || [])[columnMembers[0].index] || [])[measureIndex];

          dataSource.push({
            name: names.join(" - "),
            arg: args.join("/"),
            val: value === undefined ? null : value
          });
        }
      });
    }
  });

  //console.log(dataSource);
  return dataSource;
};
