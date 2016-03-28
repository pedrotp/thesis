var React = require('react-native');
var ProgressBar = require('react-native-progress-bar');
var View = React.View;
var Text = React.Text;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;

var Profile = React.createClass({
  getInitialState: function () {
    return {
      progress: 0.75
    }
  },
  componentDidMount: function() {

    // Progress bar doesn't appear filled unless it's changed
    // so upon component mount, add and subtract trivial amount
    this.setState({ progress: this.state.progress + 0.00001 });
    this.setState({ progress: this.state.progress - 0.00001 });
  },
  render: function () {
    // setTimeout((function () {
    //   this.setState({ progress: this.state.progress + 0.05 });
    // }).bind(this), 1000);

    return (
      <View>
        <Text>Here is some profile text</Text>
        <ProgressBar
          fillStyle={{}}
          backgroundStyle={{backgroundColor: '#aaa', borderRadius: 2}}
          style={{marginTop: 10, width: 300}}
          progress={this.state.progress}
        />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  fill: {
    color: '#000000',
    backgroundColor: '#000000'
  }
});

module.exports = Profile;
