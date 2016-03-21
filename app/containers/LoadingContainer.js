var React = require('react-native');
var api = require('../lib/api');
var View = React.View;
var Navigator = React.Navigator;
// App components
var Loading = require('../components/Loading');

var LoadingContainer = React.createClass({
  getHabits: function () {
    var _this = this;
    // fetch('http://better-habits.herokuapp.com/habits', {
    fetch('http://localhost:3000/habits', {
      method: 'GET',
    })
    .then(api.handleErrors)
    .then(function (response) {
      return response.json();
    })
    .then(function (responseData) {
      if(!responseData.length) {
        _this.goToOnboard();
      } else {
        _this.goToInbox();
      }
    })
    .catch(function (err) {
      console.warn(err);
    });
  },
  goToOnboard: function () {
    this.props.navigator.push({id: 'Onboard'})
  },
  goToInbox: function () {
    this.props.navigator.push({id: 'Habits'})
  },
  componentDidMount: function () {
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
      <Loading
        fields={this.fields}
        handleClick={this.handleClick} />
    );
  }
});

module.exports = LoadingContainer;
