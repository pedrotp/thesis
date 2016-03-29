var React = require('react-native');
var ProgressBar = require('react-native-progress-bar');
var Button = require('react-native-button');
var View = React.View;
var Text = React.Text;
var Image = React.Image;
var ListView = React.ListView;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;

var Profile = React.createClass({
  getInitialState: function () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: function (row1, row2) {
          return row1 !== row2
        }
      }),
      userName: this.props.user.userName,
      photo: this.props.profile.picture,
      progress: 0,
      badgeURIs: []
    }
  },
  componentDidMount: function () {
    // Progress bar doesn't appear filled unless it's changed
    // so upon component mount, add and subtract trivial amount
    console.log("Badges:", this.props.user.badges);
    var badgeURIs = this.props.user.badges.map(function (badge) {
      return badge[Object.keys(badge)[0]];
    })
    console.log("Badge URIs:", badgeURIs);
    this.setState({
      progress: this.state.progress + this.props.progress,
      badgeURIs: badgeURIs,
      dataSource: this.state.dataSource.cloneWithRows(badgeURIs)
    });
  },
  renderRow: function (badgeURI) {
    return (
      <TouchableOpacity>
        <Image
          source={{uri: badgeURI}}
          style={styles.badges}
        />
      </TouchableOpacity>
    );
  },
  render: function () {
    return (
      <View>
        <View style={styles.avatar}>
          <TouchableOpacity>
            <Image
              style={styles.avatarPhoto}
              source={{uri: this.state.photo}}
            />
          </TouchableOpacity>
          <Text style={styles.header}>
            {this.state.userName}
          </Text>
        </View>
        <View style={styles.recent}>
          <Text style={styles.header}>
            Recently Earned Badges
          </Text>
          <ListView
            dataSource={this.state.dataSource}
            // initialListSize={4}
            // pageSize={4}
            renderRow={this.renderRow}
            scrollEnabled={false}
            automaticallyAdjustContentInsets={false}
            contentContainerStyle={styles.recentBadges}
          />
        </View>
        <View>
          <Text style={styles.header}>
            1 more completion for (insert awesome badge)
          </Text>
          <ProgressBar
            fillStyle={styles.progressFill}
            backgroundStyle={styles.progress}
            style={{marginTop: 10, width: 300, height: 10}}
            progress={this.state.progress}
          />
        </View>
        <View style={styles.streaks}>
          <Text>
            Current Streak: 3
          </Text>
          <Text>
            Perfect day streak: 2
          </Text>
        </View>
        <Button
          containerStyle={styles.logoutContainer}
          style={styles.logoutText}
          onPress={this.props.handleLogout}
        >
          Logout
        </Button>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  avatar: {
    marginBottom: 45,
  },
  avatarPhoto: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: '#EEE',
    borderRadius: 20,
    borderColor: '#FFF',
    borderWidth: 1,
    marginBottom: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 16
  },
  progressFill: {
    backgroundColor: '#6399DC',
    height: 10
  },
  progress: {
    backgroundColor: '#aaa',
    borderRadius: 7,
    alignSelf: 'center'
  },
  recent: {
    marginBottom: 30,
  },
  badges: {
    height: 75,
    width: 75,
    marginHorizontal: 7
  },
  recentBadges: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 90
  },
  streaks: {
    marginVertical: 40,
  },
  logoutContainer: {
    height: 35,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#6399DC',
    marginTop: 60
  },
  logoutText: {
    fontSize: 14,
    color: '#fff'
  }
});

module.exports = Profile;
