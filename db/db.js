var mongoose = require('mongoose');
var uri = process.env.MONGOLAB_URI || 'mongodb://localhost/betterdb';

// Flag to prevent console.log on connection when testing
var testing = require('../test/ServerSpec').testing;

mongoose.connect(uri);
mongoose.Promise = require('bluebird');

// test mongoose bluebird import
// assert.equal(query.exec().constructor, require('bluebird'));

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

if (!testing) {
  db.once('open', console.log.bind(console, 'mongoose connection open'));
}

module.exports = db;
