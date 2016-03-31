var React = require('react-native');
var api = require('../lib/api');
var badges = require('../lib/badges');
var View = React.View;
var Text = React.Text;
var StyleSheet = React.StyleSheet;
var Navigator = React.Navigator;
var TouchableOpacity = React.TouchableOpacity;
var ListView = React.ListView;
var Image = React.Image;
var ScrollView = React.ScrollView;

var BadgeView = React.createClass({
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
    
    var allBadges = [];
    for(var key in badges) {
      allBadges.push({name: key, uri: badges[key].uri, earned: false});
    }
    
    allBadges.forEach(function (badge) {
      this.props.earnedBadges.forEach(function (userBadge) {
        if(userBadge.hasOwnProperty(badge.name)) {
          badge.earned = true;
        }
      });
    }.bind(this));

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(allBadges)
    });
  },

  renderRow: function (rowData, sectionID, rowID) {

    if (rowData.earned) {
      return (
        <View>
          <TouchableOpacity underlayColor="transparent">
          <View style={styles.row}>
            <Image style={styles.badges} source={{uri: rowData.uri}} />
            <Text style={styles.names}>{rowData.name}</Text>
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
          <Text style={styles.names}>{rowData.name}</Text>
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
          contentContainerStyle={styles.list}
          initialListSize={21}
          pageSize={3}
        />
      </View>
    );
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
    color: '#B3B9B9',
    width: 120,
    textAlign: 'center',
  },
});

module.exports = BadgeView;
