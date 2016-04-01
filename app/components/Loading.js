var React = require('react-native');
var Text = React.Text;
var View = React.View;
var StyleSheet = React.StyleSheet;

function Loading (props) {
  return(
    <View style={styles.container}>
      <Text style={styles.text}>BETTER.</Text>
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDBE40',
  },
  text: {
    fontSize: 60,
    fontWeight: '800',
    alignItems: 'center',
    color: '#FFFFFF',
  }
});

module.exports = Loading
