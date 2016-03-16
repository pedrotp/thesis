var React = require('react-native');
var Habits = require('./habitsApp');
var Create = require('../components/create.js');
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
    console.log('redirected');
    this.props.navigator.push({
      id: 'Habits',
      name: 'Habits View'
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
        navigator={this.props.navigator}
        navigationBar={
            <Navigator.NavigationBar
              style={{backgroundColor: '#6399DC', alignItems: 'center'}}
              routeMapper={NavigationBarRouteMapper} />
        } />
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

var NavigationBarRouteMapper = {
  LeftButton: function (route, navigator, index, navState) {
    return (
      <TouchableOpacity onPress={function (){ navigator.pop() }} style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10}}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function (route, navigator, index, navState) {
    console.log('NAV:', navigator);
    console.log('NAVSTATE:', navState);
    return (
      <TouchableOpacity onPress={function (){ navigator.push({id: 'Habits', name: 'Habits View'}); }} style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10}}>
          Inbox
        </Text>
      </TouchableOpacity>
    );
  },

  Title: function (route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
          Create Habit
        </Text>
      </TouchableOpacity>
    );
  }
};

module.exports = AddHabit;
