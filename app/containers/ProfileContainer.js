var React = require('react-native');
var View = React.View;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;
var api = require('../lib/api');
var Navigator = React.Navigator;

var Profile = require('../components/Profile');
var Badges = require('../components/Badges');

var ProfileContainer = React.createClass({
  getInitialState: function () {
    return {
      progress: 0.75,
    };
  },
  
  configureScene: function (route, routeStack) {
    return Navigator.SceneConfigs.VerticalUpSwipeJump;
  },
  
  render: function () {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          configureScene={this.configureScene}
          initialRoute = {{id: 'Profile'}}
          renderScene = {this.renderScene}
        />
      </View>
    );
  },
  
  renderScene: function (route, navigator) {
    var routeId = route.id;
    if(routeId === 'Profile') {
      return (
        <Profile
          navigator={navigator}
          handleLogout={this.props.handleLogout}
          profile={this.props.profile}
          user={this.props.user}
          token={this.props.token}
          badgeURIs={this.props.badgeURIs}
        />
      );
    }
    if(routeId == 'Badges') {
      return (
        <Badges 
          navigator={navigator}
          // badgeURIs={route.badgesURI}
        />
      );
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 54,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
});

module.exports = ProfileContainer;
