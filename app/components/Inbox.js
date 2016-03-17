var React = require('react-native');
var Text = React.Text;
var View = React.View;
var StyleSheet = React.StyleSheet;
// App components
var Swipeout = require('react-native-swipeout');

function Inbox (props) {
  var swipeButtons = [
    {
      text: 'Delete',
      backgroundColor: '#FF0000',
      onPress: function () {props.deleteHabit(props.habit._id)},
    },
    {
      text: 'Edit',
      color: '#FFFFFF',
      backgroundColor: "#b1cced",
      onPress: function () {props.editHabit(props.habit)}
    },
    {
      text: 'Did It!', // TODO: name this better
      color: '#EDBE40',
      backgroundColor: '#273d58',
      onPress: function () {props.createInstance(props.habit._id)}
    }
  ];

  return (
    <View style={styles.inboxitem}>
      <Swipeout autoClose={true} right={swipeButtons} backgroundColor={'#EDBE40'}>
        <View style={styles.swipe}>
          <Text style={styles.habit}>{props.habit.action} {props.habit.frequency}</Text>
          <Text style={styles.count}>You've done this {props.habit.instanceCount} times.</Text>
        </View>
      </Swipeout>
    </View>
  )
};

var styles = StyleSheet.create({
  count: {
    fontSize: 10
  },
  habit: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  inboxitem: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#090f16'
  },
  swipe: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 15,
    paddingBottom: 15
  }
});

module.exports = Inbox;
