// logic call for the inbox
var React = require('react');
var Inbox = require('../components/inbox.js');

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
      console.log('TEXT:', responseJSON)
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
    return <Inbox
      habits={this.state.habits}
    />
  }
})

module.exports = Habits;
