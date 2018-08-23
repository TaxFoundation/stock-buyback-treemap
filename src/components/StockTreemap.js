import React, { Component, Fragment } from 'react';
import {
  hierarchy,
  treemap as d3treemap,
  treemapResquarify,
} from 'd3-hierarchy';
import { scaleLinear } from '@vx/scale';
import Tooltip from './Tooltip';

class StockTreemap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      root: hierarchy(this.props.data)
        .sum(d => d.billions)
        .sort((a, b) => b.value - a.value),
    };

    this.color = scaleLinear({
      domain: [0, 4000],
      range: ['#0373d9', '#00ff70'],
    });
  }

  render() {
    const treemap = d3treemap()
      .size([this.props.width, this.props.height])
      .tile(treemapResquarify);
    const nodes = treemap(this.state.root).descendants();

    return (
      <Fragment>
        <svg
          width="100%"
          viewBox={`0 0 ${this.props.width} ${this.props.height}`}
        >
          {nodes.reverse().map((node, i) => {
            const tooltipProps =
              node.depth === 1
                ? {
                    'data-tip': `${node.data.name}: ${node.value}`,
                    'data-for': 'treemap-tooltip',
                  }
                : null;

            return node.depth > 0 ? (
              <rect
                x={node.x0}
                y={node.y0}
                width={node.x1 - node.x0}
                height={node.y1 - node.y0}
                fill={node.children ? 'transparent' : this.color(node.value)}
                key={`node-${i}`}
                stroke={node.depth === 1 ? '#333333' : 'none'}
                {...tooltipProps}
              />
            ) : null;
          })}
        </svg>
        <Tooltip id="treemap-tooltip" aria-haspopup="true" />
      </Fragment>
    );
  }
}

export default StockTreemap;
