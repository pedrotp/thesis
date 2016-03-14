// logic call for create
var React = require('react');
var Create = require('../components/create.js');
var Alert = require('react-native').Alert;

var AddHabit = React.createClass({
  getInitialState: function () {
    return {
      // initial state
    }
  },
  sendHabit: function (reqbody) {
    fetch('http://localhost:3000/habits', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqbody)
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (responseJSON) {
      console.log('success responseJSON:', responseJSON);
      Alert.alert(
        'Habit created!',
        'Thank you!',
        [
          { text: 'Ok'}
        ])
    })
    .catch(function (error) {
      console.warn(error);
    });
  }
});
