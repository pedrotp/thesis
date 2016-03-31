var React = require('react-native');
var View = React.View;
var Text = React.Text;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;
var Navigator = React.Navigator;
var api = require('../lib/api');

var Profile = require('../components/Profile');
var BadgeView = require('../components/BadgeView');

var ProfileContainer = React.createClass({
  configureScene: function (route, routeStack) {
    return Navigator.SceneConfigs.FadeAndroid;
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
    if (routeId === 'Profile') {
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
    if (routeId == 'Badges') {
      return (
        <BadgeView
          navigator={navigator}
          earnedBadges={route.earnedBadges}
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
