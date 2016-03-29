var React = require('react-native');
var api = require('../lib/api');
var View = React.View;
var Text = React.Text;
var StyleSheet = React.StyleSheet;
var Navigator = React.Navigator;
var TouchableOpacity = React.TouchableOpacity;
var ListView = React.ListView;
var Image = React.Image;

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
    var days = getInstancePeriod(this.props.habit.createdAt, moment().format());
    days.forEach(function(day) {
      this.props.instances.forEach(function (instance) {
        if(moment(day.ISOString).isSame(instance.createdAt, 'day')) {
          day.note = instance.note;
          day.done = true;
        }
      });
    }.bind(this));
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(days)
    })
  },
  
  //<Text>Note ></Text>
  renderRow: function (rowData, sectionID, rowID) {    
    if(rowData.done) {
      return (
        <View style={styles.row} >
          <Text style={styles.date} >{ moment(rowData.ISOString).format('MMMM Do YYYY') }</Text>
          <TouchableOpacity style={ styles.touch }>
            <Image
                source={ {uri: 'http://better-habits.herokuapp.com/assets/done_green.png'} }
                style={ styles.img }
            />
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View style={styles.row} >
        <Text style={styles.date} >{ moment(rowData.ISOString).format('MMMM Do YYYY') }</Text>
        <TouchableOpacity style={ styles.touch }>
          <Image
              source={ {uri: 'http://better-habits.herokuapp.com/assets/done_gray.png'} }
              style={ styles.img }
          />
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
    var _this = this;
    return (
      <View style={styles.container}>
        <ListView 
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderHeader={ function () { return (<View><Text style={styles.header}>{_this.props.habit.action}</Text></View>)}}
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
    justifyContent: 'center',
    marginTop: 54,
    paddingTop: 10
  },
  row: {
      flexDirection: 'row',
      // justifyContent: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#CCCCCC',
      backgroundColor: '#F6F6F6'
  },
  header: {
    padding: 10,
    margin: 5,
    fontSize: 20,
    textAlign: 'center'
  },
  date: {
    // flex: 1
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18
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

module.exports = InstanceHistory;