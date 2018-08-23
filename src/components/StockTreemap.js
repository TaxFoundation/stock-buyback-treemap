import React, { Component } from 'react';
import { hierarchy, treemap as d3treemap } from 'd3-hierarchy';
import { Group } from '@vx/group';
import { scaleLinear } from '@vx/scale';
import { interpolateHcl } from 'd3-interpolate';

class StockTreemap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      root: hierarchy(this.props.data)
        .sum(d => d.billions)
        .sort((a, b) => b.value - a.value),
    };

    this.color = scaleLinear({
      domain: [0, 10000],
      range: ['#0373d9', '#00ff70'],
    });
  }

  render() {
    const treemap = d3treemap().size([this.props.width, this.props.height]);
    const nodes = treemap(this.state.root).descendants();

    return (
      <svg height={this.props.height} width={this.props.width}>
        <rect
          height={this.props.height}
          width={this.props.width}
          fill="#dddddd"
        />
        {nodes.map((node, i) => {
          return (
            <rect
              x={node.x0}
              y={node.y0}
              width={node.x1 - node.x0}
              height={node.y1 - node.y0}
              fill={this.color(node.value)}
              key={`node-${i}`}
            />
          );
        })}
      </svg>
    );
  }
}

export default StockTreemap;
