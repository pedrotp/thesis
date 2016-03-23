var React = require('react-native');
var Text = React.Text;
var View = React.View;
var StyleSheet = React.StyleSheet;
var Image = React.Image;
// App components
var Swipeout = require('react-native-swipeout');
var moment = require('moment');

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

  var done = props.habit.lastDone && moment(props.habit.lastDone).isSame(Date.now(), props.habit.frequency);

  return (
    <View style={styles.inboxitem}>
      <Swipeout autoClose={true} right={swipeButtons} backgroundColor={'#EDBE40'}>
        <View style={styles.swipe}>
          <View>
            <Text style={styles.habit}>{props.habit.action} {props.habit.frequency + 'ly'}</Text>
            <Text style={styles.count}>You've done this {props.habit.instanceCount} time(s).</Text>
            <Text style={ done ? styles.done : styles.notdone }>{ done ? 'DONE TODAY' : 'NOT DONE TODAY' }</Text>
          </View>
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
  },
  done: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#8ed79d'
  },
  notdone: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#dc7177'
  },
  img: {
    width: 12,
    height: 12
  }
});

module.exports = Inbox;
