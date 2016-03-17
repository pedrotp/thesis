var React = require('react-native');
var Loading = require('../components/Loading');
var Navigator = React.Navigator;
var View = React.View;


var LoadingContainer = React.createClass({
  getHabits: function () {
    var _this = this;
    fetch('http://localhost:3000/habits', {
      method: 'GET',
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (responseData) {
      if(!responseData.length) {
        _this.goToWelcome();
      } else {
        _this.goToInbox();
      }
    })
    .done();
  },
  goToWelcome: function () {
    this.props.navigator.push({id: 'Welcome'})
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