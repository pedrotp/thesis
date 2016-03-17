var React = require('react-native');
var Text = React.Text;
var View = React.View;
var Navigator = React.Navigator;
var Component = React.Component;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;
// App components
var Habits = require('./InboxContainer');
var AddHabit = require('./CreateContainer');
var Welcome = require('../components/Welcome');
var LoadingContainer = require('./LoadingContainer');

var AppContainer = React.createClass({
  render: function () {
      return (
        <View style={{ flex: 1 }}>
          <Navigator
            initialRoute = {{id: 'Loading'}}
            renderScene = {this.renderScene}
            navigationBar={
              <Navigator.NavigationBar
                style={{backgroundColor: '#6399DC', borderBottomWidth: 1, borderColor: '#090f16', alignItems: 'center'}}
                routeMapper={NavigationBarRouteMapper} />
            }
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
        />
      );
    }
    if (routeId === 'Welcome') {
      return (
        <Welcome
          navigator={navigator}
        />
      );
    }
    if (routeId === 'AddHabit') {
      return (
        <AddHabit
          navigator={navigator}
          habit={route.habit}
        />
      );
    }
    if (routeId === 'Habits') {
      return (
        <Habits
          navigator={navigator}
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

var NavigationBarRouteMapper = {
  LeftButton: function (route, navigator, index, navState) {
    if (route.id === 'Habits') {
      return null;
    }
    if (route.id === 'Welcome') {
      return null;
    }
    if (route.id === 'AddHabit') {
      return null;
    }
    if (index === 0) {
      return null;
    }
    return (
      <TouchableOpacity
        onPress={function () { navigator.pop(); }}
        style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{color: 'white', margin: 10}}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function (route, navigator, index, navState) {
    if (route.id === 'Habits' || route.id === 'Welcome') {
      return null;
    } else {
      return (
        <TouchableOpacity
          onPress={function () { navigator.push({ id: 'Habits' }); }}
          style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{color: 'white', margin: 10}}>
            Inbox
          </Text>
        </TouchableOpacity>
      );
    }
  },

  Title: function (route, navigator, index, navState) {
    var title;
    if (route.id === 'AddHabit') {

    // If route.habit exists, that means its being edited
      if (route.habit) {
        title = 'Edit Habit';

    // Else, it's being created
      } else {
        title = 'Create Habit';
      }
    } else if (route.id === 'Habits') {
      title = 'Inbox';

    // If none of the previous if blocks were triggered,
    // the user is at the welcome screen
    } else {
      title = 'Better';
    }
    return (
      <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
};

module.exports = AppContainer;
