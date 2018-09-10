import React, { Component } from 'react';
import { stratify } from 'd3-hierarchy';
import StockTreemap from './components/StockTreemap';
import Legend from './components/Legend';
import data from './data/data.json';

const stratifiedData = stratify()
  .id(d => d.id)
  .parentId(d => d.parent)(data)
  .sum(d => d.billions);

class App extends Component {
  render() {
    return (
      <div className="App" style={{ margin: '1rem auto', maxWidth: '1024px' }}>
        <StockTreemap data={stratifiedData} height="600" width="800" />
        <Legend data={stratifiedData} />
      </div>
    );
  }
}

export default App;
