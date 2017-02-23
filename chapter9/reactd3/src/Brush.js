import React, { Component } from 'react'
import './App.css'
import { select, event } from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import { brushX } from 'd3-brush'
import { axisBottom } from 'd3-axis'

class Brush extends Component {
  constructor(props){
    super(props)
    this.createBrush = this.createBrush.bind(this)
  }

  componentDidMount() {
    this.createBrush()
  }

  componentDidUpdate() {
    this.createBrush()
  }

  createBrush() {
    const node = this.node
    const scale = scaleLinear().domain([0,36])
      .range([0,this.props.size[0]])

    const dayBrush = brushX()
      .extent([[0, 0], this.props.size])
      .on("brush", brushed)

    const dayAxis = axisBottom()
      .scale(scale)

    select(node)
      .selectAll("g.brushaxis")
      .data([0])
      .enter()
      .append("g")
        .attr("class", "brushaxis")
        .attr("transform", "translate(0,25)")

    select(node)
      .select("g.brushaxis")
        .call(dayAxis)

    select(node)
      .selectAll("g.brush")
      .data([0])
      .enter()
      .append("g")
        .attr("class", "brush")
        .attr("transform", "translate(0,0)")

    select(node)
      .select("g.brush")
      .call(dayBrush)

    select(node)
      .select("g.brush")
      .selectAll("g.resize")
      .selectAll("circle")
      .data([0])
      .enter()
      .append("circle")
        .attr("r", 25)
        .attr("cy",25)
        .style("fill", "white")
        .style("stroke", "black")
        .style("stroke-width", "4px")
        .style("opacity", .75);

    const brushFn = this.props.changeBrush
    function brushed() {
      const selectedExtent = event.selection.map(d => scale.invert(d))
      brushFn(selectedExtent)
    }

  }

  render() {
    return <svg ref={node => this.node = node} width={this.props.size[0]} height={50}></svg>
  }
}

export default Brush
