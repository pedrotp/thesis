var React = require('react-native');
var ProgressBar = require('react-native-progress-bar');
var Button = require('react-native-button');
var View = React.View;
var Text = React.Text;
var Image = React.Image;
var ListView = React.ListView;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;
var api = require('../lib/api')

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
      user: this.props.user,
      currentStreak: null,
      currentGoal: null,
      progress: null,
      habits: null,
      badgeURIs: [],
    }
  },
  componentDidMount: function () {
    this.refreshUserData();
  },
  componentWillReceiveProps: function () {
    this.refreshUserData();
  },
  refreshUserData: function () {
    fetch(process.env.SERVER + '/user/' + this.props.user.email, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.token.idToken
      }
    })
    .then(api.handleErrors)
    .then(function (response) {
      return response.json();
    })
    .then(this.parseUserData)
    .catch(function (err) {
      console.warn(err);
    });
  },
  parseUserData: function (newData) {
    var user = newData.user;
    var habits = newData.habits;
    var badges = user.badges;
    var badgeURIs = [];
    var earned = 0;
    var streaks = {
      'fiveStreak': 5,
      'tenStreak': 10,
      'fifteenStreak': 15,
    };

    badges.forEach(function (badge) {
      var badgeTitle = Object.keys(badge)[0];
      badgeURIs.push(badge[badgeTitle]);
      if (badgeTitle in streaks) {
        earned++;
      }
    });

    var current = this.calculateProgress(earned, habits);

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(badgeURIs),
      user: user,
      currentStreak: current.progress,
      currentGoal: current.goal,
      progress: current.progress/current.goal,
      habits: newData.habits,
      badgeURIs: badgeURIs,
    });
  },
  calculateProgress: function (earnedStreaks, userHabits) {

    // Reduces array of userHabits to the longest current streak
    var progress = userHabits.reduce(function (acc, cur) {
      if (cur.streak.current > acc) {
        acc = cur.streak.current;
      }
      return acc;
    }, 0);
    var goal;
    if (earnedStreaks === 3) {
      goal = 20;
    } else if (earnedStreaks === 2) {
      goal = 15;
    } else if (earnedStreaks === 1) {
      goal = 10;
    } else if (earnedStreaks === 0) {
      goal = 5;
    }
    return {
      progress: progress,
      goal: goal
    };
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
            renderRow={this.renderRow}
            scrollEnabled={false}
            automaticallyAdjustContentInsets={false}
            contentContainerStyle={styles.recentBadges}
          />
        </View>
        <View>
          <Text style={styles.header}>
            Next badge in {this.state.currentGoal - this.state.currentStreak} consecutive completions
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
            Best Current Streak: {this.state.currentStreak}
          </Text>
        </View>
        <Button onPress={function () { this.props.navigator.push({id: 'Badges'})}.bind(this)}>
          Go to Badges
        </Button>
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
    width: 100,
    height: 100,
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
