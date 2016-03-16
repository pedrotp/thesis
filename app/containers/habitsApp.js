// logic call for the inbox
var React = require('react-native');
var Inbox = require('../components/inbox.js');
var Welcome = require('../components/welcome');
var View = React.View;
var Text = React.Text;
var Navigator = React.Navigator;
var TouchableOpacity = React.TouchableOpacity;


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
      console.warn(error);
    });
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
      <Inbox
        habits={this.state.habits} />
    );
  }
});

module.exports = Habits;
