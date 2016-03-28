// Temporary fix for suppressing warnings from DatePickerIOS which
// has an unresolved issue regarding the date being passed to it
// https://github.com/facebook/react-native/issues/4547
console.ignoredYellowBox = [
  'Warning: Failed propType',
];

var React = require('react-native');
var api = require('../lib/api');
var View = React.View;
var Text = React.Text;
var Alert = React.Alert;
var TextInput = React.TextInput;
var StyleSheet = React.StyleSheet;
var Navigator = React.Navigator;
var TouchableOpacity = React.TouchableOpacity;
var DatePickerIOS = React.DatePickerIOS;
var Switch = React.Switch;

var Button = require('react-native-button');

var HabitSettings = React.createClass({
  getInitialState: function () {
    return {
      habit: this.props.habit
    };
  },
  onDateChange: function (date) {
    var updates = this.state.habit;
    updates.reminder.time = date;
    this.setState({ habit: updates });
  },
  onTextChange: function (text) {
    var updates = this.state.habit;
    updates.action = text;
    this.setState({ habit: updates });
  },
  onReminderChange: function (bool) {
    var updates = this.state.habit;
    updates.reminder.active = bool;
    this.setState({ habit: updates });
  },
  gotoInbox: function () {
    this.props.navigator.push({ id: 'Habits' });
  },
  updateHabit: function (habitId) {
    var _this = this;
    fetch(process.env.SERVER + '/habits/' + this.props.profile.email + '/' + habitId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.token.idToken
      },
      body: JSON.stringify(this.state.habit)
    })
    .then(api.handleErrors)
    .then(function (response) {
      _this.gotoInbox();
    })
    .catch(function (err) {
      console.warn(err);
    });
  },
  deleteHabit: function (habitId) {
    var _this = this;
    // TODO: refactor server call to api library
    fetch(process.env.SERVER + '/habits/' + this.props.profile.email + '/' + habitId, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + this.props.token.idToken
      }
    })
    .then(api.handleErrors)
    .then(function (response) {
      Alert.alert(
        'Habit Deleted',
        null,
        [
          {
            text: 'Ok',
            onPress: function () {
              _this.props.navigator.push({ id: 'Habits' });
            }
          }
        ]
      );
    })
    .catch(function (err) {
      console.warn(err);
    });
  },
  render: function () {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          renderScene={this.renderScene}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#6399DC', alignItems: 'center'}}
              routeMapper={NavigationBarRouteMapper}
            />
          }
        />
      </View>
    );
  },
  renderScene: function (route, navigator) {
    var _this = this;
    if (this.state.habit.reminder.active) {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.heading}
            defaultValue={this.props.habit.action}
            onChangeText={this.onTextChange}
          />
          <View style={{ flexDirection: 'row', marginTop: 60 }}>
            <Text style={{fontSize: 22}}>
              Reminder
            </Text>
            <Switch
              onValueChange={this.onReminderChange}
              style={{left: 190, marginBottom: 30}}
              value={this.state.habit.reminder.active}
            />
          </View>
            <DatePickerIOS
              date={new Date(this.state.habit.reminder.time)}
              mode="time"
              minuteInterval={5}
              onDateChange={this.onDateChange}
            />
          <Button
            containerStyle={styles.updateButtonContainer}
            style={styles.updateButtonText}
            styleDisabled={{color: 'red'}}
            onPress={function () {_this.updateHabit(_this.state.habit._id)}}
          >
            Update Habit
          </Button>
          <Button
            containerStyle={styles.deleteButtonContainer}
            style={styles.deleteButtonText}
            styleDisabled={{color: 'red'}}
            onPress={function () {_this.deleteHabit(_this.state.habit._id)}}
          >
            Delete Habit
          </Button>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.heading}
            defaultValue={this.props.habit.action}
            onChangeText={this.onTextChange}
          />
          <View style={{ flexDirection: 'row', marginTop: 60, marginBottom: 216 }}>
            <Text style={{fontSize: 22}}>
              Reminder
            </Text>
            <Switch
              onValueChange={this.onReminderChange}
              style={{left: 190, marginBottom: 30}}
              value={this.state.habit.reminder.active}
            />
          </View>
          <Button
            containerStyle={styles.updateButtonContainer}
            style={styles.updateButtonText}
            styleDisabled={{color: 'red'}}
            onPress={function () {_this.updateHabit(_this.state.habit._id)}}
          >
            Update Habit
          </Button>
          <Button
            containerStyle={styles.deleteButtonContainer}
            style={styles.deleteButtonText}
            styleDisabled={{color: 'red'}}
            onPress={function () {_this.deleteHabit(_this.state.habit._id)}}
          >
            Delete Habit
          </Button>
        </View>
      );
    }
  }
});

var NavigationBarRouteMapper = {
  LeftButton: function (route, navigator, index, navState) {
    return (
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center'}}
        onPress={function () { navigator.parentNavigator.pop(); }}>
        <Text style={{color: 'white', margin: 10}}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function (route, navigator, index, navState) {
    return null;
  },

  Title: function (route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
          Habit Settings
        </Text>
      </TouchableOpacity>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    top: 120,
  },
  heading: {
    height: 40,
    textAlign: 'center',
    fontSize: 34
  },
  deleteButtonText: {
    fontSize: 20, 
    color: '#e14f3f'
  },
  deleteButtonContainer: {
    padding:10, 
    height:45, 
    overflow:'hidden', 
    borderRadius:4, 
    backgroundColor: 'white', 
    marginTop: 20
  },
  updateButtonText: {
    fontSize: 20, color: 'white'
  },
  updateButtonContainer: {
    padding:10, height:45, 
    overflow:'hidden', 
    borderRadius:4, 
    backgroundColor: '#6399DC', 
    marginTop: 20
  },
});
module.exports = HabitSettings;
