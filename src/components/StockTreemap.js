import React, { Component, Fragment } from 'react';
import { hierarchy, treemap as d3treemap, treemapBinary } from 'd3-hierarchy';
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

const dynamicInnerPadding = node => {
  switch (node.depth) {
    case 0:
      return 12;
    case 1:
      return 3;
    default:
      return 1;
  }
};

const nodeLabel = node => {
  let nodeCopy = Object.assign({}, node);
  let label = nodeCopy.data.name;

  while (nodeCopy.parent !== null) {
    nodeCopy = Object.assign({}, nodeCopy.parent);

    switch (nodeCopy.depth) {
      case 0:
        break;
      case 1:
        label = `<h3>${nodeCopy.data.name} Funds</h3><p>${label}`;
        break;
      default:
        label = `${nodeCopy.data.name}, ${label}`;
        break;
    }
  }

  label = `<div>${label}</p></div>`;
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
      .tile(treemapBinary)
      .paddingInner(dynamicInnerPadding);
    const nodes = treemap(this.state.root).descendants();

    const color = node => {
      switch (node.data.group) {
        case 'domestic':
          return '#689f38';
        case 'non-domestic':
          return '#00acc1';
        case 'not-reported':
          return '#cfd8dc';
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
                  'data-tip': `${nodeLabel(node)}<p><strong>${formatter(
                    node.value,
                    '$'
                  )} billion</strong></p>`,
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
