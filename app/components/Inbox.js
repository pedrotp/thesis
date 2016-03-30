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
      <Swipeout
        autoClose={true}
        right={swipeButtons}
        backgroundColor={'#fcfcfc'}
        scroll={function (event) {
          props.allowScroll(event)
        }}
      >
        <View style={styles.swipe}>
          <TouchableOpacity onPress={function () {props.gotoDetails(props.habit)}}>
            <View>
              <Text style={styles.habit}>{props.habit.action}</Text>
              <Text style={styles.count}>Completed {props.habit.instanceCount} time(s) this week!</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.touch } onPress={function () {props.toggleInstance(props.habit._id)}}>
            <Image
                source={ done ? {uri: 'http://better-habits.herokuapp.com/assets/done_green.png'} : {uri: 'http://better-habits.herokuapp.com/assets/done_gray.png'} }
                style={ styles.img }
            />
          </TouchableOpacity>
        </View>
      </Swipeout>
    </View>
  );
};

var styles = StyleSheet.create({
  count: {
    fontSize: 12
  },
  habit: {
    fontSize: 16,
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
  img: {
    width: 26,
    height: 26,
  }
});

module.exports = Inbox;
