var StockQueryForm = React.createClass({
  submitQuote: function(event) {
    event.preventDefault();
    var symbol = $('.stock-query-symbol').val();
    this.props.onSubmit(symbol);
  },
  render: function() {
    return (
      <div className='stock-query'>
        <form onSubmit={this.submitQuote}>
          <input type='text' className='stock-query-symbol' />
          <input type='submit' />
        </form>
      </div>
    );
  }
});
