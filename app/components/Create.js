var React = require('react-native');
var Text = React.Text;
var View = React.View;
var TextInput = React.TextInput;
var PropTypes = React.PropTypes;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;


function Create (props) {
  return (
    <View style={styles.container}>
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
    <TouchableOpacity onPress={props.onClick} style={styles.button}>
        <Text>
          Submit
        </Text>
    </TouchableOpacity>
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
    fontSize: 14,
    textAlign: 'center',
    margin: 10
  },
  textInput: {
    height: 35,
    width: 250,
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
