var React = require('react-native');
var api = require('../lib/api');
var View = React.View;
var Navigator = React.Navigator;
// App components
var Loading = require('../components/Loading');

var LoadingContainer = React.createClass({
  goToOnboard: function () {
    this.props.navigator.push({id: 'Onboard'})
  },
  goToInbox: function () {
    this.props.navigator.push({id: 'Habits'})
  },
  componentDidMount: function () {
    console.log('this.props.user:', this.props.user);
    if (this.props.user.newUser) {
      this.goToOnboard();
    } else {
      this.goToInbox();
    }
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
