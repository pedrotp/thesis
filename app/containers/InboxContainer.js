// logic call for the inbox
var React = require('react-native');
var Inbox = require('../components/Inbox.js');
var Text = React.Text;
var Navigator = React.Navigator;
var TouchableOpacity = React.TouchableOpacity;


var Habits = React.createClass({
  
  getInitialState: function () {
    return {
      habits: []
    }
  },
  
  getHabits: function () {
    var _this = this;
    fetch('http://localhost:3000/habits', {
      method: 'GET',
    })
    .then(function (response) {
      return response.json()
    })
    .then(function (responseJSON) {
      // console.log('TEXT:', responseJSON);
      _this.setState({habits: responseJSON});
    })
    .catch(function (error) {
      console.warn(error);
    });
  },
  
  componentWillMount: function () {
    this.getHabits();
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
  
  renderScene: function () {
    return <Inbox
      habits={this.state.habits}
    />
  }
  
});

var NavigationBarRouteMapper = {
  
  LeftButton: function (route, navigator, index, navState) {
    return (
      <TouchableOpacity onPress={function () {navigator.parentNavigator.pop();} } style={{flex: 1, justifyContent: 'center'}}>
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
          My Habits
        </Text>
      </TouchableOpacity>
    );
  }
  
};

module.exports = Habits;
