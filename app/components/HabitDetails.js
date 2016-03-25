var React = require('react-native');
var api = require('../lib/api');
var View = React.View;
var Text = React.Text;
var StyleSheet = React.StyleSheet;
var Navigator = React.Navigator;
var TouchableOpacity = React.TouchableOpacity;
var ListView = React.ListView;
var moment = require('moment');
var getDaysArray = require('../lib/calendar').getDaysArray;
var getOffSetDays = require('../lib/calendar').getOffSetDays;
var getDaysOfWeek = require('../lib/calendar').getDaysOfWeek;
var makePlaceholder = require('../lib/calendar').makePlaceholder;

// var Icon = require('react-native-vector-icons/MaterialIcons');
// var doneIcon = <Icon name="done" size={30} color="#90" />;

var HabitDetails = React.createClass({
  getInitialState: function () {
    return {
      currentDate: moment().format('DD'),
      dataSource: new ListView.DataSource({
        rowHasChanged: function (row1, row2) {
          return row1 !== row2
        }
      })
    }
  },

  componentDidMount: function () {
    var _this = this;
    var habitId = this.props.habit._id;
    fetch(process.env.SERVER + '/habits/' + this.props.profile.email + '/' + habitId, {
      method: 'GET',
      headers: {
        'Authorization':'Bearer' + this.props.token.idToken
      }
    })
    .then(api.handleErrors)
    .then(function (response) {
      return response.json();
    })
    .then(function (responseData) {
      console.log('response',responseData);
      var monthOfMarch = getDaysArray(2016, 3);
      
      
      monthOfMarch.forEach(function(day) {
        responseData.forEach(function(instance) {
          if(moment(day.fullDate).isSame(instance.createdAt, 'day')) {
            console.log('FULL:',day.fullDate, 'CREATEDAT:', instance.createdAt);
            day.done = true;
            // console.log('TRUEday', day);
          }
        })
      });
      
      console.log('MONTHOFMARCH', monthOfMarch);
      
      
      
      
      
      var offSetSource = getOffSetDays(monthOfMarch[0].dayOfWeek, monthOfMarch);
      console.log('offSetSource:', offSetSource);
      var listSource = getDaysOfWeek().concat(offSetSource);
      if(listSource.length % 7 !== 0) {
        var remainder = 7 - (Math.floor(listSource.length % 7));
        listSource = listSource.concat(makePlaceholder(remainder));
      }
      console.log('listSource', listSource);
      _this.setState({
        dataSource: _this.state.dataSource.cloneWithRows(listSource)
      });
      console.log('STATE:', _this.state);
    })
    .catch(function (err) {
      console.warn(err);
    });
  },

  renderRow: function (rowData, sectionID, rowID) {
    // Renders days of week in the calendar
    if (rowData.calendarHeading) {
      return (
        <TouchableOpacity underlayColor="transparent">
          <View style={styles.weekRow}>
            <Text>
              {rowData.calendarHeading}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    
    if (rowData.placeholder) {
      return (
      <TouchableOpacity underlayColor="transparent">
        <View style={styles.unavailRow}>
          <Text style={styles.rowText}>
          </Text>
        </View>
      </TouchableOpacity>
      );
    }
    // renders DONE boxes
    if (rowData.done) {
      return (
        <TouchableOpacity underlayColor="transparent">
          <View style={styles.doneRow}>
            <Text style={styles.rowText}>
              {rowData.date}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    // // renders NOT DONE boxes
    // if(rowData >=18 && rowData <= 20) {
    //   return (
    //     <TouchableOpacity underlayColor="transparent">
    //       <View style={styles.notDoneRow}>
    //         <Text style={styles.rowText}>
    //           {rowData}
    //         </Text>
    //       </View>
    //     </TouchableOpacity>
    //   );
    // }
    // renders FUTURE boxes
    // renders PRESENT box
    if(rowData.date === this.state.currentDate ) {
      return (
        <TouchableOpacity underlayColor="transparent">
          <View style={styles.presentRow}>
            <Text style={styles.rowText}>
              {rowData.date}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    if(rowData.date > this.state.currentDate) {
      return (
        <TouchableOpacity underlayColor="transparent">
          <View style={styles.futureRow}>
            <Text style={styles.rowText}>
              {rowData.date}
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
            {rowData.date}
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
        <Text style={styles.heading} onPress={this.onPress}>{ this.props.habit.action }</Text>
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
          <Text style={styles.text}>Current Streak: { moment(new Date(this.props.habit.lastDone)).isSame(Date.now(), 'week') ? _this.props.habit.streak.current : 0 }</Text>
          <Text style={styles.text}>Longest Streak: {_this.props.habit.streak.max}</Text>
          <Text style={styles.text}>Total Completed: {_this.props.habit.instanceCount}</Text>
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
