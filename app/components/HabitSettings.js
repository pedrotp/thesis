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
  // text should be this.props.habit.habitName, habit object containing all habit details is
  // passed when navigated from inbox to habitSettings
  getInitialState: function () {
    return {
      date: new Date(),
      text: this.props.habitName,
      reminder: false,
      editMode: false
    };
  },
  componentDidMount: function () {
    //Uses this.props.habitId to fetch
    //habit details and set state
  },

  onDateChange: function (date) {
    this.setState({date: date})
  },

  deleteHabit: function () {
    //fetch request to delete habit
  },

  onPress: function () {
    if (this.state.editMode) {
      this.setState({editMode: false});
    } else {
      this.setState({editMode: true});
    }
  },

  render: function () {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          renderScene={this.renderScene}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#6399DC', alignItems: 'center'}}
              routeMapper={NavigationBarRouteMapper} />
          }
        />
      </View>
    );
  },

  renderScene: function (route, navigator) {
    var _this = this;

    // edit mode, habit name become editable
    // textInput does not render anything at the moment - not sure why
    // if (this.state.editMode) {
    //   return (
    //     <View style={styles.container}>
    //       <TextInput
    //         style={{height: 40, borderColor: 'gray', borderWidth: 1}}
    //         onEndEditing={function (text) { _this.setState({ text: text }); console.log('yolo:', _this.state); }}
    //         defaultValue = {this.props.habitName}
    //       />
    //     <Text style={styles.label}>Reminder</Text>
    //       <Switch style={styles.label}
    //         onValueChange={function (value) { _this.setState({falseSwitchIsOn: value}); }}
    //         style={{marginBottom: 10, alignSelf: 'flex-end'}}
    //         value={this.state.falseSwitchIsOn}
    //       />
    //       <DatePickerIOS
    //         date={this.state.date}
    //         mode="time"
    //         minuteInterval={5}
    //         onDateChange={this.onDateChange}
    //       />
    //       <TouchableOpacity style={styles.button}>
    //           <Text style={{color: '#FFFFFF'}}>
    //             Delete
    //           </Text>
    //       </TouchableOpacity>
    //     </View>
    //   )
    // }

    if (this.state.reminder) {
      return (
        <View style={styles.container}>
          <Text style={styles.heading}>
            {this.props.habitName}
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
          <TouchableOpacity style={styles.button}>
            <Text style={{color: '#FFFFFF'}}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.heading}>
            {this.props.habitName}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 60, marginBottom: 216 }}>
            <Text style={{fontSize: 22}}>Reminder</Text>
            <Switch
              onValueChange={function (date) { _this.setState({reminder: date}); }}
              style={{left: 190, marginBottom: 30}}
              value={this.state.reminder}
              />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={{color: '#FFFFFF'}}>
              Delete
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
    // var title;
    // var routeStack = navigator.parentNavigator.state.routeStack;
    // var previousRoute = routeStack[routeStack.length - 2];

    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
            Habit Settings
        </Text>
      </TouchableOpacity>
    );
  }
};

var Label = function (props) {
  return (
    <View>
      <Text>
        {props.title}
      </Text>
    </View>
  );
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
    width: 80,
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 0,
    borderRadius: 5,
    padding: 5,
    margin: 20,
    marginTop: 40,
    backgroundColor: '#6399DC',
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    shadowRadius: 3,
    shadowOffset: {
      height: 3.5,
      width: 2
    }
  }
});
module.exports = HabitSettings;
