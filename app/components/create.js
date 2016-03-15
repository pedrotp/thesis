var React = require('react');
var Text = require('react-native').Text;
var View = require('react-native').View;
var TextInput = require('react-native').TextInput;
var PropTypes = require('react-native').PropTypes;
var StyleSheet = require('react-native').StyleSheet;
var TouchableHighlight = require('react-native').TouchableHighlight;

function Create (props) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Create and add a habit!</Text>
      <TextField title='Action:' onChange={function (text) { props.fields.action = text; }}></TextField>
      <TextField title='Frequency:' onChange={function (text) { props.fields.frequency = text; }}></TextField>
      <TextField title='Unit:' onChange={function (text) { props.fields.unit = text; }}></TextField>
      <TextField title='Goal:' onChange={function (text) { props.fields.goal = text; }}></TextField>
      <TextField title='Schedule:' onChange={function (text) { props.fields.schedule = text; }}></TextField>
      <SubmitButton
        onClick={props.handleClick}/>
    </View>
  );
}

function TextField (props) {
  return (
    <View>
      <Text style={styles.welcome}>
        {props.title}
      </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={props.onChange}
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

Create.PropTypes = {
  fields: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
};

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
