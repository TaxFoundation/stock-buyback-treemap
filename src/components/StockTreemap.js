import React, { Component, Fragment } from 'react';
import { treemap as d3treemap, treemapBinary } from 'd3-hierarchy';
import Tooltip from './Tooltip';
import Text from './Text';
import { color, padder, formatter } from '../helpers';

const TooltipText = (group, type, amount) => {
  return `
    <h3>${group}</h3>
    <p>${type}</p>
    <p>${
      amount >= 1000
        ? `$${Math.round(amount / 100) / 10} Trillion`
        : `${formatter(Math.round(amount), '$')} Billion`
    }</p>
  `;
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
      .paddingInner(padder);
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
            fill={color(node.parent.id, node.data.group)}
            onMouseEnter={() => this.onRectHover(node.parent.data.id)}
            onMouseLeave={() => this.onRectHover(null)}
            data-tip={TooltipText(
              node.parent.data.name,
              node.data.name,
              node.value
            )}
            data-for="treemap-tooltip"
            data-html={true}
          />
        );
      } else {
        return null;
      }
    });

    const texts = nodes.map((node, i) => {
      if (node.depth === 1) {
        return (
          <Text
            node={node}
            key={`text-${i}`}
            selected={this.state.selectedGroup === node.data.id}
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
          {texts}
        </svg>
        <Tooltip id="treemap-tooltip" aria-haspopup="true" />
      </Fragment>
    );
  }
}

export default StockTreemap;
