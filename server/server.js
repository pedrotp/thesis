var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./routes');
var db = require('../db/db');

// Flag to turn off loggers (morgan, console.logs, etc) when testing
var testing = require('../test/ServerSpec').testing;

var app = express();

if (!testing) {
  app.use(morgan('dev'));
}
app.use(bodyParser());

var port = process.env.PORT || 3000;

app.listen(port, function () {
  if (!testing) {
    console.log('Listening on port', port);
  }
});

routes(app, express);

module.exports = app;
