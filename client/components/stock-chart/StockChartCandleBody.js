var StockChartCandleBody = React.createClass({
  render: function() {
    return (
      <rect x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height} fill={this.props.fill} />
    );
  }
});
