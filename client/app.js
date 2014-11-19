var App = React.createClass({
  getInitialState: function() {
    return {
      loading: false,
      symbol: undefined,
      data: undefined
    };
  },
  getStockData: function(symbol) {
    this.setState({
      loading: true
    });
    $.ajax({
      url: '/api/fetch?symbol=' + symbol,
      dataType: 'json',
      success: function(data) {
        console.log(data);
        this.setState({
          loading: false,
          symbol: symbol,
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(err);
      }
    });
  },
  clearData: function() {
    this.setState({
      symbol: undefined,
      data: undefined
    });
  },
  render: function() {
    var heading;
    var chart;

    if(this.state.symbol) {
      heading = <h3>Current stock: {this.state.symbol}<button onClick={this.clearData}>Clear</button></h3>;
      chart = <Chart data={this.state.data} />;
    } else if(this.state.loading) {
      heading = <h3>Loading...</h3>;
    } else {
      heading = <h3>No stock selected yet</h3>;
    }

    return (
      <div className='blackbox'>
        <h1>Welcome to BlackBox! Happy making it rain...</h1>
        <StockQueryForm onSubmit={this.getStockData} />
        {heading}
        {chart}
      </div>
    );
  }
});

React.render(
  <App />,
  document.body
);
