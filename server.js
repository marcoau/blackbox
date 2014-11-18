var express = require('express');

var app = express();
app.use(express.static('./client'));
// basic request logger
app.use(function(req, res, next) {
  console.log(req.method + ': ' + req.url);
  next();
});

require('./server/routes')(app);

app.listen(process.env.PORT || 8888);
console.log('BlackBox @ :8888');
