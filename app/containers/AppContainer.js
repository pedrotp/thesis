var React = require('react-native');
var Navigator = React.Navigator;
var StyleSheet = React.StyleSheet;

var Welcome = require('../components/welcome');
var AddHabit = require('./CreateContainer');
var Habits = require('./InboxContainer');

var AppContainer = React.createClass({

  render: function () {
    return (
     <Navigator
        initialRoute = {{id: 'Welcome', name: 'Index'}}
        renderScene = {this.renderScene} />
    );
  },

  renderScene: function (route, navigator) {
    var routeId = route.id;
    if (routeId === 'Welcome') {
      return (
        <Welcome
          navigator={navigator} />
      );
    }
    if (routeId === 'AddHabit') {
      return (
        <AddHabit
          navigator={navigator} />
      );
    }
    if (routeId === 'Habits') {
      return (
        <Habits
          navigator={navigator} />
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
