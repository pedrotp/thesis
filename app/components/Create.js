var React = require('react-native');
var SegmentedControls = require('react-native-radio-buttons').SegmentedControls;
var Text = React.Text;
var View = React.View;
var TextInput = React.TextInput;
var PropTypes = React.PropTypes;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;
var freq = {
  'Hourly': 'hour',
  'Daily': 'day',
  'Weekly': 'week',
  'Monthly': 'month'
};

function Create (props) {
  return (
    <View style={styles.container}>
      <TextField
        title='What do you want to do?'
        onChange={function (text) { props.fields.action = text; }}
        defaultValue={props.fields.action}
      />
      <SubmitButton onClick={props.handleClick} />
      <View style={styles.tips}>
        <Text style={styles.tipheader}>Try to start small:</Text>
        <Text style={styles.tiptext}>* Floss one tooth</Text>
        <Text style={styles.tiptext}>* Walk for five minutes</Text>
        <Text style={styles.tiptext}>* Do one pushup</Text>
      </View>
    </View>
  );
}

// Sub-component of Create
function TextField (props) {
  return (
    <View>
      <Text style={styles.welcome}>
        {props.title}
      </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={props.onChange}
        defaultValue={props.defaultValue}
        placeholder={'Create your new habit!'}
        autoFocus={true}
      />
    </View>
  );
}

// Sub-component of Create
function Frequency (props) {
  return (
    <View style={styles.radio}>
      <Text style={styles.welcome}>
        {props.title}
      </Text>
      <SegmentedControls
        onSelection={props.onSelection}
        selectedOption={props.selectedOption}
        options={props.options}
        tint={props.tint}
        selectedTint={props.selectedTint}
      />
    </View>
  );
}

// Sub-component of Create
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
  radio: {
    width: 325,
    marginTop: 18,
    marginBottom: 15,
    alignSelf: 'center'
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF'
  },
  textInput: {
    height: 35,
    width: 250,
    padding: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#6399DC',
    color: '#6399DC',
    borderWidth: 0,
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
  },
  tips: {
    alignSelf: 'center',
    width: 250,
    marginTop: 75,
  },
  tipheader: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  tiptext: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  }
});

module.exports.Create = Create;
module.exports.TextField = TextField;
module.exports.Frequency = Frequency;
module.exports.SubmitButton = SubmitButton;
