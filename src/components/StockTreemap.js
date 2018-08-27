import React, { Component, Fragment } from 'react';
import {
  hierarchy,
  treemap as d3treemap,
  treemapResquarify,
} from 'd3-hierarchy';
import Tooltip from './Tooltip';

const dynamicPadding = node => {
  switch (node.depth) {
    case 0:
      return 8;
    case 1:
      return 3;
    default:
      return 0;
  }
};

const nodeLabel = node => {
  let nodeCopy = Object.assign({}, node);
  let label = nodeCopy.data.name;

  while (nodeCopy.parent) {
    nodeCopy = Object.assign({}, nodeCopy.parent);
    label = `${nodeCopy.data.name}</br>${label}`;
  }

  label = `<p>${label}</p>`;
  return label;
};

class StockTreemap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      root: hierarchy(this.props.data).sum(d => d.billions),
    };
  }

  render() {
    const treemap = d3treemap()
      .size([this.props.width, this.props.height])
      .tile(treemapResquarify)
      .paddingInner(dynamicPadding);
    const nodes = treemap(this.state.root).descendants();

    const color = node => {
      const definition = node.parent.data.definition
        ? node.parent.data.definition
        : node.parent.parent.data.definition;

      switch (node.data.group) {
        case 'domestic':
          return definition === 'benefit' ? '#770000' : '#ee0000';
        case 'non-domestic':
          return definition === 'benefit' ? '#007700' : '#00ee00';
        case 'not-reported':
          return definition === 'benefit' ? '#aaaaaa' : '#bbbbbb';
        default:
          return '#0000ff';
      }
    };

    return (
      <Fragment>
        <svg
          width="100%"
          viewBox={`0 0 ${this.props.width} ${this.props.height}`}
        >
          {nodes.map((node, i) => {
            const tooltipProps = node.children
              ? null
              : {
                  'data-tip': `${nodeLabel(node)}<p>${node.value}</p>`,
                  'data-for': 'treemap-tooltip',
                  'data-html': true,
                };

            return node.depth > 0 ? (
              <rect
                x={node.x0}
                y={node.y0}
                width={node.x1 - node.x0}
                height={node.y1 - node.y0}
                fill={node.data.group ? color(node) : 'transparent'}
                key={`node-${i}`}
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
