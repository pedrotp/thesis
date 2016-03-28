var React = require('react-native');
var View = React.View;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;

var Profile = require('../components/Profile')

var ProfileContainer = React.createClass({
  getInitialState: function () {
    return {
    }
  },
  render: function () {
    console.log(this.props.handleLogout);
    return (
      <View style={styles.container}>
        <Profile handleLogout={this.props.handleLogout} />
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
