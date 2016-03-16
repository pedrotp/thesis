var React = require('react-native');
var Inbox = require('../components/inbox');
var Welcome = require('../components/welcome');
var View = React.View;
var Text = React.Text;
var Navigator = React.Navigator;
var TouchableOpacity = React.TouchableOpacity;
var ListView = React.ListView;
var StyleSheet = React.StyleSheet;


var Habits = React.createClass({
  getInitialState: function () {
    var ds = new ListView.DataSource({
      rowHasChanged: function (row1, row2) {
        row1 !== row2
      }
    })
    console.log("DS:", ds);
    return {
      dataSource: ds.cloneWithRows([]),
    }
  },
  getHabits: function () {
    var _this = this;
    fetch('http://localhost:3000/habits', {
      method: 'GET',
    })
    .then(function (response) {
      return response.json()
    })
    .then(function (responseJSON) {
      console.log('Habit Array:', responseJSON)
      var rowIds = [];
      for (var i = 0; i < responseJSON.length; i++) {
        rowIds.push(responseJSON[i]._id);
      }
      var newDataSource = _this.state.dataSource.cloneWithRows(responseJSON, rowIds);
      console.log(newDataSource);
      _this.setState({
        dataSource: newDataSource
      });
    })
    .catch(function (error) {
      console.warn(error); // TODO: double check console.warn
    });
  },
  deleteHabit: function (habitId) {
    console.log("deleteHabit called on", habitId);
  },
  componentWillMount: function () {
    this.getHabits();
  },
  renderRow: function (rowData, sectionID, rowID) {
    console.log(rowData);
    return <View>
      <Text>{rowID}</Text>
      <Text>{rowData}</Text>
    </View>

    // <Inbox habits={this.state.habits} deleteHabit={this.deleteHabit}/>
  },
  render: function () {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          renderScene={this.renderScene}
          navigator={this.props.navigator} />
      </View>
    );
  },
  renderScene: function (route, navigator) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>BETTER</Text>
       <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 10
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

module.exports = Habits;
