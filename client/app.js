var App = React.createClass({
  getInitialState: function() {
    return {
      symbol: undefined,
    };
  },
  getStockData: function(symbol) {
    this.setState({
      symbol: symbol
    });
  },
  render: function() {
    var heading;
    if(this.state.symbol) {
      heading = <h3>Current stock: {this.state.symbol}</h3>;
    } else {
      heading = <h3>No stock selected yet</h3>;
    }

    return (
      <div className='blackbox'>
        <StockQueryForm onSubmit={this.getStockData}/>
        {heading}
      </div>
    );
  }
});

React.render(
  <App />,
  document.body
);
