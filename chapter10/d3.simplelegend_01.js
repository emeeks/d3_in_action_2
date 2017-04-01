d3.simpleLegend = function () {
	
  function legend(gSelection) {
	  
    var testData = [1,2,3,4,5];
	    gSelection.selectAll("rect")
	      .data(testData)
	      .enter()
	      .append("rect")
	        .attr("height", 20)
	        .attr("width", 20)
	        .attr("x", (d,i) => i *25)
	        .style("fill", "red");
    
	    return this;
    
  }
  
  return legend;
  
};
