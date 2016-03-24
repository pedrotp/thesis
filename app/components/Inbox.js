var React = require('react-native');
var Text = React.Text;
var View = React.View;
var StyleSheet = React.StyleSheet;
var Image = React.Image;
var TouchableOpacity = React.TouchableOpacity;

// App components
var Swipeout = require('react-native-swipeout');
var moment = require('moment');

function Inbox (props) {
  var swipeButtons = [
    // {
    //   text: 'Delete',
    //   backgroundColor: '#FF0000',
    //   onPress: function () {props.deleteHabit(props.habit._id)},
    // },
    {
      text: 'Settings',
      color: '#000000',
      backgroundColor: "#EDBE40",
      onPress: function () {props.editHabit(props.habit)}
    },
    // {
    //   text: 'Did It!', // TODO: name this better
    //   color: '#EDBE40',
    //   backgroundColor: '#273d58',
    //   onPress: function () {props.createInstance(props.habit._id)}
    // }
  ];

  var done = props.habit.lastDone && moment(props.habit.lastDone).isSame(Date.now(), 'day');

  return (
    <View style={styles.inboxrow}>
      <Swipeout autoClose={true} right={swipeButtons} backgroundColor={'#fcfcfc'}>
        <View style={styles.swipe}>
          <View>
            <Text style={styles.habit}>{props.habit.action}</Text>
            <Text style={styles.count}>You've done this {props.habit.instanceCount} time(s).</Text>
          </View>
          <TouchableOpacity  style={styles.touch} onPress={function () {props.doHabit(props.habit._id)}}>
            <Image
              source={ done ? {uri: 'http://localhost:3000/assets/done_green.png'} : {uri: 'http://localhost:3000/assets/done_gray.png'} }
              style={ styles.doneButton }
            />
          </TouchableOpacity>
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
  habitinfo: {
  },
  inboxrow: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#090f16'
  },
  swipe: {
    paddingLeft: 15,
    paddingRight: 5,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row'
  },
  touch: {
    position: 'absolute',
    right: 20,
    top: 16
  },
  doneButton: {
    width: 26,
    height: 26,
  }
});

module.exports = Inbox;
