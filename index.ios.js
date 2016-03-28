'use strict';
var React = require('react-native')
var AppRegistry = React.AppRegistry;
var TabBarIOS = React.TabBarIOS;
var View = React.View;
var Text = React.Text;
var Image = React.Image;
var api = require('./app/lib/api');
var Icon = require('react-native-vector-icons/FontAwesome');
var AppContainer = require('./app/containers/AppContainer');
var ProfileContainer = require('./app/containers/ProfileContainer');

var Auth0credentials = require('./auth0_credentials');
var Auth0Lock = require('react-native-lock-ios');

var localServer = false;

if (localServer === true) {
  process.env.SERVER = 'http://localhost:3000'
} else {
  process.env.SERVER = 'http://better-habits.herokuapp.com'
}

// Instantiate a new Lock
var lock = new Auth0Lock({clientId: Auth0credentials.clientId, domain: Auth0credentials.domain});

var TabContainer = React.createClass({
  getInitialState: function () {
    return {
      selectedTab: 'inbox',
      auth: false,
      profile: null,
      token: null
    }
  },
  handleLogout: function () {
    console.log('handleLogout called in index');
    this.setState({
      auth: false,
      token: null,
      profile: null
    });
    this.showLock();
  },
  showLock: function () {
    // Display login widget
    lock.show({}, (function (err, profile, token) {
      if (err) {
        console.log(err);
        return;
      }
      // Store user in DB
      fetch(process.env.SERVER + '/user', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.idToken
        },
        body: JSON.stringify(profile)
      })
      .then(api.handleErrors)
      .then((function (res) {
        // On successful login + store user
        // Set user info on state
        this.setState({
          selectedTab: 'inbox',
          auth: true,
          token: token,
          profile: profile,
        });
      }).bind(this))
      .catch(function (err) {
        console.warn(err);
      });
    }).bind(this));
  },
  componentDidMount: function () {
    // If user not logged in
    if (!this.state.auth) {
      this.showLock();
    }
  },
  render: function () {
    if (this.state.auth) {
      return (
        <TabBarIOS selectedTab={this.state.selectedTab}>
          <Icon.TabBarItemIOS
            selected={this.state.selectedTab === 'inbox'}
            title='Inbox'
            iconName='inbox'
            onPress={(function () {
              this.setState({
                selectedTab: 'inbox',
              });
            }).bind(this)}
          >
            <AppContainer
              token={this.state.token}
              profile={this.state.profile}
            />
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            selected={this.state.selectedTab === 'profile'}
            title='Profile'
            iconName='user'
            onPress={(function () {
              this.setState({
                selectedTab: 'profile',
              })
            }).bind(this)}
          >
            <ProfileContainer
              token={this.state.token}
              profile={this.state.profile}
              handleLogout={this.handleLogout}
            />
          </Icon.TabBarItemIOS>
        </TabBarIOS>
      );
    } else {
      return (
        <View></View>
      );
    }
  }
});

AppRegistry.registerComponent('thesis', function () {
  return TabContainer;
});
