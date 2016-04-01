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
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: 25,
  },
  img: {
    width: 64,
    height: 64,
    marginTop: 20,
  },
});

module.exports = OnboardPageTwo;
