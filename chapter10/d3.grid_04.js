d3.gridLayout = function() {
	
  var gridSize = [0,10];
  var gridXScale = d3.scaleLinear();
  var gridYScale = d3.scaleLinear();
  
  function processGrid(data) {
	  
    var rows = Math.ceil(Math.sqrt(data.length));
    var columns = rows;
    var gridCellWidth = gridSize[0] / columns;
    var gridCellHeight = gridSize[1] / rows;

    gridXScale.domain([1,columns]).range([0,gridSize[0]]);
    gridYScale.domain([1,rows]).range([0,gridSize[1]]);
    var cell = 0;
    for (var i = 1; i <= rows; i++) {
      for (var j = 1; j <= columns; j++) {
        if (data[cell]) {
          data[cell].x = gridXScale(j);
          data[cell].y = gridYScale(i);
          data[cell].height = gridCellHeight;
          data[cell].width = gridCellWidth;
          cell++;
        }
        else {
          break;
        }
      }
    }
    return data;
  }
  
  processGrid.size = function (newSize) {
    if (!arguments.length) return gridSize;
    gridSize = newSize;
    return this;
  }
  
  return processGrid;
  
};
