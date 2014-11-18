var _ = require('underscore');
var parse = require('csv-parse');
var request = require('request');

var fetchData = function(req, res){
  var symbol = req.param('symbol');
  var options = {
    url: 'http://ichart.finance.yahoo.com/table.csv?s=' + symbol + '&a=00&b=01&c=2014'
  };

  request(options, function(err, response, body) {
    if(err) {
      console.error(err);
      return res.sendStatus(500);
    } else {
      parse(body, {columns: true}, function(err, output){
        console.log(output);
        _.each(output, function(quote){
          quote.Open = Number(quote.Open);
          quote.High = Number(quote.High);
          quote.Low = Number(quote.Low);
          quote.Close = Number(quote.Close);
          quote['Adj Close'] = Number(quote['Adj Close']);
          quote.Volume = Number(quote.Volume);

          // adjust quotes based on Adj Close
          var coeff = quote['Adj Close']/quote.Close;
          quote.Open *= coeff;
          quote.High *= coeff;
          quote.Low *= coeff;
          quote.Close *= coeff;

        })
        // reverse order to make newest quotes last
        res.send(output.reverse());
      });
    }
  });
};

module.exports = {
  fetchData: fetchData
};
