var React = require('react-native');
var Text = React.Text;
var View = React.View;
var Navigator = React.Navigator;
var Component = React.Component;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;
// App components
var Habits = require('../containers/CreateContainer');
var Button = require('react-native-button');

var Welcome = React.createClass({
  onPressButton: function () {
    this.props.navigator.push({
      id: 'AddHabit',
      onboard: true
    });
  },

  render: function () {
    return (
      <View style={{flex: 1}}>
        <Navigator
          renderScene={this.renderScene}
          navigator={this.props.navigator}
        />
      </View>
    );
  },

  renderScene: function (route, navigator) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Ready to be Better?
        </Text>
        <Text style={styles.instructions}>
          Create your first habit!
        </Text>
        <Button
          containerStyle={styles.buttonContainer}
          style={styles.buttonText}
          styleDisabled={{color: 'red'}}
          onPress={this.onPressButton}
        >
          Get Started
        </Button>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#EDBE40',
  },
  welcome: {
    fontFamily: 'Avenir',
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#FFF',
  },
  instructions: {
    fontFamily: 'Avenir',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#FFF',
  },
  buttonText: {
    fontFamily: 'Avenir',
    fontSize: 20, color: 'white',
  },
  buttonContainer: {
    padding: 10,
    height: 45,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#6399DC',
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
  },
});

module.exports = Welcome;
