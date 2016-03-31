var React = require('react-native');
var Text = React.Text;
var View = React.View;
var Navigator = React.Navigator;
var Component = React.Component;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;
var Image = React.Image;

var OnboardPageTwo = React.createClass({
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
          Start Small
        </Text>
        <Image style={styles.img} source={{uri: 'http://better-habits.herokuapp.com/assets/bars.png'}}/>
        <Text style={styles.instructions}>
          Pick a habit that will get you closer to your goal, but will be easy to accomplish every day. We will move up together from there.
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
    width: 64,
    height: 64,
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

module.exports = OnboardPageTwo;
