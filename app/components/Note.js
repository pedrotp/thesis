// React Native components
var React = require('react-native');
var View = React.View;
var Text = React.Text;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;
var Modal = React.Modal;
var TextInput = React.TextInput;

// external libraries and components
var moment = require('moment');
var Button = require('react-native-button');
var Icon = require('react-native-vector-icons/FontAwesome');

// custome components and methods
var api = require('../lib/api');

var Note = React.createClass({
  getInitialState: function () {
    return {
      modalVisible: false,
      instanceId: null,
      rowData: null,
      date: null,
      note: { note: '' },
    };
  },

  componentWillReceiveProps: function (props) {
    this.setState({
      modalVisible: props.visible,
      instanceId: props.instanceId,
      rowData: props.rowData,
      date: props.date,
      note: props.note,
    });
  },

  updateHabit: function () {
    fetch(process.env.SERVER + '/habits/' + this.props.profile.email + '/' + this.props.habit._id + '/' + this.props.instanceId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.token.idToken
      },
      body: JSON.stringify(this.state.note)
    })
    .then(api.handleErrors)
    .then((function (response) {
      this.props.hideModal();
    }).bind(this))
    .then((function () {
      this.props.getRowData();
    }).bind(this))
    .catch(function (err) {
      console.warn(err);
    });
  },

  handleUpdate: function () {
    this.updateHabit();
  },

  handleClearText: function () {
    this.setState({
      note: { note: ''},
    })
  },

  handleDeleteNote: function () {
    this.handleClearText();
    this.handleUpdate();
  },

  onTextChange: function (text) {
    this.setState({
      note: { note: text },
    });
  },

  render: function () {
    var modalBackgroundStyle = {backgroundColor: 'rgba(0, 0, 0, 0.5)'};
    var innerContainerTransparentStyle = {backgroundColor: '#fff', padding: 20};
    return (
      <View>
        <Modal
          animated={true}
          transparent={true}
          visible={this.state.modalVisible} >
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
              <Text style={{fontSize: 15, marginBottom: 20}}>{moment(this.props.date).format('MMMM Do YYYY')}</Text>
              <TextInput
                style={{height: 250, width: 300, fontSize: 18, borderColor: 'white', borderWidth: 1}}
                defaultValue={this.state.note.note}
                autoFocus={true}
                placeholder="Write a note.."
                onChangeText={this.onTextChange}
                multiline={true}
                maxLength={200}
              />
              <View style={styles.formControls}>
                <TouchableOpacity style={styles.modalButton} onPress={this.handleUpdate}>
                  <Icon name='save' size={25} color='#ffffff' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={this.handleClearText}>
                  <Icon name='times-circle-o' size={25} color='#ffffff' />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.deleteButton]} onPress={this.handleDeleteNote}>
                  <Icon name='trash-o' size={25} color='#ffffff' />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    innerContainer: {
      borderRadius: 10,
      height: 400,
      alignItems: 'center',
    },
    modalButton: {
      marginHorizontal: 5,
      padding: 10,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#6399DC",
    },
    deleteButton: {
      backgroundColor: "red",
    },
    formControls: {
      flexDirection: 'row',
    }
});

module.exports = Note;
