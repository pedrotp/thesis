var React = require('react-native');
var Swipeout = require('react-native-swipeout');
var Text = React.Text;
var View = React.View;
var StyleSheet = React.StyleSheet;

function Inbox (props) {
  var swipeButtons = [
    {
      text: 'Delete',
      onPress: props.deleteHabit,
      backgroundColor: '#FF0000'
    },
    {
      text: 'Edit',
      color: '#000000',
      backgroundColor: "#FFFFFF"
    },
    {
      text: 'Did It!', // TODO: name this better
      color: '#FFFFFF',
      backgroundColor: '#006600'
    }
  ];

  return (
    // header?
    // habit list
    <View>
      {props.habits.map(function (habit) {
        return <View style={styles.habit} key={habit._id}>
          <Swipeout  right={swipeButtons}>
            <View style={styles.swipe}>
              <Text>{habit.action} {habit.currentGoal} {habit.unit} {habit.frequency}</Text>
            </View>
          </Swipeout>
        </View>
      }, this)}
    </View>
  )
};

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
