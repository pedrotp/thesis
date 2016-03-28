'use strict';
var React = require('react-native')
var AppRegistry = React.AppRegistry;
var AppContainer = require('./app/containers/AppContainer');

var localServer = true;

if (localServer === true) {
  process.env.SERVER = 'http://localhost:3000'
} else {
  process.env.SERVER = 'http://better-habits.herokuapp.com'
}

AppRegistry.registerComponent('thesis', function () {
  return AppContainer;
});
