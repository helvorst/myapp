if (args.width == false) //VERTICAL RS
{
  var availableHeight = args.height;
  var navbarHeight = $('#navbar' + thisBoxID).height() + $('#chartName' + thisBoxID).height() + 5 ;

  //depends on either table hidden or not
  //if ($rootScope.mycharts[thisBoxID].pivot == false) { //...for ordinary tbl
  //  if ($('#fuckenTableID' + thisBoxID).hasClass("underCover"))
  //    var tableHeight = 3;
  //  else
  //    var tableHeight = $('#fuckenTableID' + thisBoxID).height();
  //}
  //if ($rootScope.mycharts[thisBoxID].pivot == true) { //...for pivot
  if ($('#fuckenPivotTableID' + thisBoxID).hasClass("underCover"))
    var tableHeight = 3;
  else
    var tableHeight = $('#fuckenPivotTableID' + thisBoxID).height();
  //}

  var chartHeight = $rootScope.mycharts[thisBoxID].defaultHeight;
  var neededHeight = navbarHeight + 20  + tableHeight + $rootScope.mycharts[thisBoxID].defaultHeight;

  if (availableHeight <= neededHeight) {
    $('#box' + thisBoxID).css('min-height', (neededHeight + "px"));
  }
  else {
    var chartHeight = (availableHeight - navbarHeight  - tableHeight - 20);
  }
  if (chartHeight < 0) //when width is negative chart is rendered with auto width
    chartHeight = 1;

  $('#boxContent' + thisBoxID).height(chartHeight);
  $('#fuckenSingleChartID' + thisBoxID).height(chartHeight);

  renderChartDependingOnItsType(thisBoxID);
}


if (type == "PDF") {

  console.log('me');
  var pdf = new jsPDF('p', 'pt', 'letter');
  // source can be HTML-formatted string, or a reference
  // to an actual DOM element from which the text will be scraped.
  var source = $('#pivotTable').html();
  //var source = $('#simpleTable').html();


  console.log(source);
  // we support special element handlers. Register them with jQuery-style
  // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
  // There is no support for any other type of selectors
  // (class, of compound) at this time.
  var specialElementHandlers = {
    // element with id of "bypass" - jQuery style selector
    '#bypassme': function (element, renderer) {
      // true = "handled elsewhere, bypass text extraction"
      return true
    }
  };
  var margins = {
    top: 80,
    bottom: 60,
    left: 40,
    width: 522
  };
  // all coords and widths are in jsPDF instance's declared units
  // 'inches' in this case
  pdf.fromHTML(
    source
    , // HTML string or DOM elem ref.
    margins.left, // x coord
    margins.top,
    { // y coord
      'width': margins.width, // max width of content on PDF
      'elementHandlers': specialElementHandlers
    },

    function (dispose) {
      // dispose: object with X, Y of the last line add to the PDF
      //          this allow the insertion of new lines after html
      // pdf.save('Test.pdf');
    }, margins);

  pdf.save('Test.pdf');
  // pdf.output("dataurlnewwindow");
}
