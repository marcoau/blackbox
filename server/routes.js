var Stocks = require('./stocks');

module.exports = function(app) {
  app.get('/api/fetch', Stocks.fetchData);
};
