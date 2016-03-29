var React = require('react-native');
var api = require('../lib/api');
var Text = React.Text;
var View = React.View;
var Navigator = React.Navigator;
var TouchableOpacity = React.TouchableOpacity;

// App components
var LoadingContainer = require('./LoadingContainer');
var Onboard = require('./OnboardContainer');
var Welcome = require('../components/Welcome');
var AddHabit = require('./CreateContainer');
var Habits = require('./InboxContainer');
var HabitSettings = require('../components/HabitSettings');
var HabitDetails = require('../components/HabitDetails');

var AppContainer = React.createClass({
  getInitialState: function () {
    return {
      token: this.props.token,
      profile: this.props.profile,
      user: this.props.user
    };
  },
  render: function () {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          initialRoute = {{id: 'Loading'}}
          renderScene = {this.renderScene}
        />
      </View>
    );
  },
  renderScene: function (route, navigator) {
    var routeId = route.id;
    if (routeId === 'Loading') {
      return (
        <LoadingContainer
          navigator={navigator}
          token={this.state.token}
          profile={this.state.profile}
          user={this.state.user}
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
        />
      );
    }
    if (routeId === 'HabitSettings') {
      return (
        <HabitSettings
          navigator={navigator}
          token={this.state.token}
          profile={this.state.profile}
          habit={route.habit}
        />
      );
    }
    if (routeId === 'HabitDetails') {
      return (
        <HabitDetails
          navigator={navigator}
          token={this.state.token}
          profile={this.state.profile}
          habit={route.habit}
        />
      );
    }
  }
});

module.exports = AppContainer;
