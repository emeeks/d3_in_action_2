d3.simpleLegend = function() {
  var title = "Legend";
  var numberFormat = d3.format(".4n");
  var units = "Units";
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


    gSelection.selectAll("line")
      .data(data)
      .enter()
      .append("line")
        .attr("x1", d => xScale(d.domain[0]))
        .attr("x2", d => xScale(d.domain[0]))
        .attr("y1", 0)
        .attr("y2", size[1] + 5)
        .style("stroke", "black")
        .style("stroke-width", "2px");

    gSelection.selectAll("text")
      .data(data)
      .enter()
      .append("g")
        .attr("transform", d => "translate(" + (xScale(d.domain[0])) +"," 
          + (size[1] + 20) + ")")
      .append("text")
        .style("text-anchor", "middle")
        .text(d => numberFormat(d.domain[0]));
    gSelection.append("text")
        .attr("transform", d => "translate(" + (xScale(xMin)) + ","
          + (size[1] - 30) + ")")
        .text(title);
    gSelection.append("text")
        .attr("transform", d => "translate(" + (xScale(xMax)) + ","
          + (size[1] + 20) + ")")
        .text(units);
    return this;
  };

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

  legend.title = function(newTitle) {
    if (!arguments.length) return title;
    title = newTitle;
    return this;
  };

  legend.unitLabel = function(newUnits) {
    if (!arguments.length) return units;
    units = newUnits;
    return this;
  };

  legend.formatter = function(newFormatter) {
    if (!arguments.length) return numberFormat;
    numberFormat = newFormatter;
    return this;
  };

  return legend;
};
