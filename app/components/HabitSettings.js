// Temporary fix for suppressing warnings from DatePickerIOS which
// has an unresolved issue regarding the date being passed to it
// https://github.com/facebook/react-native/issues/4547
console.ignoredYellowBox = [
  'Warning: Failed propType',
];

var React = require('react-native');
var View = React.View;
var Text = React.Text;
var TextInput = React.TextInput;
var StyleSheet = React.StyleSheet;
var Navigator = React.Navigator;
var TouchableOpacity = React.TouchableOpacity;
var DatePickerIOS = React.DatePickerIOS;
var Switch = React.Switch;

var HabitSettings = React.createClass({
  getInitialState: function () {
    return {
      date: new Date(),
      reminder: false,
    };
  },

  onDateChange: function (date) {
    this.setState({date: date})
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
    if (this.state.reminder) {
      return (
        <View style={styles.container}>
          <Text style={styles.heading}>
            {this.props.habit.action}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 60 }}>
            <Text style={{fontSize: 22}}>Reminder</Text>
            <Switch
              onValueChange={function (date) { _this.setState({reminder: date}); }}
              style={{left: 190, marginBottom: 30}}
              value={this.state.reminder}
            />
          </View>
            <DatePickerIOS
              date={this.state.date}
              mode="time"
              minuteInterval={5}
              onDateChange={this.onDateChange}
            />
          <TouchableOpacity style={styles.button} onPress={function () {_this.props.deleteHabit(_this.props.habit._id)}}>
            <Text style={{color: '#FFFFFF'}}>
              Delete Habit
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.heading}>
            {this.props.habit.action}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 60, marginBottom: 216 }}>
            <Text style={{fontSize: 22}}>Reminder</Text>
            <Switch
              onValueChange={function (date) { _this.setState({reminder: date}); }}
              style={{left: 190, marginBottom: 30}}
              value={this.state.reminder}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={function () {_this.props.deleteHabit(_this.props.habit._id)}}>
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
  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={function () {navigator.parentNavigator.pop()}}>
        <Text style={{color: 'white', margin: 10}}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton(route, navigator, index, navState) {
    return null;
  },

  Title(route, navigator, index, navState) {
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
    top: 100,
  },
  heading: {
    fontSize: 34,
    alignSelf: 'center',
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
