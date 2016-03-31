// React Native component
var React = require('react-native');
var Text = React.Text;
var View = React.View;
var StyleSheet = React.StyleSheet;
var Image = React.Image;
var TouchableOpacity = React.TouchableOpacity;

// external libraries and components
var Swipeout = require('react-native-swipeout');
var moment = require('moment');
var Icon = require('react-native-vector-icons/FontAwesome');

function Inbox (props) {
  var swipeButtons = [{
    text: 'Settings',
    color: '#000000',
    backgroundColor: "#eee",
    onPress: function () { props.editHabit(props.habit) }
  },];
  var done = props.habit.lastDone && moment().isSame(props.habit.lastDone, 'day');
  return (
    <View style={ styles.swipeContainer }>
      <Swipeout
        autoClose={ true }
        right={ swipeButtons }
        backgroundColor='transparent'
        scroll={ function (event) {
          props.allowScroll(event)
        }}
      >
        <View style={styles.swipeContent}>
          <TouchableOpacity onPress={ function () { props.gotoDetails(props.habit) } }>
            <View>
              <Text style={ styles.habitText }>{ props.habit.action }</Text>
            </View>
          </TouchableOpacity>
          <View style={ { flex: 1 } }></View>
          <TouchableOpacity onPress={ function () { props.toggleInstance(props.habit._id) } }>
            <Image
              source={ done ? { uri: 'http://better-habits.herokuapp.com/assets/done_green.png' } : { uri: 'http://better-habits.herokuapp.com/assets/done_gray.png' } }
              style={ styles.img }
            />
          </TouchableOpacity>
        </View>
      </Swipeout>
    </View>
  );
};

var styles = StyleSheet.create({
  habitText: {
    fontFamily: 'Avenir',
    fontSize: 20,
  },
  swipeContainer: {
    height: 60,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowOffset: {
      height: 3.5,
      width: 2
    },
  },
  swipeContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  img: {
    width: 30,
    height: 30,
  }
});

module.exports = Inbox;
