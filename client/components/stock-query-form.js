var StockQueryForm = React.createClass({
  submitQuote: function(event) {
    event.preventDefault();
    var symbol = $('.stock-query-symbol').val();
    this.props.onSubmit(symbol);
  },
  toggleFatStickMode: function(event) {
    var useFatStickMode = $('.mode-toggle').is(':checked');
    this.props.toggleFatStickMode(useFatStickMode);
  },
  render: function() {
    return (
      <div className='stock-query'>
        <form onSubmit={this.submitQuote}>
          <input type='text' className='stock-query-symbol' />
          <input type='submit' />
        </form>
        <p>
          <input className='mode-toggle' type='checkbox' onChange={this.toggleFatStickMode} />
          Toggle Fat Stick Mode
        </p>
      </div>
    );
  }
});
