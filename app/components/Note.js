var React = require('react-native');
var View = React.View;
var Text = React.Text;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;
var Modal = React.Modal;

var moment = require('moment');
var Button = require('react-native-button');

var Note = React.createClass({
  getInitialState: function () {
    return {
      modalVisible: false
    };
  },
  
  setModalVisible: function (visible) {
    this.setState({modalVisible: visible});
  },
  
  handleRequestClose: function () {
    this.setModalVisible(false);
  },
  
  componentWillReceiveProps: function (nextProps) {
    console.log('fish')
    this.setState({
      modalVisible: nextProps
    });
    this.render();
  },
  
  render: function () {
    console.log('NOTESTATE:', this.state);
    var modalBackgroundStyle = {backgroundColor: 'rgba(0, 0, 0, 0.5)'};
    var innerContainerTransparentStyle = {backgroundColor: '#fff', padding: 20};

    return (
      <View>
        <Modal 
          animated={true}
          transparent={true}
          visible={this.state.modalVisible} 
          onRequestClose={this.handleRequestClose}>
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
              <Text>Hello World</Text>
              <Button 
                onPress={ function(){this.setModalVisible(false);} }
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
      padding: 20
    },
    innerContainer: {
      borderRadius: 10,
      alignItems: 'center'
    },
    modalButton: {
      marginTop: 10
    }
});

module.exports = Note;