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
  componentDidMount: function () {

    // Progress bar doesn't appear filled unless it's changed
    // so upon component mount, add and subtract trivial amount
    this.setState({ progress: this.state.progress + 0.00001 });
    this.setState({ progress: this.state.progress - 0.00001 });
  },
  render: function () {
    return (
      <View>
        <TouchableOpacity>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              Add Photo
            </Text>
          </View>
        </TouchableOpacity>
        <ProgressBar
          fillStyle={styles.progressFill}
          backgroundStyle={styles.progress}
          style={{marginTop: 10, width: 300, height: 10}}
          progress={this.state.progress}
        />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  avatar: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 90,
    backgroundColor: '#EEE',
    borderRadius: 100/2,
    borderColor: '#FFF',
    borderWidth: 1
  },
  avatarText: {
    fontSize: 12,
    width: 60,
    textAlign: 'center'
  },
  progressFill: {
    backgroundColor: '#6399DC',
    height: 10
  },
  progress: {
    backgroundColor: '#aaa',
    borderRadius: 4,
    alignSelf: 'center'
  }
});

module.exports = Profile;
