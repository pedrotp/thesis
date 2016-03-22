var React = require('react-native');
var View = React.View;
var Text = React.Text;
var StyleSheet = React.StyleSheet
var Navigator = React.Navigator;
var Alert = React.Alert;
var TouchableOpacity = React.TouchableOpacity;
var DatePickerIOS = React.DatePickerIOS;


var HabitSettings = React.createClass({
  getInitialState: function () {
    return ({
      date: new Date(),
      // timeZoneOffsetInHours: (-1 * (new Date()).getTimezoneOffset()/ 60)
      
      })
  },
  onDateChange: function (date) {
    this.setState({date: date})
  },
  deleteHabit: function () {
    //fetch request to delete habit
  },
  componentDidMount: function () {
    
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
            } />
        </View>
      );
  },
  renderScene: function (route, navigator) {
    return (
      <View>
        <Text>Habit Settings</Text>

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
    // var currentRoute = routeStack[routeStack.length - 1];

    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
            Habit Settings
        </Text>
      </TouchableOpacity>
    );
  }
};

var label = function (props) {
  return (
    <View>
      <Text>
        {this.props.title}
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
  radio: {
    width: 325,
    marginTop: 18,
    marginBottom: 15,
    alignSelf: 'center'
  },
  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF'
  },
  textInput: {
    height: 35,
    width: 250,
    padding: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#6399DC',
    color: '#6399DC',
    borderWidth: 0,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center'
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
