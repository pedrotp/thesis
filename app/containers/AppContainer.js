var React = require('react-native');
var Text = React.Text;
var View = React.View;
var Navigator = React.Navigator;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;
// App components
var Habits = require('./InboxContainer');
var AddHabit = require('./CreateContainer');
var Welcome = require('../components/Welcome');
var LoadingContainer = require('./LoadingContainer');
var OnboardPageOne = require('../components/OnboardPageOne');
var OnboardPageTwo = require('../components/OnboardPageTwo');

var AppContainer = React.createClass({
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
    if (routeId === 'OnboardPageOne') {
      return (
        <OnboardPageOne
          navigator={navigator}
        />
      );
    }
    if (routeId === 'OnboardPageTwo') {
      return (
        <OnboardPageTwo
          navigator={navigator}
        />
        );
    }
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

module.exports = AppContainer;
