import React from 'react';
import { color } from '../helpers';

const Text = props => {
  if (props.selected) {
    return null;
  } else {
    const words = props.node.data.name.split(' ');
    const tspans = words.map((word, i) => {
      return (
        <tspan
          key={`word-${i}`}
          x={props.node.x0 + (props.node.x1 - props.node.x0) / 2}
          dy={20}
        >
          {word}
        </tspan>
      );
    });

    return (
      <g key={props.key}>
        <text
          y={
            props.node.y0 +
            (props.node.y1 - props.node.y0) / 2 -
            (words.length * 14) / 2 -
            18
          }
          textAnchor="middle"
          style={{
            fontSize: 14,
            fontFamily: "'Lato', sans-serif",
            fill: color(props.node.data.id, 'domestic'),
            stroke: color(props.node.data.id, 'domestic'),
            strokeWidth: 3,
          }}
        >
          {tspans}
        </text>
        <text
          y={
            props.node.y0 +
            (props.node.y1 - props.node.y0) / 2 -
            (words.length * 14) / 2 -
            18
          }
          textAnchor="middle"
          style={{
            fontSize: 14,
            fontFamily: "'Lato', sans-serif",
            fill: '#fff',
          }}
        >
          {tspans}
        </text>
      </g>
    );
  }
};

export default Text;
