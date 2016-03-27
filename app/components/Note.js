var React = require('react-native');
var View = React.View;
var Text = React.Text;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;
var Modal = React.Modal;
var TextInput = React.TextInput;

var moment = require('moment');
var Button = require('react-native-button');

var Note = React.createClass({
  getInitialState: function () {
    return {
      modalVisible: false
    };
  },
  
  hideModal: function () {
    this.setState({modalVisible: false});
  },
  
  componentWillReceiveProps: function (props) {
    this.setState({
      modalVisible: props.visible
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
              <Text></Text>
              {// <TextInput
              //   style={styles.heading}
              //   defaultValue={this.props.habit.action}
              //   onChangeText={this.onTextChange}
              // />
            }
              <Button 
                onPress={this.hideModal}
                style={styles.modalButton}>
                Close
              </Button>
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
      alignItems: 'center'
    },
    modalButton: {
      marginTop: 10
    }
});

module.exports = Note;