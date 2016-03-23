var React = require('react-native');
var View = React.View;
var Text = React.Text;
var StyleSheet = React.StyleSheet;
var Navigator = React.Navigator;
var TouchableOpacity = React.TouchableOpacity;
var ListView = React.ListView;

var HabitDetails = React.createClass({
  getInitialState: function () {
    var ds = new ListView.DataSource({
      rowHasChanged: function (row1, row2) {
        return row1 !== row2
      }
    });
    // generates dummy data
    var data = [];
    for(var i = 0; i < 21; i++ ) {
      data.push('not done');
    }
    return {
      dataSource: ds.cloneWithRows(data)
    }
  },
  
  componentDidMount: function () {
    //Uses this.props.habitId to fetch
    //habit details and set state 
  },
  
  renderRow: function (rowData, sectionID, rowID) {
    return (
      <TouchableOpacity onPress={function(rowData, sectionID, rowID){console.log('ROWDATA:', rowData, 'SECTIONID:', sectionID, 'ROWID', rowID)}} underlayColor="transparent">
        <View style={styles.row}>
          <Text style={styles.text}>
            {rowData}
          </Text>
        </View>
      </TouchableOpacity>
    )
  },
  
  render: function () {
      return (
        <View style={{ flex: 1 }}>
          <Navigator
            renderScene={this.renderScene}
            navigator={this.props.navigator} 
            navigationBar={
              <Navigator.NavigationBar style={{backgroundColor: '#6399DC', alignItems: 'center'}}
                  routeMapper={NavigationBarRouteMapper} />
            } 
          />
        </View>
      );
  },
  
  renderScene: function (route, navigator) {
    var _this = this;
    // normal mode
    return (
      <View>
        <Text style={styles.heading} onPress={this.onPress}>{ this.props.habitName }</Text>
        <TouchableOpacity>
        </TouchableOpacity>
        <ListView 
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          initialListSize={21}
          pageSize={3} // should be the multiple of the no. of visible cells per row
          scrollRenderAheadDistance={500}
          renderRow={this.renderRow}
        />
        <Text>Current Streak: {}</Text>
        <Text>Longest Streak: {}</Text>
        <Text>Total Completed: {}</Text>
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
        )
  },

  RightButton(route, navigator, index, navState) {
    return null;
  },

  Title(route, navigator, index, navState) {
    // var title;
    // var routeStack = navigator.parentNavigator.state.routeStack;
    // var previousRoute = routeStack[routeStack.length - 2];
    
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
            Habit Details
        </Text>
      </TouchableOpacity>
    );
  }
};

var styles = StyleSheet.create({
  heading: {
    fontSize: 40
  },
  list: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 3,
    width: 100,
    height: 100,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  }
});
module.exports = HabitDetails;