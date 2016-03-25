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

var HabitSettings = React.createClass({
  getInitialState: function () {
    return {
      habit: {
        action: this.props.habit.action,
        frequency: this.props.habit.frequency,
        id: this.props.habit._id,
        createdAt: this.props.habit.createdAt,
        updatedAt: this.props.habit.updatedAt,
        instanceCount: this.props.habit.instanceCount,
        instancesId: this.props.habit.instancesId,
        streak: {
          current: this.props.habit.streak.current,
          max: this.props.habit.streak.max,
          maxDate: this.props.habit.streak.maxDate
        },
        lastDone: this.props.habit.lastDone,
        reminder: {
          set: this.props.habit.reminder.set,
          time: this.props.habit.reminder.time
        }
      }
    };
  },
  componentDidMount: function () {
    // console.log('HAB:', this.state.habit);
  },
  onDateChange: function (date) {
    this.setState({ habit: { reminder: { ...this.state.habit.reminder, time: date }}});
  },
  onTextChange: function (text) {
    this.setState({ habit: { ...this.state.habit, action: text }})
  },
  onReminderChange: function (bool) {
    this.setState({ habit: { reminder: { ...this.state.habit.reminder, set: bool }}});
  },
  onEndTextEdit: function () {
    // console.log('YOLO?', this.state.habit);
  },
  deleteHabit: function (habitId) {
    var _this = this;
    // TODO: refactor server call to api library
    // Remove from server
    fetch(process.env.SERVER + '/habits/' + this.props.profile.email + '/' + habitId, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + this.props.token.idToken
      }
    })
    .then(api.handleErrors)
    // Get updated habit list
    .then(function (response) {
      // _this.getHabits();
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
    if (this.state.habit.reminder.set) {
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
              value={this.state.habit.reminder.set}
            />
          </View>
            <DatePickerIOS
              date={new Date()}
              mode="time"
              minuteInterval={5}
              onDateChange={this.onDateChange}
            />
          <TouchableOpacity
            style={styles.button}
            onPress={function () { _this.deleteHabit(_this.state.habit.id) }}>
            <Text style={{color: '#FFFFFF'}}>
              Delete Habit
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.heading}
            defaultValue={this.props.habit.action}
            onChangeText={this.onTextChange}
            onEndEditing={this.onEndTextEdit}
          />
          <View style={{ flexDirection: 'row', marginTop: 60, marginBottom: 216 }}>
            <Text style={{fontSize: 22}}>
              Reminder
            </Text>
            <Switch
              onValueChange={this.onReminderChange}
              style={{left: 190, marginBottom: 30}}
              value={this.state.habit.reminder.set}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={function () { _this.deleteHabit(_this.state.habit.id) }}>
            <Text style={{color: '#FFFFFF'}}>
              Delete Habit
            </Text>
          </TouchableOpacity>
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
  button: {
    height: 30,
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 0,
    borderRadius: 5,
    padding: 5,
    margin: 20,
    marginTop: 40,
    backgroundColor: '#FF0000',
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    shadowRadius: 3,
    shadowOffset: {
      height: 3.5,
      width: 2
    }
  },
});
module.exports = HabitSettings;
