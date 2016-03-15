var React = require('react');
var Habits = require('./habitsApp.js');

var App = React.createClass({
  getInitialState: function () {
    return {
      text: 'DEFAULT TEST TEXT'
    }
  },

  render() {
    return (
      <Habits />
    )
  }
});

module.exports = App;
