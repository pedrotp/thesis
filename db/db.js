var mongoose = require('mongoose');
var uri = process.env.MONGOLAB_URI || 'mongodb://localhost/betterdb'; 

mongoose.connect(uri);
mongoose.Promise = require('bluebird');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.log.bind(console, 'mongoose connection open'));

module.exports = db;