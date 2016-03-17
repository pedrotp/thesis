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
      <TextField title='What do you want do do?' onChange={function (text) { props.fields.action = text; }} value={ props.fields.action }></TextField>
      <TextField title='How often would you like to do it?' onChange={function (text) { props.fields.frequency = text; }} value={ props.fields.frequency }></TextField>
{/*   <TextField title='Unit:' onChange={function (text) { props.fields.unit = text; }} value={ props.fields.unit }></TextField>
      <TextField title='Goal:' onChange={function (text) { props.fields.goal = text; }} value={ props.fields.goal }></TextField>  */}
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
        value={props.value}
      />
    </View>
  );
}

function SubmitButton (props) {
  return (
    <TouchableOpacity onPress={props.onClick} style={styles.button}>
        <Text style={{color: '#FFFFFF'}}>
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
    backgroundColor: '#EDBE40'
  },
  welcome: {
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF'
  },
  textInput: {
    height: 35,
    width: 250,
    borderColor: '#FFFFFF',
    color: '#FFFFFF',
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
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    margin: 20
  }
});

module.exports = Create;
