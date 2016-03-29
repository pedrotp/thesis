var React = require('react-native');
var api = require('../lib/api');
var View = React.View;
var Text = React.Text;
var StyleSheet = React.StyleSheet;
var Navigator = React.Navigator;
var TouchableOpacity = React.TouchableOpacity;
var ListView = React.ListView;

var moment = require('moment');
var getInstancePeriod = require('../lib/calendar').getInstancePeriod;

var InstanceHistory = React.createClass({
  getInitialState: function () {
      return {
        dataSource: new ListView.DataSource({
          rowHasChanged: function (row1, row2) {
            return row1 !== row2
          }
        })
      }
  },
  
  componentDidMount: function () {
    var _this = this;
    console.log('PROPS', this.props);
    // generate period
    // console.log('habitcreated', this.props.habit.createdAt, 'moment', moment().format());
    var days = getInstancePeriod(this.props.habit.createdAt, moment().format());
    days.forEach(function(day) {
      _this.props.instances.forEach(function (instance) {
        if(moment(day.ISOString).isSame(instance.createdAt, 'day')) {
          day.note = instance.note;
          day.done = true;
        }
      });
    })
    console.log('DAYS', days);
    // compare with this.props.instances and create new data
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(days)
    })
  },
  
  // moment(rowData.ISOString).format('MMMM Do YYYY') 
  renderRow: function (rowData, sectionID, rowID) {
    return (
      <View>
        <Text>{ rowData.ISOString }</Text>
        <Text>{ rowData.done }</Text>
        <TouchableOpacity>
          <Text>Note goes here.</Text>
        </TouchableOpacity>
      </View>
    )
  },
  
  render: function () {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          renderScene={this.renderScene}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#6399DC', alignItems: 'center'}}
              routeMapper={NavigationBarRouteMapper}
            />
          }
        />
      </View>
    );
  },
  renderScene: function (route, navigator) {
    return (
      <View style={styles.container}>
        <ListView 
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
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
    );
  },

  RightButton(route, navigator, index, navState) {
    return null;
  },

  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
          History
        </Text>
      </TouchableOpacity>
    );
  }
};


var styles = StyleSheet.create({
  container: {
    flex: 0.90,
    justifyContent: 'center'
  }
});

module.exports = InstanceHistory;