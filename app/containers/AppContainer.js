var React = require('react-native');
var api = require('../lib/api');
var Text = React.Text;
var View = React.View;
var Navigator = React.Navigator;
var TouchableOpacity = React.TouchableOpacity;
var Auth0credentials = require('../../auth0_credentials');
var Auth0Lock = require('react-native-lock-ios');

// App components
var LoadingContainer = require('./LoadingContainer');
var Onboard = require('./OnboardContainer');
var Welcome = require('../components/Welcome');
var AddHabit = require('./CreateContainer');
var Habits = require('./InboxContainer');
var HabitSettings = require('../components/HabitSettings');
var HabitDetails = require('../components/HabitDetails');


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
    this.showLock();
  },
  showLock: function () {
    var _this = this;
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
          _onLockShow={this._onLockShow}
        />
      );
    }
    if(routeId === 'HabitSettings') {
      // last prop on HabitSettings should be habitId to be used in
      // HabitSettings to retrieve habit details from database (this.route.habitId)
      return (
        <HabitSettings
          navigator={navigator}
          token={this.state.token}
          profile={this.state.profile}
          habitName={'Habit Name goes here'}
        />
      );
    }
    if(routeId === 'HabitDetails') {
      // last prop on HabitSettings should be habitId to be used in
      // HabitDetails to retrieve habit details from database (this.route.habitId)
      return (
        <HabitDetails
          navigator={navigator}
          token={this.state.token}
          profile={this.state.profile}
          habitName={'Habit Name goes here'}
        />
      );
    }
  }
});


module.exports = AppContainer;
