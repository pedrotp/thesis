var React = require('react-native');
var Swipeout = require('react-native-swipeout');
var Text = React.Text;
var View = React.View;
var StyleSheet = React.StyleSheet;

function Inbox (props) {
  var swipeButtons = [
    {
      text: 'Delete',
      onPress: function () {props.deleteHabit(props.habit._id)},
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
    <View style={styles.habit}>
      <Swipeout autoClose={true} right={swipeButtons}>
        <View style={styles.swipe}>
          <Text>{props.habit.action} {props.habit.currentGoal} {props.habit.unit} {props.habit.frequency}</Text>
        </View>
      </Swipeout>
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
