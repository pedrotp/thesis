'use strict';

var React = require('react-native')
var AppRegistry = React.AppRegistry;
var Auth0credentials = require('./auth0_credentials');
var Auth0Lock = require('react-native-lock-ios');
var AppContainer = require('./app/containers/AppContainer');

// Instantiate a new Lock
var lock = new Auth0Lock({clientId: Auth0credentials.clientId, domain: Auth0credentials.domain});

// Display login widget
lock.show({}, function (err, profile, token) {
  // TODO: pass profile/token to component
  if (err) {
    console.log(err);
    return;
  }
  // Auth works
  console.log('Logged in with Auth0!');
});

AppRegistry.registerComponent('thesis', function () {
  return AppContainer;
});
