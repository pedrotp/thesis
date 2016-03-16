var React = require('react-native');
var Inbox = require('../components/Inbox');
var Welcome = require('../components/Welcome');
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
        return row1 !== row2
      }
    })
    return {
      habits: {},
      dataSource: ds.cloneWithRows([]),
    }
  },
  getHabits: function () {
    var _this = this;
    fetch('http://localhost:3000/habits', {
      method: 'GET',
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (responseData) {
      console.log("RESPONSE DATA:", responseData);
      _this.setState({
        dataSource: _this.state.dataSource.cloneWithRows(responseData)
      });
    })
    .done();
  },
  deleteHabit: function (habitId) {
    console.log("deleteHabit called on", habitId);
    fetch('http://localhost:3000/habits/' +habitId, {
      mathod: 'DELETE',
    })
  },
  componentDidMount: function () {
    this.getHabits();
  },
  renderInbox: function (habit) {
    console.log("ROWDATA:", habit);
    return <Inbox habit={habit} deleteHabit={this.deleteHabit} />
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
      <View>
        <View style={styles.container}>
          <Text style={styles.header}>BETTER</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderInbox}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
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
