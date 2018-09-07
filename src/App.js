import React, { Component } from 'react';
import { stratify, hierarchy } from 'd3-hierarchy';
import StockTreemap from './components/StockTreemap';
import data from './data/data.json';

const stratifiedData = stratify()
  .id(d => d.id)
  .parentId(d => d.parent)(data)
  .sum(d => d.billions);

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App" style={{ margin: '1rem auto', maxWidth: '1024px' }}>
        <StockTreemap data={stratifiedData} height="600" width="800" />
      </div>
    );
  }
}

export default App;
