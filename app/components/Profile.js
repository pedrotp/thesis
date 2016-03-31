var React = require('react-native');
var ProgressBar = require('react-native-progress-bar');
var Button = require('react-native-button');
var api = require('../lib/api')
var View = React.View;
var Text = React.Text;
var Image = React.Image;
var ListView = React.ListView;
var Navigator = React.Navigator;
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
      user: this.props.user,
      currentStreakCount: null,
      currentStreakHabit: null,
      nextGoalCount: null,
      nextGoalName: null,
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
    var nonStreakBadges = {
      'First Step': true,
      'Better Already': true,
      'Top of the World': true
    };

    badges.forEach(function (badge) {
      var badgeTitle = Object.keys(badge)[0];
      badgeURIs.push({ name: badgeTitle, uri: badge[badgeTitle] });
      if (!nonStreakBadges.hasOwnProperty(badgeTitle)) {
        earned++;
      }
    });

    var current = this.calculateProgress(earned, habits);

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(badgeURIs),
      user: user,
      currentStreakCount: current.progress.count,
      currentStreakHabit: current.progress.habit,
      nextGoalCount: current.goal,
      nextGoalName: current.goalName,
      progress: current.progress.count/current.goal,
      habits: newData.habits,
      badgeURIs: badgeURIs,
    });
  },
  calculateProgress: function (earnedStreaks, userHabits) {
    var goal;
    var goalName;

    // Reduces array of userHabits to the longest current streak
    var progress = userHabits.reduce(function (acc, cur) {
      if (cur.streak.current > acc.count) {
        acc.count = cur.streak.current;
        acc.habit = cur.action;
      }
      return acc;
    }, {count: 0});
    if (earnedStreaks === 3) {
      goal = 20;
      goalName = 'Soaring';
    } else if (earnedStreaks === 2) {
      goal = 15;
      goalName = 'On Point';
    } else if (earnedStreaks === 1) {
      goal = 10;
      goalName = 'On a Roll';
    } else if (earnedStreaks === 0) {
      goal = 5;
      goalName = 'Gone Streaking';
    }
    return {
      progress: progress,
      goal: goal,
      goalName: goalName,
    };
  },
  goToBadges: function () {
    this.props.navigator.push({
      id: 'Badges',
      earnedBadges: this.state.user.badges
    });
  },
  renderRow: function (badges) {
    return (
      <View>
        <TouchableOpacity>
          <Image
            source={{uri: badges.uri}}
            style={styles.badges}
            />
        </TouchableOpacity>
        <Text style={styles.badgeTitle}>
          {badges.name}
        </Text>
      </View>
    );
  },
  render: function () {
    return (
      <Navigator
        renderScene={this.renderScene}
        navigator={this.props.navigator}
        navigationBar={
          <Navigator.NavigationBar style={{backgroundColor: '#6399DC', alignItems: 'center'}}
            routeMapper={NavigationBarRouteMapper}
          />
        }
      />
    );
  },
  renderScene: function () {
    return (
      <View>
        <View style={styles.avatar}>
          <Image
            style={styles.avatarPhoto}
            source={{uri: this.state.photo}}
          />
          <Text style={styles.userName}>
            {this.state.userName}
          </Text>
        </View>
        <View style={styles.recentContainer}>
          <Text style={styles.recentBadgesHeader}>
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
        <View style={styles.streaks}>
          <Text style={styles.progressHeader}>
            {this.state.currentStreakHabit || 'Don\'t forget your habits!'}
          </Text>
          <Text style={{fontFamily: 'Avenir'}}>
            Current streak: {this.state.currentStreakCount}
          </Text>
          <ProgressBar
            fillStyle={styles.progressFill}
            backgroundStyle={styles.progress}
            style={{marginVertical: 10, width: 300, height: 15}}
            progress={this.state.progress}
          />
        <Text style={{fontFamily: 'Avenir'}}>
          <Text style={{fontWeight: 'bold'}}>{this.state.nextGoalName} </Text>
          <Text>badge in {this.state.nextGoalCount - this.state.currentStreakCount} more completions</Text>
        </Text>
        </View>
        <View>
          <Button
            containerStyle={styles.badgeViewContainer}
            style={styles.badgeViewText}
            onPress={this.goToBadges}
          >
            View All Badges
          </Button>
          <Button
            containerStyle={styles.logoutContainer}
            style={styles.logoutText}
            onPress={this.props.handleLogout}
          >
            Logout
          </Button>
        </View>
      </View>
    );
  }
});

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return null;
  },

  RightButton(route, navigator, index, navState) {
    return null;
  },

  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 18}}>
          Profile
        </Text>
      </TouchableOpacity>
    );
  }
};

var styles = StyleSheet.create({
  avatar: {
    top: 65,
    paddingTop: 25,
    paddingBottom: 15,
    marginBottom: 20,
    backgroundColor: '#eee',
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
  recentContainer: {
    marginBottom: 15,
  },
  recentBadgesHeader: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Avenir',
    marginTop: 65,
    marginBottom: 10,
  },
  recentBadges: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 90,
  },
  progressHeader: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Avenir',
    marginBottom: 5,
  },
  userName: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
  progressFill: {
    backgroundColor: '#6399DC',
    height: 15
  },
  progress: {
    backgroundColor: '#aaa',
    borderRadius: 7,
  },
  badges: {
    height: 70,
    width: 70,
    marginHorizontal: 14,
  },
  streaks: {
    marginBottom: 8,
    alignItems: 'center'
  },
  badgeViewContainer: {
    alignSelf: 'center',
    height: 35,
    width: 275,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#6399DC',
    marginTop: 15,
  },
  badgeViewText: {
    fontSize: 14,
    fontFamily: 'Avenir',
    color: '#fff',
  },
  badgeTitle: {
    fontSize: 12,
    fontFamily: 'Avenir',
    alignSelf: 'center',
  },
  logoutContainer: {
    alignSelf: 'center',
    height: 35,
    width: 275,
    padding: 10,
    overflow: 'hidden',
    marginTop: 12,
  },
  logoutText: {
    fontSize: 14,
    fontFamily: 'Avenir',
    color: '#e14f3f',
  },
});

module.exports = Profile;
