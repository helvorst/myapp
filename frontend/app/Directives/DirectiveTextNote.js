/**
 * Created by Hel on 02.11.2015.
 */
tstApp.directive('textNote', function ($compile) {
  return {
    scope: true,
    link: function (scope, element, attrs) {

      //console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%' + scope.chartInfo.id);
      //var el;
      //
      //attrs.$observe('template', function (tpl) {
      //  if (angular.isDefined(tpl)) {
      //    // compile the provided template against the current scope
      //    el = $compile(tpl)(scope);
      //
      //    // stupid way of emptying the element
      //    element.html("");
      //
      //    // add the template content
      //    element.append(el);
      //  }
      //});

      if (scope.chartInfo.settings.defaultKind == 'text') {
        var el;


         var tpl = '<div id="textNote{{chartInfo.id}}" style="height:100%; background: greenyellow">My text for {{chartInfo.name}}</div>'
        el = $compile(tpl)(scope);
        console.log(el);
        //stupid way of emptying the element
        element.html("");

        // add the template content
        element.append(el);
      }
    }
  };
});
