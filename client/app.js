var App = React.createClass({
  render: function() {
    return (
      <div className='blackbox'>
        <StockQueryForm />
      </div>
    );
  }
});

React.render(
  <App />,
  document.body
);
