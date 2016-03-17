var React = require('react-native');
var Text = React.Text;
var View = React.View;
var StyleSheet = React.StyleSheet;

function Loading (props) {
  return(
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text>
    </View>
    )
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    alignItems: 'center',
  }
});

module.exports = Loading