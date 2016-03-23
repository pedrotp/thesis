// load environment variables from .env
require('dotenv').config();

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./routes');
var db = require('../db/db');

// For suppressing logging when testing
var testing = process.env.NODE_ENV === 'test';

var app = express();

if (!testing) {
  app.use(morgan('dev'));
}
app.use(bodyParser());
app.use(express.static(__dirname + '/../pub'));

var port = process.env.PORT || 3000;

app.listen(port, function () {
  if (!testing) {
    console.log('Listening on port', port);
  }
});

routes(app, express);

module.exports = app;
