var React = require('react');
var Text = require('react-native').Text;
var View = require('react-native').View;
var Component = require('react-native').Component;
var StyleSheet = require('react-native').StyleSheet;
var TouchableHighlight = require('react-native').TouchableHighlight;
var Navigator = require('react-native').Navigator;

var Habits = require('../containers/habitsApp');

var Welcome = React.createClass({
  onPressButton: function () {
    console.log('Add Habit is being clicked!');
    this.props.navigator.push({
      id: 'AddHabit',
      name: 'Add Habit'
    })
  },
  renderScene: function (route, navigator) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Ready to be Better?
        </Text>
        <Text style={styles.instructions}>
          Tap the button below to create your first habit!
        </Text>
        <TouchableHighlight onPress={this.onPressButton}>
          <View style={styles.button}>
            <Text>
              Add Habit
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  },
  render: function () {
    return (
      <Navigator 
        renderScene={this.renderScene}
      />
      )
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

module.exports = Welcome;