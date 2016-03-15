var React = require('react');
var Create = require('../components/create.js');
var Alert = require('react-native').Alert;
var Navigator = require('react-native').Navigator;

var AddHabit = React.createClass({
  getInitialState: function () {
    return {
      action: null,
      frequency: null,
      unit: null,
      goal: null,
      schedule: null
    }
  },

  fields: {
    action: null,
    frequency: null,
    unit: null,
    goal: null,
    schedule: null
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
      // Alert.alert(
      //   'Habit created!',
      //   'Thank you!',
      //   [
      //     { text: 'Ok'}
      //   ])
    })
    .catch(function (error) {
      console.warn(error);
    });
  },
  
  goToNext: function() {
    console.log('redirected');
    this.props.navigator.push({
      id: 'Habits',
      name: 'HabitsView'
    });
  },

  handleClick: function () {
    var action = this.fields.action;
    var frequency = this.fields.frequency;
    var unit = this.fields.unit;
    var goal = this.fields.goal;
    var schedule = this.fields.schedule;

    this.setState({
      action,
      frequency,
      unit,
      goal,
      schedule
    });

    this.sendHabit({
      action: action,
      frequency: frequency,
      unit: unit,
      goal: goal,
      schedule: schedule
    });
    
    this.goToNext();
  },
  render: function () {
    return (
      <Navigator
        renderScene={this.renderScene}
      />
      )
  },
  renderScene: function (route, navigator) {
    return (
      <Create
        fields={this.fields}
        handleClick={this.handleClick} />
    );
  }
});

module.exports = AddHabit;
