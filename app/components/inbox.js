var React = require('react-native');
var Swipeout = require('react-native-swipeout');
var Text = React.Text;
var View = React.View;
var StyleSheet = React.StyleSheet;

var swipeButtons = [
  {text: 'Delete'},
  {text: 'Edit'},
  {text: 'Record'} // TODO: name this better
];

var Inbox = React.createClass({
  render: function () {
    return (
      <View>
        {this.props.habits.map(function (habit) {
          return <View style={styles.habit} key={habit._id}>
            <Swipeout right={swipeButtons}>
              <View style={styles.swipe}>
                <Text>{habit.action} {habit.currentGoal} {habit.unit} {habit.frequency}</Text>
              </View>
            </Swipeout>
          </View>
        })}
      </View>
      // add button
    )
  }
});

var styles = StyleSheet.create({
  habit: {
    flex: 1
  },
  swipe: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 15,
    paddingBottom: 15
  }
});

module.exports = Inbox;
