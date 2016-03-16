var React = require('react-native');
var Habits = require('./InboxContainer');
var Create = require('../components/create');
var View = React.View;
var Text = React.Text;
var Alert = React.Alert;
var Navigator = React.Navigator;
var TouchableOpacity = React.TouchableOpacity;

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
      console.log('Add Habit success:', responseJSON);
      // Alert.alert('Habit created!', null,[{ text: 'Ok'}]);
    })
    .catch(function (error) {
      console.warn(error);
    });
  },

  goToNext: function () {
    this.props.navigator.push({
      id: 'Habits'
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
      <View style={{ flex: 1 }}>
        <Navigator
          renderScene={this.renderScene}
          navigator={this.props.navigator} />
      </View>
    );
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
