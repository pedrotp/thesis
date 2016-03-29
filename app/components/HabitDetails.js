var React = require('react-native');
var api = require('../lib/api');
var View = React.View;
var Text = React.Text;
var StyleSheet = React.StyleSheet;
var Navigator = React.Navigator;
var TouchableOpacity = React.TouchableOpacity;
var ListView = React.ListView;

var moment = require('moment');

var getPeriodArray = require('../lib/calendar').getPeriodArray;
var getDaysArray = require('../lib/calendar').getDaysArray;
var calendarLabel = require('../lib/calendar').calendarLabel;

var Note = require('./Note');


// var Icon = require('react-native-vector-icons/MaterialIcons');
// var doneIcon = <Icon name="done" size={30} color="#90" />;

var HabitDetails = React.createClass({
  getInitialState: function () {
    return {
      currentDate: moment(),
      dataSource: new ListView.DataSource({
        rowHasChanged: function (row1, row2) {
          return row1 !== row2
        }
      }),
      modalVisible: false,
      rowData: null,
      instanceId: null,
      date: null,
      note: { note: '' }
    }
  },

  hideModal: function () {
    this.setState({modalVisible: false});
  },

  getRowData: function () {
    var habitId = this.props.habit._id;
    fetch(process.env.SERVER + '/habits/' + this.props.profile.email + '/' + habitId, {
      method: 'GET',
      headers: {
        'Authorization':'Bearer ' + this.props.token.idToken
      }
    })
    .then(api.handleErrors)
    .then(function (response) {
      return response.json();
    })
    .then((function (responseData) {
      var period = getPeriodArray();
      var days = getDaysArray(period);

      days.forEach(function(day) {
        responseData.forEach(function(instance) {
          if(moment(day.ISOString).isSame(instance.createdAt, 'day')) {
            day.instanceId = instance._id;
            day.note = { note: instance.note };
            day.done = true;
          }
        });
      });

      days = calendarLabel().concat(days);

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(days)
      });
    }).bind(this))
    .catch(function (err) {
      console.warn(err);
    });
  },

  componentDidMount: function () {
    this.getRowData();
  },

  handleInstancePress: function (rowData) {
    this.setState({
      modalVisible: true,
      rowData: rowData,
      instanceId: rowData.instanceId,
      date: rowData.ISOString,
      note: rowData.note
    });
  },

  renderRow: function (rowData, sectionID, rowID) {
    var _this = this;
    // Renders DAYS OF WEEK in the calendar
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
    // renders PRESENT DAY, DONE with NOTE box
    if (moment(rowData.ISOString).isSame(this.state.currentDate, 'day') && rowData.done && rowData.note.note) {
      return (
        <TouchableOpacity onPress={function () {_this.handleInstancePress(rowData)}} underlayColor="transparent">
          <View style={styles.doneRowNote}>
            <Text style={styles.rowText}>
              {rowData.date}
            </Text>
            <Text style={styles.rowText}>
              Note
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    // renders PRESENT DAY, DONE box
    if (moment(rowData.ISOString).isSame(this.state.currentDate, 'day') && rowData.done) {
      return (
        <TouchableOpacity onPress={function () {_this.handleInstancePress(rowData)}} underlayColor="transparent">
          <View style={styles.presentDoneRow}>
            <Text style={styles.rowText}>
              {rowData.date}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    // renders PRESENT DAY, NOT-DONE box
    if (moment(rowData.ISOString).isSame(this.state.currentDate, 'day')) {
      return (
        <TouchableOpacity underlayColor="transparent">
          <View style={styles.presentNotDoneRow}>
            <Text style={styles.rowText}>
              {rowData.date}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    // renders DONE with NOTE boxes
    if (rowData.done && rowData.note.note) {
      return (
        <TouchableOpacity onPress={function () {_this.handleInstancePress(rowData)}} underlayColor="transparent">
          <View style={styles.doneRowNote}>
            <Text style={styles.rowText}>
              {rowData.date}
            </Text>
            <Text style={styles.rowText}>
              Note
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    // renders DONE boxes
    if (rowData.done) {
      return (
        <TouchableOpacity onPress={function () {_this.handleInstancePress(rowData)}} underlayColor="transparent">
          <View style={styles.doneRow}>
            <Text style={styles.rowText}>
              {rowData.date}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    // renders FUTURE DAYS boxes
    if (this.state.currentDate.diff(rowData.ISOString) < 0) {
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
    // renders NOT DONE & NA boxes
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
    return (
      <View style={styles.container}>
        <Text style={styles.heading} onPress={this.onPress}>{ this.props.habit.action }</Text>
        <TouchableOpacity>
        </TouchableOpacity>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          initialListSize={28}
          pageSize={7}
          renderRow={this.renderRow}
          scrollEnabled={false}
          automaticallyAdjustContentInsets={false}
        />
        <View style={styles.count}>
          <Text style={styles.text}>Current Streak: { moment(new Date(this.props.habit.lastDone)).isSame(Date.now(), 'week') ? this.props.habit.streak.current : 0 }</Text>
          <Text style={styles.text}>Longest Streak: {this.props.habit.streak.max}</Text>
          <Text style={styles.text}>Total Completed: {this.props.habit.instanceCount}</Text>
        </View>
        <Note
          visible={this.state.modalVisible}
          rowData={this.state.rowData}
          instanceId={this.state.instanceId}
          note={this.state.note}
          token={this.props.token}
          profile={this.props.profile}
          habit={this.props.habit}
          getRowData={this.getRowData}
          hideModal={this.hideModal}
          date={this.state.date}
          >
        </Note>
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
    alignItems: 'center'
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
  doneRowNote: {
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
  presentDoneRow: {
    justifyContent: 'center',
    padding: 1,
    margin: 1,
    width: 50,
    height: 50,
    backgroundColor: '#419648',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#000000'
  },
  presentNotDoneRow: {
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
  count: {
    alignItems: 'center',
    bottom: 120
  },
  rowText: {
    fontSize: 15,
  },
  text: {
    fontSize: 20,
    padding: 3,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
module.exports = HabitDetails;
