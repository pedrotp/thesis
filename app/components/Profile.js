var React = require('react-native');
var View = React.View;
var Text = React.Text;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;

var Profile = React.createClass({
  render: function () {
    return (
      <View>
        <Text>Here is some profile text</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
});

module.exports = Profile;
