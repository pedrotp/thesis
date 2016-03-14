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
          return <Swipeout key={habit._id} right={swipeButtons}>
            <View>
              <Text>{habit.action}</Text>
              <Text>{habit.count}</Text>
            </View>
          </Swipeout>
        })}
      </View>
      // add button
    )
  }
});

// var styles = StyleSheet.create({
//   container: {
//     marginTop: 30,
//     padding: 10
//   }
// });

module.exports = Inbox;
