'use strict';
var React = require('react-native')
var AppRegistry = React.AppRegistry;
var AppContainer = require('./app/containers/AppContainer');

var localTest = false;

if (localTest === true) {
  process.env.SERVER = 'http://localhost:3000'
} else {
  process.env.SERVER = 'http://better-habits.herokuapp.com'
}

AppRegistry.registerComponent('thesis', function () {
  return AppContainer;
});
