var React = require('react-native');
var api = require('../lib/api');
var View = React.View;
var Text = React.Text;
var StyleSheet = React.StyleSheet;
var Navigator = React.Navigator;
var TouchableOpacity = React.TouchableOpacity;
var ListView = React.ListView;
var Image = React.Image;
var ScrollView = React.ScrollView;


var _allBadges = [
  {name:'firstHabit', uri:'https://better-habits.herokuapp.com/assets/Badges/Morning.png', earned: false},
  {name:'firstCompletion', uri:'https://better-habits.herokuapp.com/assets/Badges/Bon_Voyage.png', earned: false},
  {name:'firstPerfectDay', uri:'https://better-habits.herokuapp.com/assets/Badges/Mountain_Top.png', earned: false},
  {name:'fiveStreak', uri:'https://better-habits.herokuapp.com/assets/Badges/Bungee.png', earned: false},
  {name:'tenStreak', uri:'https://better-habits.herokuapp.com/assets/Badges/Archery.png', earned: false},
  {name:'fifteenStreak', uri:'https://better-habits.herokuapp.com/assets/Badges/Hot_Air_Balloon.png', earned: false},
  {name:'twentyStreak', uri:'https://better-habits.herokuapp.com/assets/Badges/Duel.png', earned: false},
  {name:'thirtyStreak', uri:'https://better-habits.herokuapp.com/assets/Badges/Empire_State.png', earned: false},
  {name:'fortyStreak', uri:'https://better-habits.herokuapp.com/assets/Badges/Guitar.png', earned: false},
  {name:'fiftyStreak', uri:'https://better-habits.herokuapp.com/assets/Badges/Mona_Lisa.png', earned: false},
  {name:'sixtyStreak', uri:'https://better-habits.herokuapp.com/assets/Badges/Niagara_Falls.png', earned: false},
  {name:'seventyStreak', uri:'https://better-habits.herokuapp.com/assets/Badges/Picnic.png', earned: false},
  {name:'ninetyStreak', uri:'https://better-habits.herokuapp.com/assets/Badges/Skateboard.png', earned: false},
  {name:'hundredStreak', uri:'https://better-habits.herokuapp.com/assets/Badges/Stonehenge.png', earned: false},
  {name:'thousandStreak', uri:'https://better-habits.herokuapp.com/assets/Badges/Sydney.png', earned: false},
  {name:'millionStreak', uri:'https://better-habits.herokuapp.com/assets/Badges/Taj_Mahal.png', earned: false},
  {name:'threeMillionStreak', uri:'https://better-habits.herokuapp.com/assets/Badges/Underwater.png', earned: false},
  {name:'fourMillionStreak', uri:'https://better-habits.herokuapp.com/assets/Badges/Bonjour.png', earned: false}
];
  // Extra Badges
  // {name:'eightyStreak', uri:'https://better-habits.herokuapp.com/assets/Badges/Pyramids.png', earned: false},
  // {name:'twoMillionStreak', uri:'https://better-habits.herokuapp.com/assets/Badges/Traffic.png', earned: false},

var Badges = React.createClass({
  getInitialState: function () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: function (row1, row2) {
          return row1 !== row2
        }
      })
    };
  },
  
  componentDidMount: function () {
    var _this = this;
    _allBadges.forEach(function (badge) {
      _this.props.earnedBadges.forEach(function (userBadge) {
        if(userBadge.hasOwnProperty(badge.name)) {
          badge.earned = true;
        }
      });
    });
    
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(_allBadges)
    });
  },

  renderRow: function (rowData, sectionID, rowID) {
    
    if(rowData.earned) {
      return (
        <View>
          <TouchableOpacity underlayColor="transparent">
          <View style={styles.row}>
            <Image style={styles.badges} source={{uri: rowData.uri}} />
            <Text sytle={styles.names}>{rowData.name}</Text>
          </View>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View>
        <TouchableOpacity underlayColor="transparent">
        <View style={styles.row}>
          <Image style={styles.unearnedBadges} source={{uri: rowData.uri}} />
          <Text sytle={styles.names}>{rowData.name}</Text>
        </View>
        </TouchableOpacity>
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

  renderScene: function (route, navigator) {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          // scrollEnabled={false}
          contentContainerStyle={styles.list}
          initialListSize={21}
          pageSize={3}
        />
      </View>
    )
  }

});

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={function () {navigator.parentNavigator.pop()}}>
        <Text style={{color: 'white', margin: 10}}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton(route, navigator, index, navState) {
    return null;
  },

  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 18}}>
          All Badges
        </Text>
      </TouchableOpacity>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 0.90,
    justifyContent: 'center'
  },
  list: {
    top: 90,
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    top: 4,
    justifyContent: 'center',
    padding: 1,
    margin: 1,
    width: 100,
    height: 125,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  badges: {
    height: 75,
    width: 75
  },
  unearnedBadges: {
    height: 75,
    width: 75,
    opacity: 0.2
  },
  names: {
    color: '#B3B9B9'
  }
});

module.exports = Badges;
