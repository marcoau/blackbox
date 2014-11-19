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

    var candleBodies = _.map(data, function(d, i) {
      d.x = i ? data[i-1].x + candleWidth : 0;
      var candleX = d.x + margin;
      var candleY = y(Math.max(d.Open, d.Close));
      var candleHeight = y(Math.min(d.Open, d.Close))-y(Math.max(d.Open, d.Close));
      // var candleWidth = d.width;
      var candleFill = d.Open > d.Close ? "red" : "green";
      return (
        <StockChartCandleBody x={candleX} y={candleY} width={candleWidth} height={candleHeight} fill={candleFill} />
      );
    });
    var candleStems = _.map(data, function(d, i) {
      var stemX1 = d.x + candleWidth / 2 + margin;
      var stemX2 = d.x + candleWidth / 2 + margin;
      var stemY1 = y(d.High);
      var stemY2 = y(d.Low);
      var stemStroke = d.Open > d.Close ? "red" : "green";
      var stemStrokeWidth = candleWidth / 5;
      return (
        <StockChartCandleStem x1={stemX1} x2={stemX2} y1={stemY1} y2={stemY2} stroke={stemStroke} strokeWidth={stemStrokeWidth} />
      );
    });
    return (
      <svg className="stock-chart" width={width} height={height}>
        {candleBodies}
        {candleStems}
      </svg>
    );
  }
});
