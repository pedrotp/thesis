var React = require('react-native');
var View = React.View;
var Text = React.Text;
var TextInput = React.TextInput;
var StyleSheet = React.StyleSheet;
var Navigator = React.Navigator;
var Alert = React.Alert;
var TouchableOpacity = React.TouchableOpacity;
var DatePickerIOS = React.DatePickerIOS;
var Switch = React.Switch;

var HabitSettings = React.createClass({
  // text should be this.props.habit.habitName, habit object containing all habit details
  // passed when navigated from inbox to habitSettings
  getInitialState: function () {
    return ({
      date: new Date(),
      // timeZoneOffsetInHours: (-1 * (new Date()).getTimezoneOffset()/ 60)
      FalseSwitchIsOn: false,
      editMode: false,
      text: this.props.habitName
    })
  },
  componentDidMount: function () {
    //this.props.habitId
    //fetch habit details with habitId and set state 
  },
  onDateChange: function (date) {
    this.setState({date: date})
  },
  deleteHabit: function () {
    //fetch request to delete habit
  },
  onPress: function () {
    if(this.state.editMode) {
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
    if(this.state.editMode) {
      return (
        <View style={styles.container}>
          <TextInput />
          <Label style={styles.label} title="Reminder:"/>
          <Switch style={styles.label}
            onValueChange={function (value) { _this.setState({falseSwitchIsOn: value}); }}
            style={{marginBottom: 10}}
            value={this.state.falseSwitchIsOn}
          />
          <DatePickerIOS
            date={this.state.date}
            mode="time"
            minuteInterval={30}
            // timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
            onDateChange={this.onDateChange}
          />
          <TouchableOpacity style={styles.button}>
              <Text style={{color: '#FFFFFF'}}>
                Delete
              </Text>
          </TouchableOpacity>
        </View>
      )
    }
    // normal mode
    return (
      <View style={styles.container}>
        <Text style={styles.heading} onPress={this.onPress}>{ this.props.habitName }</Text>
        <Label title="Reminder:"/>
        <Switch
          onValueChange={function (value) { _this.setState({falseSwitchIsOn: value}); }}
          style={{marginBottom: 10}}
          value={this.state.falseSwitchIsOn}
        />
        <DatePickerIOS
          date={this.state.date}
          mode="time"
          minuteInterval={30}
          // timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
        />
        <TouchableOpacity style={styles.button}>
            <Text style={{color: '#FFFFFF'}}>
              Delete
            </Text>
        </TouchableOpacity>
      </View>
      )
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
        )
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
  )
};

var styles = StyleSheet.create({
  container: {
    flex: 0.90,
    justifyContent: 'center',
    backgroundColor: '#EDBE40'
  },
  heading: {
    fontSize: 40
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
