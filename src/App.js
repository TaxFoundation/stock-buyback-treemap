import React, { Component } from 'react';
import StockTreemap from './components/StockTreemap';
import data from './data/data.json';

class App extends Component {
  render() {
    return (
      <div className="App">
        <StockTreemap data={data} height="600" width="800" />
      </div>
    );
  }
}

export default App;
