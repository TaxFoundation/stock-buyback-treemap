import React, { Component, Fragment } from 'react';
import { treemap as d3treemap, treemapBinary } from 'd3-hierarchy';
import { format } from 'd3-format';
import Tooltip from './Tooltip';

export const formatter = (number, type) => {
  if (type === '%') {
    return format('.1%')(number);
  } else if (type === '$' && number % 1 > 0) {
    return format('$,.2f')(number);
  } else if (type === '$') {
    return format('$,')(number);
  } else if (type === ',') {
    return format(',.0f')(number);
  }
};

class StockTreemap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedGroup: null,
    };
  }

  onRectHover = group => {
    this.setState({ selectedGroup: group });
  };

  render() {
    const treemap = d3treemap()
      .size([this.props.width, this.props.height])
      .tile(treemapBinary)
      .paddingInner(2);
    const nodes = treemap(this.props.data).descendants();

    const rects = nodes.map((node, i) => {
      if (node.children === undefined) {
        return (
          <rect
            x={node.x0}
            y={node.y0}
            width={node.x1 - node.x0}
            height={node.y1 - node.y0}
            key={`node-${i}`}
            onMouseEnter={() => this.onRectHover(node.parent.data.id)}
            onMouseLeave={() => this.onRectHover(null)}
          />
        );
      } else {
        return null;
      }
    });

    return (
      <Fragment>
        <svg
          width="100%"
          viewBox={`0 0 ${this.props.width} ${this.props.height}`}
        >
          {rects}
        </svg>
        <Tooltip id="treemap-tooltip" aria-haspopup="true" />
      </Fragment>
    );
  }
}

export default StockTreemap;
