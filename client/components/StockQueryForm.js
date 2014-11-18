var StockQueryForm = React.createClass({
  render: function() {
    return (
      <form className="stock-query">
        <input type='text' className='stock-query-symbol' />
        <input type='submit' />
      </form>
    );
  }
});
