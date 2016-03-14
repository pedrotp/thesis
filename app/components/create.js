var React = require('react');
var StyleSheet = require('react-native').StyleSheet;
var Text = require('react-native').Text;
var TextInput = require('react-native').TextInput;
var View = require('react-native').View;
var PropTypes = require('react-native').PropTypes;
var TouchableHighlight = require('react-native').TouchableHighlight;
var Alert = require('react-native').Alert;

var Create = React.createClass({
  getInitialState: function () {
    return {
      action: null,
      frequency: null,
      unit: null,
      goal: null,
      schedule: null
    }
  },
  fields: {
    action: null,
    frequency: null,
    unit: null,
    goal: null,
    schedule: null
  },
  sendHabit: function (reqbody) {
    fetch('http://localhost:3000/habits', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqbody)
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (responseJSON) {
      console.log('success responseJSON:', responseJSON);
      Alert.alert(
        'Habit created!',
        'Thank you!',
        [
          { text: 'Ok'}
        ])
    })
    .catch(function (error) {
      console.warn(error);
    });
  },
  handleClick: function () {
    // console.log('fields:', this.fields);
    var action = this.fields.action;
    var frequency = this.fields.frequency;
    var unit = this.fields.unit;
    var goal = this.fields.goal;
    var schedule = this.fields.schedule;

    // this._textInput.setNativeProps({text: ''});

    this.setState({
      action,
      frequency,
      unit,
      goal,
      schedule
    });

    this.sendHabit({
      action: action,
      frequency: frequency,
      unit: unit,
      goal: goal,
      schedule: schedule
    });
  },
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Create and add a habit!</Text>
        <TextField title='Action:' onChange={function (text) { this.fields.action = text; }.bind(this)}></TextField>
        <TextField title='Frequency:' onChange={function (text) { this.fields.frequency = text; }.bind(this)}></TextField>
        <TextField title='Unit:' onChange={function (text) { this.fields.unit = text; }.bind(this)}></TextField>
        <TextField title='Goal:' onChange={function (text) { this.fields.goal = text; }.bind(this)}></TextField>
        <TextField title='Schedule:' onChange={function (text) { this.fields.schedule = text; }.bind(this)}></TextField>
        <SubmitButton
          onClick={this.handleClick}/>
      </View>
    );
  }
});

function TextField (props) {
  return (
    <View>
      <Text style={styles.welcome}>
        {props.title}
      </Text>
      <TextInput
        // ref={function (component) { this._textInput = component }}
        style={styles.textInput}
        onChangeText={props.onChange}
        placeholder='Please add your habit'
      />
    </View>
  );
}

function SubmitButton (props) {
  return (
    <TouchableHighlight onPress={props.onClick} style={styles.button}>
        <Text>
          Submit
        </Text>
    </TouchableHighlight>
  );
}

TextField.PropTypes = {
  title: PropTypes.string.isRequired,
  onChangeInputText: PropTypes.func.isRequired
};

SubmitButton.PropTypes = {
  onClick: PropTypes.func.isRequired
};

var styles = StyleSheet.create({
  container: {
    flex: 0.90,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  textInput: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center'
  },
  button: {
    height: 30,
    width: 80,
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    margin: 20
  }
});

module.exports = Create;
