var React = require('react-native');
var View = React.View;
var Text = React.Text;
var TextInput = React.TextInput;
var StyleSheet = React.StyleSheet;
var Navigator = React.Navigator;
var Alert = React.Alert;
var TouchableOpacity = React.TouchableOpacity;
var ListView = React.ListView;

var HabitDetails = React.createClass({
  getInitialState: function () {
    var ds = new ListView.DataSource({
      rowHasChanged: function (row1, row2) {
        return row1 !== row2
      }
    });
    var data = Array.apply(null, {length: 20}).map(Number.call, Number);
    return {
      dataSource: ds.cloneWithRows(data)
    }
  },
  componentDidMount: function () {
    //Uses this.props.habitId to fetch
    //habit details and set state 
  },
  render: function () {
      return (
        <View style={{ flex: 1 }}>
          <Navigator
            renderScene={this.renderScene}
            navigator={this.props.navigator} 
            navigationBar={
              <Navigator.NavigationBar style={{backgroundColor: '#6399DC', alignItems: 'center'}}
                  routeMapper={NavigationBarRouteMapper} />
            } 
            />
        </View>
      );
  },
  
  renderScene: function (route, navigator) {
    var _this = this;
    // normal mode
    return (
      <View style={styles.container}>
        <Text style={styles.heading} onPress={this.onPress}>{ this.props.habitName }</Text>
        <TouchableOpacity>
        </TouchableOpacity>
        <ListView contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={function (rowData) { return (<Text style={styles.item}>{rowData}</Text>) }}
        />
        <Text>Current Streak: {}</Text>
        <Text>Longest Streak: {}</Text>
        <Text>Total Completed: {}</Text>
      </View>
      )
  }
});



var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
      return (
        <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
            onPress={function () {navigator.parentNavigator.pop()}}>
          <Text style={{color: 'white', margin: 10}}>
            Back
          </Text>
        </TouchableOpacity>
        )
  },

  RightButton(route, navigator, index, navState) {
    return null;
  },

  Title(route, navigator, index, navState) {
    // var title;
    // var routeStack = navigator.parentNavigator.state.routeStack;
    // var previousRoute = routeStack[routeStack.length - 2];
    
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
            Habit Details
        </Text>
      </TouchableOpacity>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 0.90,
    justifyContent: 'center',
    backgroundColor: '#EDBE40'
  },
  heading: {
    fontSize: 40
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    backgroundColor: 'red',
    margin: 3,
    width: 100
  },
  button: {
    height: 30,
    width: 80,
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 0,
    borderRadius: 5,
    padding: 5,
    margin: 20,
    backgroundColor: '#6399DC',
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    shadowRadius: 3,
    shadowOffset: {
      height: 3.5,
      width: 2
    }
  }
});
module.exports = HabitDetails;