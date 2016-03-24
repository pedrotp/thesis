var React = require('react-native');
var Text = React.Text;
var View = React.View;
var Navigator = React.Navigator;
var Component = React.Component;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;
var Image = React.Image;
// App components

var OnboardPageOne = React.createClass({
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
          Welcome to Better.
        </Text>
        <Image style={styles.img} source={{uri: 'http://better-habits.herokuapp.com/assets/odometer.png'}}/>
        <Text style={styles.instructions}>
          Our mission is to help you achieve your goals by building positive daily habits.
        </Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#FFF',
    padding: 25
  },
  img: {
    width: 83,
    height: 50,
    marginTop: 20
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

module.exports = OnboardPageOne;