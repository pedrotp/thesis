var React = require('react-native');
var View = React.View;
var Text = React.Text;
var StyleSheet = React.StyleSheet;
var Navigator = React.Navigator;
var TouchableOpacity = React.TouchableOpacity;
var ListView = React.ListView;

// var Icon = require('react-native-vector-icons/MaterialIcons');
// var doneIcon = <Icon name="done" size={30} color="#90" />;

var HabitDetails = React.createClass({
  getInitialState: function () {
    var ds = new ListView.DataSource({
      rowHasChanged: function (row1, row2) {
        return row1 !== row2;
      }
    });
    // generates dummy data
    var daysOfWeek = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
    var data = [], j = 1;
    for (var i = 0; i < 35; i++) {
      if (i < 9) {
        data.push(daysOfWeek[i]);
      } else {
        data.push(j);
        j++;
      }
    }
    return {
      dataSource: ds.cloneWithRows(data)
      // fixedDataSource: ds.cloneWithRows(daysOfWeek)
    };
  },

  componentDidMount: function () {
    //Uses this.props.habitId to fetch
    //habit details and set state
  },

  renderRow: function (rowData, sectionID, rowID) {
    // Renders days of week in the calendar
    if (typeof rowData === 'string') {
      return (
        <TouchableOpacity underlayColor="transparent">
          <View style={styles.weekRow}>
            <Text>
              {rowData}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    // renders DONE boxes
    if (rowData > 12 && rowData < 18 || rowData > 20 && rowData < 24) {
      return (
        <TouchableOpacity underlayColor="transparent">
          <View style={styles.doneRow}>
            <Text style={styles.rowText}>
              {rowData}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    // renders NOT DONE boxes
    if(rowData >=18 && rowData <= 20) {
      return (
        <TouchableOpacity underlayColor="transparent">
          <View style={styles.notDoneRow}>
            <Text style={styles.rowText}>
              {rowData}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    // renders FUTURE boxes
    if(rowData >= 25) {
      return (
        <TouchableOpacity underlayColor="transparent">
          <View style={styles.futureRow}>
            <Text style={styles.rowText}>
              {rowData}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    // renders PRESENT box
    if(rowData === 24 ) {
      return (
        <TouchableOpacity underlayColor="transparent">
          <View style={styles.presentRow}>
            <Text style={styles.rowText}>
              {rowData}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    // renders GREYOUT UNAVAILABLE box
    return (
      <TouchableOpacity underlayColor="transparent">
        <View style={styles.unavailRow}>
          <Text style={styles.rowText}>
            {rowData}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },

  render: function () {
      return (
        <View style={{ flex: 1 }}>
          <Navigator
            renderScene={this.renderScene}
            navigator={this.props.navigator}
            navigationBar={
              <Navigator.NavigationBar style={{backgroundColor: '#6399DC', alignItems: 'center'}}
                routeMapper={NavigationBarRouteMapper}
              />
            }
          />
        </View>
      );
  },

  renderScene: function (route, navigator) {
    var _this = this;
    // normal mode
    return (
      <View style={styles.container}>
        <Text style={styles.heading} onPress={this.onPress}>{ this.props.habitName }</Text>
        <TouchableOpacity>
        </TouchableOpacity>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          initialListSize={21}
          pageSize={7}
          renderRow={this.renderRow}
          scrollEnabled={false}
          automaticallyAdjustContentInsets={false}
        />
        <View style={styles.count}>
          <Text style={styles.text}>Current Streak: 3</Text>
          <Text style={styles.text}>Longest Streak: 5</Text>
          <Text style={styles.text}>Total Completed: 8</Text>
        </View>
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
  container: {
    flex: 0.90,
    justifyContent: 'center'
  },
  heading: {
    top: 80,
    alignSelf: 'center',
    fontSize: 40,
    fontWeight: 'bold'
  },
  list: {
    top: 90,
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  weekRow: {
    top: 4,
    justifyContent: 'center',
    padding: 1,
    margin: 1,
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  doneRow: {
    justifyContent: 'center',
    padding: 1,
    margin: 1,
    width: 50,
    height: 50,
    backgroundColor: '#419648',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  notDoneRow: {
    justifyContent: 'center',
    padding: 1,
    margin: 1,
    width: 50,
    height: 50,
    backgroundColor: '#B5BFBF',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  unavailRow: {
    justifyContent: 'center',
    padding: 1,
    margin: 1,
    width: 50,
    height: 50,
    backgroundColor: '#B5BFBF',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  futureRow: {
    justifyContent: 'center',
    padding: 1,
    margin: 1,
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  presentRow: {
    justifyContent: 'center',
    padding: 1,
    margin: 1,
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#000000'
  },
  count: {
    alignItems: 'center',
    bottom: 120
  },
  rowText: {
    fontSize: 15,
  },
  text: {
    fontSize: 15,
    padding: 3,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
module.exports = HabitDetails;
