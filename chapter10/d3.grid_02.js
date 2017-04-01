d3.gridLayout = () => {
	
  function processGrid(data) {
	  
    var rows = Math.ceil(Math.sqrt(data.length));
    var columns = rows;
    var cell = 0;
    
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        if (data[cell]) {
          data[cell].x = j;
          data[cell].y = i;
          cell++;
        }
        else {
          break;
        }
      }
    }
    return data;
  }

  return processGrid;
  
};
