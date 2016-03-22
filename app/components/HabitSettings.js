var React = require('react-native');
var View = React.View;
var Text = React.Text;
var Navigator = React.Navigator;
var Alert = React.Alert;
var TouchableOpacity = React.TouchableOpacity;
var DatePickerIOS = React.DatePickerIOS;

var HabitSettings = React.createClass({
  getInitialState: function () {
    return ({
      date: new Date(),
      timeZoneOffsetInHours: (-1 * (new Date()).getTimezoneOffset()/ 60)
      })
  },
  onDateChange: function () {
    this.setState({date: date})
  },
  deleteHabit: function () {
    //fetch request to delete habit
  }
  componentDidMount: function () {
    
  }
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
        <Text>{}</Text>
      </View>
      <DatePickerIOS 
        mode="time"
        minuteInterval={10}
        onDateChange={this.onDateChange}
      />
      <TouchableOpacity onPress={props.onClick} style={styles.button}>
          <Text style={{color: '#FFFFFF'}}>
            Delete
          </Text>
      </TouchableOpacity>
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
  return ({
    <View>
      <Text>
        {this.props.title}
      </Text>
    </View>
    )
  }
}

module.exports = HabitSettings;
