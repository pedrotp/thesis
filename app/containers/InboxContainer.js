var React = require('react-native');
var api = require('../lib/api');
var Auth0credentials = require('../../auth0_credentials');
var View = React.View;
var Text = React.Text;
var Alert = React.Alert;
var ListView = React.ListView;
var Navigator = React.Navigator;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;
var Linking = React.Linking;
var moment = require('moment');

var Inbox = require('../components/Inbox');
var Welcome = require('../components/Welcome');

var RefreshableListView = require('react-native-refreshable-listview')

// var lock = require('..');

var Habits = React.createClass({
  getInitialState: function () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: function (row1, row2) {
          return row1 !== row2
        }
      })
    }
  },
  // TODO: refactor server call to api library
  getHabits: function () {
    var _this = this;
    fetch(process.env.SERVER + '/habits/' + this.props.profile.email, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.token.idToken
      }
    })
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
  editHabit: function (habit) {
    var _this = this;
    this.props.navigator.push({
      id: 'HabitSettings',
      habit: habit
    });
  },
  toggleInstance: function (habitId) {
    var _this = this;
    // TODO: refactor server call to api library
    // Ask server to create a new instance of this habit
    fetch(process.env.SERVER + '/habits/' + this.props.profile.email + '/' + habitId, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.props.token.idToken
      }
    })
    .then(api.handleErrors)
    .then(function (response) {
      return response.json();
    })
    .then(function (resJSON) {
      // if (!resJSON.empty && moment(new Date(resJSON.createdAt)).isSame(Date.now(), 'day')) {
      //   Alert.alert('You Did It', 'Great Job!');
      // }
      _this.getHabits();
    })
    .catch(function (err) {
      console.warn(err);
    });
  },
  gotoDetails: function (habit) {
    // TODO: navigate to correct details per habit rather than mock data
    this.props.navigator.push({
      id: 'HabitDetails',
      habit: habit
    });
  },
  componentDidMount: function () {
    this.getHabits();
  },
  handlePress: function () {
    this.props.navigator.push({id:'AddHabit'});
  },
  // Render each row of the inbox as an Inbox component
  renderInboxRow: function (habit) {
    return <Inbox habit={habit} deleteHabit={this.deleteHabit} gotoDetails={this.gotoDetails} editHabit={this.editHabit} toggleInstance={this.toggleInstance}/>
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
  // handleLogout triggers re-render of AppContainer by calling setState
  renderScene: function (route, navigator) {
    return (
      <View style={styles.container}>
        <RefreshableListView
          dataSource={this.state.dataSource}
          renderRow={this.renderInboxRow}
          loadData={this.getHabits}
          refreshDescription="Refreshing your habits"
        />
        <TouchableOpacity style={styles.circleButton} onPress={this.handlePress}>
            <Text style={styles.buttonText}>New</Text>
        </TouchableOpacity>
        {/*<TouchableOpacity onPress={this.props.handleLogout}>
          <View style={styles.circleButton}>
            <Text style={styles.buttonText}>LO</Text>
          </View>
        </TouchableOpacity>*/}
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
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  circleButton: {
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
