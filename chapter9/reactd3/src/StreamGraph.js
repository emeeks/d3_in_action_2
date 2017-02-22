import React, { Component } from 'react'
import './App.css'
import { stack, area, curveBasis, stackOrderInsideOut, stackOffsetWiggle } from 'd3-shape'
import { range } from 'd3-array'
import { scaleLinear } from 'd3-scale'

class StreamGraph extends Component {
  render() {
    const stackData = range(30).map(() => ({}))
    for (let x = 0; x<30; x++) {
      this.props.data.forEach(country => {
        stackData[x][country.id] = country.data[x]
      })
    }
    const xScale = scaleLinear().domain([0, 30])
      .range([0, this.props.size[0]])

    const yScale = scaleLinear().domain([0, 60])
      .range([this.props.size[1], 0])

    const stackLayout = stack()
      .offset(stackOffsetWiggle)
      .order(stackOrderInsideOut)
      .keys(Object.keys(stackData[0]))

    const stackArea = area()
      .x((d, i) => xScale(i))
      .y0(d => yScale(d[0]))
      .y1(d => yScale(d[1]))
      .curve(curveBasis)

    const stacks = stackLayout(stackData).map((d, i) => <path
        key={"stack" + i}
        d={stackArea(d)}
        onMouseEnter={() => {this.props.onHover(this.props.data[i])}}
        style={{fill: this.props.hoverElement === this.props.data[i]["id"] ? "#FCBC34" : this.props.colorScale(this.props.data[i].launchday), stroke: "black", strokeOpacity: 0.5 }}
      />)

    return <svg width={this.props.size[0]} height={this.props.size[1]}>
      <g transform={"translate(0," + (-this.props.size[1] / 2) + ")"}>
        {stacks}
      </g>
    </svg>
  }
}

export default StreamGraph
