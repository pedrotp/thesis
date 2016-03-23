var React = require('react-native');
var Create = require('../components/Create.js');
var api = require('../lib/api.js');
var View = React.View;
var Text = React.Text;
var Alert = React.Alert;
var Navigator = React.Navigator;
var TouchableOpacity = React.TouchableOpacity;

var Create = require('../components/Create').Create;

var AddHabit = React.createClass({
  getInitialState: function () {

    // Check if a habit is being sent to this view
    var editHabit = this.props.habit;
    var fields = {
      action: null,
      frequency: null
    };

    // If so, fields will be populated with the habit details
    if (editHabit) {
      fields.action = editHabit.action;
      fields.frequency = editHabit.frequency;
    }
    return {
      fields: fields
    }
  },

  // If a habit is being sent, sendHabbit needs to be changed
  determineMethod: function () {
    var result = {};
    if (this.props.habit) {
      result.method = 'PUT';
      result.id = this.props.habit._id;
    } else {
      result.method = 'POST';
      result.id = '';
    }
    return result;
  },
  sendHabit: function (reqbody) {

    // Store reference to 'this' to be used in the
    // success alert to bring user to inbox view
    var _this = this;

    // Determines which HTTP request to send
    var options = this.determineMethod();

    // Determines which alert message
    // to log in success alert
    var alertmsg = options.method === 'PUT' ?
    'Habit updated!' :
    'Habit created!';

    fetch(process.env.SERVER + '/habits/' + this.props.profile.email + '/' + options.id, {
      method: options.method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.token.idToken
      },
      body: JSON.stringify(reqbody)
    })
    .then(api.handleErrors)
    .then(function (response) {
      return response.json();
    })
    .then(function (responseJSON) {
      console.log('Habit success:', responseJSON);
      Alert.alert(
        alertmsg,
        null,
        [
          {
            text: 'Ok',
            onPress: function () {

              // brings user to inbox view
              _this.goToNext();
            }
          }
        ]
      );
    })
    .catch(function (err) {
      console.warn(err);
    });
  },
  goToNext: function () {
    this.props.navigator.push({
      id: 'Habits'
    });
  },

  handleClick: function () {

    // Values stored to be sent to server
    var action = this.state.fields.action;
    var frequency = this.state.fields.frequency;

    // Clears fields upon submit
    this.setState({
      fields: {
        action: "",
        frequency: "",
      },
    });

    this.sendHabit({
      action: action,
      frequency: frequency,
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
                routeMapper={NavigationBarRouteMapper} />
          } />
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

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    var routeStack = navigator.parentNavigator.state.routeStack;
    var previousRoute = routeStack[routeStack.length - 2];

    if(previousRoute.id === 'Habits') {
      return (
        <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
            onPress={function () {navigator.parentNavigator.pop()}}>
          <Text style={{color: 'white', margin: 10}}>
            Back
          </Text>
        </TouchableOpacity>
        )
    } else {
      return null;
    }
  },

  RightButton(route, navigator, index, navState) {
    return null;
  },

  Title(route, navigator, index, navState) {
    var title;
    var routeStack = navigator.parentNavigator.state.routeStack;
    var currentRoute = routeStack[routeStack.length - 1];

    if(currentRoute.habit) {
      title = 'Edit Habit';
    } else {
      title = 'Create Habit';
    }
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
          { title }
        </Text>
      </TouchableOpacity>
    );
  }
};

module.exports = AddHabit;
