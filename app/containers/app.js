var React = require('react');
var StyleSheet = require('react-native').StyleSheet;
var Text = require('react-native').Text;
var TextInput = require('react-native').TextInput;
var View = require('react-native').View;

var App = React.createClass({
  getInitialState: function () {
    return {
      text: 'DEFAULT TEST TEXT'
    }
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Ready to be Better?
        </Text>
        <Text style={styles.instructions}>
          Tap the button below to create your first habit!
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
      </View>
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
  }
});

module.exports = App;
