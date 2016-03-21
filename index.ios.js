'use strict';
var React = require('react-native')
var AppRegistry = React.AppRegistry;
var AppContainer = require('./app/containers/AppContainer');

AppRegistry.registerComponent('thesis', function () {
  return AppContainer;
});
