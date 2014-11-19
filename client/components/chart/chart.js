var Chart = React.createClass({
  getInitialState: function() {
    return {
      fatStickMode: true
    }
  },
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

    if(this.state.fatStickMode) {
      // calculate candle widths based on volume
      var totalVolume = _.reduce(data, function(memo, quote){
        return memo + quote.Volume;
      }, 0);
      _.each(data, function(quote, i){
        quote.width = (width - 2 * margin) * (quote.Volume / totalVolume);
        if(i){
          quote.x = data[i-1].x + data[i-1].width;
        }else{
          quote.x = 0;
        }
      });
    } else {
      var candleWidth = width / data.length;
    }

    var candleBodies = _.map(data, function(d, i) {
      if(!this.state.fatStickMode) {
        d.x = i ? data[i-1].x + candleWidth : 0;
      } else {
        var candleWidth = d.width;
      }
      var candleX = d.x + margin;
      var candleY = y(Math.max(d.Open, d.Close));
      var candleHeight = y(Math.min(d.Open, d.Close))-y(Math.max(d.Open, d.Close));
      var candleFill = d.Open > d.Close ? "red" : "green";
      return (
        <ChartCandleBody x={candleX} y={candleY} width={candleWidth} height={candleHeight} fill={candleFill} />
      );
    }.bind(this));
    var candleStems = _.map(data, function(d, i) {
      if(this.state.fatStickMode) {
        var stemX = d.x + d.width / 2 + margin;
      } else {
        var stemX = d.x + candleWidth / 2 + margin;
      }
      var stemY1 = y(d.High);
      var stemY2 = y(d.Low);
      var stemStroke = d.Open > d.Close ? "red" : "green";
      var stemStrokeWidth = candleWidth / 5;
      return (
        <ChartCandleStem x1={stemX} x2={stemX} y1={stemY1} y2={stemY2} stroke={stemStroke} strokeWidth={stemStrokeWidth} />
      );
    }.bind(this));
    
    return (
      <svg className="stock-chart" width={width} height={height}>
        {candleBodies}
        {candleStems}
      </svg>
    );
  }
});
