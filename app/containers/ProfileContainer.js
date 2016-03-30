var React = require('react-native');
var View = React.View;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;
var api = require('../lib/api');

var Profile = require('../components/Profile')

var ProfileContainer = React.createClass({
  render: function () {
    return (
      <View style={styles.container}>
        <Profile
          handleLogout={this.props.handleLogout}
          profile={this.props.profile}
          user={this.props.user}
          token={this.props.token}
          badgeURIs={this.props.badgeURIs}
        />
      </View>
    );
  },
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
