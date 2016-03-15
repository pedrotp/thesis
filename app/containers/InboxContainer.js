var React = require('react-native');
var Inbox = require('../components/inbox');
var Welcome = require('../components/welcome');
var View = React.View;
var Text = React.Text;
var Navigator = React.Navigator;
var TouchableOpacity = React.TouchableOpacity;
var StyleSheet = React.StyleSheet;


var Habits = React.createClass({
  getInitialState: function () {
    return {
      habits: []
    }
  },
  getHabits: function () {
    var _this = this;
    fetch('http://localhost:3000/habits', {
      method: 'GET',
    })
    .then(function (response) {
      return response.json()
    })
    .then(function (responseJSON) {
      // console.log('TEXT:', responseJSON);
      _this.setState({habits: responseJSON});
    })
    .catch(function (error) {
      console.warn(error); // TODO: double check console.warn
    });
  },
  deleteHabit: function () {
    console.log("deleteHabit called");
  },
  componentWillMount: function () {
    this.getHabits();
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
        <Text style={styles.header}>BETTER</Text>
        <Inbox habits={this.state.habits} deleteHabit={this.deleteHabit}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 10
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

module.exports = Habits;
