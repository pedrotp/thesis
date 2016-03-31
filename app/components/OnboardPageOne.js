var React = require('react-native');
var Text = React.Text;
var View = React.View;
var Navigator = React.Navigator;
var Component = React.Component;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;
var Image = React.Image;

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
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDBE40'
  },
  welcome: {
    fontFamily: 'Avenir',
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#FFF'
  },
  instructions: {
    fontFamily: 'Avenir',
    fontSize: 22,
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
});

module.exports = OnboardPageOne;
