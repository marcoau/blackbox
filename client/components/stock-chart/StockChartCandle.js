var StockChartCandle = React.createClass({
  getDefaultProps: function() {

  },
  render: function() {
    console.log(this.props);
    // var 
    return (
      <rect x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height} fill={this.props.fill} />
    );
  }
});
