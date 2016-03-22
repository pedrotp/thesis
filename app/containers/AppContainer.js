var React = require('react-native');
var api = require('../lib/api');
var Text = React.Text;
var View = React.View;
var Navigator = React.Navigator;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;
var Auth0credentials = require('../../auth0_credentials');
var Auth0Lock = require('react-native-lock-ios');

// App components
var LoadingContainer = require('./LoadingContainer');
var Onboard = require('./OnboardContainer');
var Welcome = require('../components/Welcome');
var AddHabit = require('./CreateContainer');
var Habits = require('./InboxContainer');


// Instantiate a new Lock
var lock = new Auth0Lock({clientId: Auth0credentials.clientId, domain: Auth0credentials.domain});

var AppContainer = React.createClass({
  getInitialState: function () {
    return {
      auth: false,
      token: null,
      profile: null
    };
  },
  handleLogout: function () {
    this.setState({
      auth: false,
      token: null,
      profile: null
    });
  },
  componentDidMount: function () {
    var _this = this;
    // If user not logged in
    if (!this.state.auth) {
      // Display login widget
      lock.show({}, function (err, profile, token) {
        // TODO: pass profile/token to component
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
        .then(function (res) {
          // On successful login + store user
          // Set user info on state
          _this.setState({
            auth: true,
            token: token,
            profile: profile,
          });
        })
        .catch(function (err) {
          console.warn(err);
        });
      });
    }
  },
  render: function () {
    if (this.state.auth) {
      return (
        <View style={{ flex: 1 }}>
          <Navigator
            initialRoute = {{id: 'Loading'}}
            renderScene = {this.renderScene}
          />
        </View>
      );
    } else {
      return (
        <View></View>
      );
    }
  },
  renderScene: function (route, navigator) {
    var routeId = route.id;

    if (routeId === 'Loading') {
      return (
        <LoadingContainer
          navigator={navigator}
          token={this.state.token}
          profile={this.state.profile}
        />
      );
    }
    if (routeId === 'Onboard') {
      return (
        <Onboard
          navigator={navigator}
        />
      );
    }
    if (routeId === 'AddHabit') {
      return (
        <AddHabit
          navigator={navigator}
          habit={route.habit}
          token={this.state.token}
          profile={this.state.profile}
        />
      );
    }
    if (routeId === 'Habits') {
      return (
        <Habits
          navigator={navigator}
          token={this.state.token}
          profile={this.state.profile}
          lock={lock}
          handleLogout={this.handleLogout}
        />
      );
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  button: {
    height: 30,
    width: 80,
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    margin: 20
  }
});

module.exports = AppContainer;
