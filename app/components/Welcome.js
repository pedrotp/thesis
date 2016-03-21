var React = require('react-native');
var Text = React.Text;
var View = React.View;
var Navigator = React.Navigator;
var Component = React.Component;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;
// App components
var Habits = require('../containers/CreateContainer');

var Welcome = React.createClass({
  onPressButton: function () {
    this.props.navigator.push({
      id: 'Onboard'
    });
  },
  render: function () {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          renderScene={this.renderScene}
          navigator={this.props.navigator} />
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
        <TouchableOpacity onPress={this.onPressButton}>
          <View style={styles.button}>
            <Text style={{color: '#FFF'}}>
              Get Started
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDBE40'
  },
  welcome: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#FFF'
  },
  instructions: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#FFF'
  },
  button: {
    height: 30,
    width: 100,
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#FFF',
    borderWidth: 0,
    borderRadius: 5,
    padding: 5,
    margin: 20,
    backgroundColor: '#6399DC',
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    shadowRadius: 3,
    shadowOffset: {
      height: 3.5,
      width: 2
    }
  }
});

module.exports = Welcome;
