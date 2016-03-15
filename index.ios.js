var AppRegistry = require('react-native').AppRegistry;
var App = require('./app/containers/app');
var addHabitsApp = require('./app/containers/addHabitsApp');

AppRegistry.registerComponent('thesis', function () {
  return App;
});
