var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser());

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Listening on port ' + port);
});
