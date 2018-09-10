import { format } from 'd3-format';

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

export const color = (parent, type) => {
  const colors = {
    public: {
      domestic: '#1e5f30',
      'fixed-income': '#42a047',
      cash: '#68af61',
      international: '#87c083',
      other: '#a5d5a7',
    },
    corporate: {
      domestic: '#b72025',
      'fixed-income': '#e53f3e',
      cash: '#e85f54',
      international: '#ec7e75',
      other: '#ef9a9b',
    },
    union: {
      domestic: '#e45325',
      'fixed-income': '#f6971e',
      cash: '#f9ae3d',
      international: '#fcc760',
      other: '#ffe081',
    },
    misc: {
      domestic: '#003f6c',
      'fixed-income': '#0079c1',
      cash: '#1b91d0',
      international: '#6cb0e1',
      other: '#a7d6f3',
    },
  };

  return colors[parent][type];
};

export const padder = node => {
  if (node.depth === 0) {
    return 15;
  } else if (node.depth === 1) {
    return 0;
  } else {
    return 0;
  }
};
