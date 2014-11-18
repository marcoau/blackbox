var StockChart = React.createClass({
  render: function() {

    var dateFormat = d3.time.format("%Y-%m-%d");
    var width = 960;
    var height = 500;
    var margin = 50;

    var data = this.props.data;
    var x = d3.scale.linear()
      .domain([
        d3.min(data.map(function(d){
          return dateFormat.parse(d.Date).getTime();
        })),
        d3.max(data.map(function(d){
          return dateFormat.parse(d.Date).getTime();
        }))
      ])
      .range([margin,width - margin]);
    var y = d3.scale.linear()
      .domain([
        d3.min(data.map(function(q){
          return q.Low;
        })),
        d3.max(data.map(function(q){
          return q.High;
        }))
      ])
      .range([height - margin, margin]);
    var candleWidth = width / data.length; 

    var candles = _.map(data, function(d, i) {
      d.x = i ? data[i-1].x + candleWidth : 0;
      var candleX = d.x + margin;
      var candleY = y(Math.max(d.Open, d.Close));
      var candleHeight = y(Math.min(d.Open, d.Close))-y(Math.max(d.Open, d.Close));
      // var candleWidth = d.width;
      var candleFill = d.Open > d.Close ? "red" : "green";
      return (
        <StockChartCandle x={candleX} y={candleY} width={candleWidth} height={candleHeight} fill={candleFill} />
      );
    });
    return (
      <svg className="stock-chart" width={width} height={height}>
        {candles}
      </svg>
    );
  }
});
