var React = require('react-native');
var api = require('../lib/api');
var View = React.View;
var Text = React.Text;
var Alert = React.Alert;
var ListView = React.ListView;
var Navigator = React.Navigator;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;

var Inbox = require('../components/Inbox');
var Welcome = require('../components/Welcome');

var Habits = React.createClass({
  getInitialState: function () {
    var ds = new ListView.DataSource({
      rowHasChanged: function (row1, row2) {
        return row1 !== row2
      }
    })
    return {
      dataSource: ds.cloneWithRows([]),
    }
  },
  // TODO: refactor server call to api library
  getHabits: function () {
    var _this = this;
    fetch('http://localhost:3000/habits', {
      method: 'GET',
    })
    // fetch('http://better-habits.herokuapp.com/habits', {
    //   method: 'GET',
    // })
    .then(api.handleErrors)
    .then(function (response) {
      return response.json();
    })
    .then(function (responseData) {
      _this.setState({
        dataSource: _this.state.dataSource.cloneWithRows(responseData)
      });
    })
    .catch(function (err) {
      console.warn(err);
    });
  },
  deleteHabit: function (habitId) {
    var _this = this;
    // TODO: refactor server call to api library
    // Remove from server
    // fetch('http://better-habits.herokuapp.com/habits/' +habitId, {
    fetch('http://localhost:3000/habits/' +habitId, {
      method: 'DELETE',
    })
    .then(api.handleErrors)
    // Get updated habit list
    .then(function (response) {
      _this.getHabits();
    })
    .catch(function (err) {
      console.warn(err);
    });
  },
  editHabit: function (habit) {
    this.props.navigator.push({
      id: 'AddHabit',
      habit: habit
    });
  },
  createInstance: function (habitId) {
    var _this = this;
    // TODO: refactor server call to api library
    // Ask server to create a new instance of this habit
    // fetch('http://better-habits.herokuapp.com/habits/' + habitId, {
    fetch('http://localhost:3000/habits/' + habitId, {
      method: 'POST',
    })
    .then(api.handleErrors)
    .then(function (response) {
      Alert.alert('You Did It', 'Great Job!');
      _this.getHabits();
    })
    .catch(function (err) {
      console.warn(err);
    });
  },
  // checkIfDone: function (habitId) {
  //   var _this = this;
  //   // TODO: refactor server call to api library
  //   // Ask server whether this habit has been done in the goal frequency
  //   fetch('http://better-habits.herokuapp.com/done/' + habitId, {
  //     method: 'GET',
  //   })
  //   .then(function (response) {
  //     return response.json();
  //   })
  // },
  // Get habits from server on load
  componentWillMount: function () {
    this.getHabits();
  },
  handlePress: function () {
    this.props.navigator.push({id:'AddHabit'});
  },
  // Render each row of the inbox as an Inbox component
  renderInbox: function (habit) {
    return <Inbox habit={habit} deleteHabit={this.deleteHabit} editHabit={this.editHabit} createInstance={this.createInstance} />
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
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderInbox}
        />
        <TouchableOpacity onPress={this.handlePress}>
          <View style={styles.circleButton}>
            <Text style={styles.buttonText}>New</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
});

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return null;
  },

  RightButton(route, navigator, index, navState) {
    return null;
  },

  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
          Inbox
        </Text>
      </TouchableOpacity>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 54,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#f9ebc5',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  circleButton: {
    flex: 1,
    height: 50,
    width: 50,
    borderWidth: 0,
    borderRadius: 25,
    borderColor: '#090f16',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
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

  },
  buttonText: {
    fontSize: 15,
    color: '#FFFFFF',
  }
});

module.exports = Habits;
