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
    return {
      fields: {
        action: null
      }
    }
  },

  sendHabit: function (reqbody) {
    fetch(process.env.SERVER + '/habits/' + this.props.profile.email, {
      method: 'POST',
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
    .then((function (resJSON) {
      if (resJSON.toast !== undefined && resJSON.toast.length > 0) {
        Alert.alert('Badge Earned', '' + resJSON.toast, [{text: 'Ok', onPress: this.goToInbox}]);
      } else {
        this.goToInbox();
      }
    }).bind(this))
    .catch(function (err) {
      console.warn(err);
    });
  },
  goToInbox: function () {
    this.props.navigator.push({ id: 'Habits' });
  },
  handleClick: function () {
    // Values stored to be sent to server
    var action = this.state.fields.action;

    // Clears input field upon submit
    this.setState({
      fields: {
        action: null
      },
    });

    if (action !== null) {
      this.sendHabit({
        action: action
      });
    } else {
      Alert.alert(
        'Please enter an action',
        null,
        [ { text: 'Ok' } ]
      );
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
              routeMapper={NavigationBarRouteMapper}
            />
          }
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

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    var routeStack = navigator.parentNavigator.state.routeStack;
    var previousRoute = routeStack[routeStack.length - 2];
    if (previousRoute.id === 'Habits') {
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
    if (currentRoute.habit) {
      title = 'Edit Habit';
    } else {
      title = 'New Habit';
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
