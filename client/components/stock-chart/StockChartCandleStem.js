var StockChartCandleStem = React.createClass({
  render: function() {
    return (
      <line x1={this.props.x1} x2={this.props.x2} y1={this.props.y1} y2={this.props.y2} stroke={this.props.stroke} stroke-width={this.props.strokeWidth} />
    );
  }
});
