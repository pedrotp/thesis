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
      dataSource: ds.cloneWithRows([]),
    }
  },
  // TODO: refactor server call to api library
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
    // TODO: refactor server call to api library
    // remove from server
    fetch('http://localhost:3000/habits/' +habitId, {
      method: 'DELETE',
    })
    .then(function (response) {
      console.log("DELETE RESPONSE:", response)
    })
    .done();
  },
  // Get habits from server on load
  componentDidMount: function () {
    this.getHabits();
  },
  // Get habits from server after change
  componentDidUpdate: function () {
    this.getHabits();
  },
  // Render each row of the inbox as an Inbox component
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
