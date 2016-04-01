// React Native components
var React = require('react-native');
var View = React.View;
var Text = React.Text;
var Alert = React.Alert;
var Linking = React.Linking;
var ListView = React.ListView;
var Navigator = React.Navigator;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;
var Linking = React.Linking;
var Image = React.Image;
var Dimensions = React.Dimensions;

// external libraries and components
var moment = require('moment');
var api = require('../lib/api');
var Auth0credentials = require('../../auth0_credentials');
var Icon = require('react-native-vector-icons/FontAwesome');
var moment = require('moment');
var Icon = require('react-native-vector-icons/FontAwesome');

// custom compoments and methods
var Notification = require('../components/Notification');
var Inbox = require('../components/Inbox');
var Welcome = require('../components/Welcome');

var Habits = React.createClass({
  getInitialState: function () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: function (row1, row2) {
          return row1 !== row2
        },
      }),
      scrollEnabled: true,
      alert: false,
      badge: {},
    }
  },

  // TODO: refactor server call to api library
  getHabits: function () {
    fetch(process.env.SERVER + '/habits/' + this.props.profile.email, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.token.idToken
      },
    })
    .then(api.handleErrors)
    .then(function (response) {
      return response.json();
    })
    .then((function (responseData) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData)
      });
    }).bind(this))
    .catch(function (err) {
      console.warn(err);
    });
  },

  editHabit: function (habit) {
    this.props.navigator.push({
      id: 'HabitSettings',
      habit: habit,
    });
  },

  showAlert: function (badge) {
    setTimeout((function () {
      this.setState({
        alert: true,
        badge: badge,
      });
    }).bind(this), 500);
    setTimeout((function () {
      this.setState({
        alert: false,
      });
    }).bind(this), 3200);
  },

  toggleInstance: function (habitId) {
    // TODO: refactor server call to api library
    // Ask server to create a new instance of this habit
    fetch(process.env.SERVER + '/habits/' + this.props.profile.email + '/' + habitId, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.props.token.idToken
      },
    })
    .then(api.handleErrors)
    .then(function (response) {
      return response.json();
    })
    .then((function (res) {
      if (res.badges && res.badges.length) {
        this.showAlert(res.badges[0]);
      }
      this.getHabits();
    }).bind(this))
    .catch(function (err) {
      console.warn(err);
    });
  },

  gotoDetails: function (habit) {
    this.props.navigator.push({
      id: 'HabitDetails',
      habit: habit,
    });
  },

  componentDidMount: function () {
    if (this.props.route.badge) {
      this.showAlert(this.props.route.badge);
    }
    this.getHabits();
  },

  handlePress: function () {
    this.props.navigator.push({ id:'AddHabit' });
  },

  allowScroll: function(scrollEnabled) {
    if (scrollEnabled !== this.state.scrollEnabled) {
      this.setState({ scrollEnabled: scrollEnabled });
    }
  },

  // Render each row of the inbox as an Inbox component
  renderInboxRow: function (habit) {
    return <Inbox
      habit={habit}
      deleteHabit={this.deleteHabit}
      gotoDetails={this.gotoDetails}
      editHabit={this.editHabit}
      toggleInstance={this.toggleInstance}
      allowScroll={this.allowScroll}
    />
  },

  render: function () {
    return (
      <View style={{flex: 1}}>
        <Navigator
          renderScene={this.renderScene}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar
              style={{backgroundColor: '#6399DC', alignItems: 'center'}}
              routeMapper={NavigationBarRouteMapper}
            />
          }
        />
      </View>
    );
  },

  renderScene: function (route, navigator) {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderInboxRow}
          automaticallyAdjustContentInsets={false}
          scrollEnabled={this.state.scrollEnabled}
        />
        <Notification
          visible={this.state.alert}
          name={this.state.badge ? this.state.badge.name : null}
          icon={this.state.badge ? this.state.badge.icon : null}
        >
        </Notification>
        <TouchableOpacity style={styles.circleButton} onPress={this.handlePress}>
          <Icon name='plus' size={25} color='#ffffff' />
        </TouchableOpacity>
      </View>
    );
  }
});

var NavigationBarRouteMapper = {
  LeftButton: function (route, navigator, index, navState) {
    return null;
  },

  RightButton: function (route, navigator, index, navState) {
    return null;
  },

  Title: function (route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 18}}>
          Inbox
        </Text>
      </TouchableOpacity>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#EDBE40',
  },
  circleButton: {
    position: 'absolute',
    top: 480,
    right: 20,
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6399DC',
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowOffset: {
      height: 4,
      width: 3,
    },
  },
});

module.exports = Habits;
