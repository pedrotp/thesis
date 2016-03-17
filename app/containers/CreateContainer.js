var React = require('react-native');
var View = React.View;
var Text = React.Text;
var Alert = React.Alert;
var Navigator = React.Navigator;
var TouchableOpacity = React.TouchableOpacity;

var Habits = require('./InboxContainer');
var Create = require('../components/Create');

var AddHabit = React.createClass({
  getInitialState: function () {
    console.log("CREATE INITIAL STATE:", this.props.habit);
    return {
      fields: {
        action: null,
        frequency: null,
        unit: null,
        goal: null,
        schedule: null
      }
    }
  },

  sendHabit: function (reqbody) {
    var _this = this;
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
      Alert.alert(
        'Habit created!',
        null,
        [
          {
            text: 'Ok',
            onPress: function () {
              _this.goToNext();
            }
          }
        ]
      );
    })
    .catch(function (error) {
      console.warn(error);
      Alert.alert(
        'Error!',
        null,
        [
          {
            text: 'Ok'
          }
        ]
      );
    });
  },

  goToNext: function () {
    this.props.navigator.push({
      id: 'Habits'
    });
  },

  handleClick: function () {
    var action = this.state.fields.action;
    var frequency = this.state.fields.frequency;
    var unit = this.state.fields.unit;
    var goal = this.state.fields.goal;
    var schedule = this.state.fields.schedule;

    this.setState({
      fields: {
        action: "",
        frequency: "",
        unit: "",
        goal: "",
        schedule: ""
      }
    });

    this.sendHabit({
      action: action,
      frequency: frequency,
      unit: unit,
      goal: goal,
      schedule: schedule
    });
  },

  render: function () {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          renderScene={this.renderScene}
          navigator={this.props.navigator}
        />
      </View>
    );
  },

  renderScene: function (route, navigator) {
    return (
      <Create
        fields={this.state.fields}
        handleClick={this.handleClick}
      />
    );
  }
});

module.exports = AddHabit;
