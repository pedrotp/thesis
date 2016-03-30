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


var BADGE_URLS = [
  require('../../pub/assets/Badges/Morning.png'),
  require('../../pub/assets/Badges/Bon_Voyage.png'),
  require('../../pub/assets/Badges/Mountain_Top.png'),
  require('../../pub/assets/Badges/Bungee.png'),
  require('../../pub/assets/Badges/Duel.png'),
  require('../../pub/assets/Badges/Empire_State.png'),
  require('../../pub/assets/Badges/Guitar.png'),
  require('../../pub/assets/Badges/Hot_Air_Balloon.png'),
  require('../../pub/assets/Badges/Mona_Lisa.png'),
  require('../../pub/assets/Badges/Niagara_Falls.png'),
  require('../../pub/assets/Badges/Picnic.png'),
  require('../../pub/assets/Badges/Pyramids.png'),
  require('../../pub/assets/Badges/Skateboard.png'),
  require('../../pub/assets/Badges/Stonehenge.png'),
  require('../../pub/assets/Badges/Sydney.png'),
  require('../../pub/assets/Badges/Taj_Mahal.png'),
  require('../../pub/assets/Badges/Traffic.png'),
  require('../../pub/assets/Badges/Underwater.png'),
  require('../../pub/assets/Badges/Archery.png'),
  require('../../pub/assets/Badges/Duel.png'),
  require('../../pub/assets/Badges/Bonjour.png'),
];

var Badges = React.createClass({
  getInitialState: function () {
    var ds = new ListView.DataSource({
      rowHasChanged: function (row1, row2) {
        return row1 !== row2
      }
    });
    return {
      dataSource: ds.cloneWithRows(BADGE_URLS)
    };
  },

  renderRow: function (rowData, sectionID, rowID) {
    return (
      <View>
        <TouchableOpacity underlayColor="transparent">
        <View style={styles.row}>
          <Image style={styles.badges} source={rowData} />
          <Text sytle={styles.names}>Badge Name</Text>
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
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
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
  names: {
    color: '#B3B9B9'
  }
});

module.exports = Badges;
