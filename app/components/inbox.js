// actions/helpers for inbox stuff
var React = require('react');
var StyleSheet = require('react-native').StyleSheet;
var Text = require('react-native').Text;
var View = require('react-native').View;
var Swipeout = require('react-native-swipeout');

var swipeButtons = [
  {text: 'Delete'},
  {text: 'Edit'},
  {text: 'Record'} // TODO: name this better
];

var Inbox = React.createClass({
  render: function () {
    return (
      // header?
      // habit list
      <View style={styles.container}>
        {this.props.habits.map(function (habit) {
          return <Swipeout key={habit._id} right={swipeButtons}>
            <View>
              <Text>{habit.action}</Text>
            </View>
          </Swipeout>
        })}
      </View>
      // add button
    )
  }
});

var styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 10
  }
});

module.exports = Inbox;
