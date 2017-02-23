d3.simpleLegend = function() {
  var data = [];
  var size = [300,20];
  var xScale = d3.scaleLinear();
  var scale;
  function legend(gSelection) {
    createLegendData(scale);
    var xMin = d3.min(data, d => d.domain[0]);
    var xMax = d3.max(data, d => d.domain[1]);
    xScale.domain([xMin,xMax]).range([0,size[0]]);
    gSelection.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
        .attr("height", size[1])
        .attr("width", d => xScale(d.domain[1]) -  xScale(d.domain[0]))
        .attr("x", d => xScale(d.domain[0]))
        .style("fill", d => d.color);

    gSelection.selectAll("text")
      .data(data)
      .enter()
      .append("g")
        .attr("transform", d => "translate(" + xScale(d.domain[0]) + ","
          + size[1] + ")")
        .append("text")
        .attr("transform", "rotate(90)")
        .text(d => d.domain[0]);

    return this;
  }
  function createLegendData(incScale) {
    var rangeArray = incScale.range();
    data = [];
    for (var x in rangeArray) {
      var colorValue = rangeArray[x];
      var domainValues = incScale.invertExtent(colorValue);
      data.push({color: colorValue, domain: domainValues});
    }
  }
  legend.scale = function(newScale) {
    if (!arguments.length) return scale;
    scale = newScale;
    return this;
  };
  return legend;
};
