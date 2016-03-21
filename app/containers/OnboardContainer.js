var Swiper = require('react-native-swiper');

var React = require('react-native');
var View = React.View;
var Navigator = React.Navigator;
var OnboardPageOne = require('../components/OnboardPageOne');
var OnboardPageTwo = require('../components/OnboardPageTwo');
var Welcome = require('../components/Welcome');

var OnboardContainer = React.createClass({
    render: function () {
      return (
        <View style={{ flex: 1 }}>
          <Navigator
            renderScene={this.renderScene}
            navigator={this.props.navigator} />
        </View>
      );
    },
    renderScene: function (route, navigator) {
      return (
        <Swiper loop={false}>
          <OnboardPageOne />
          <OnboardPageTwo />
          <Welcome navigator={this.props.navigator} />
        </Swiper>
      );
    }
});

module.exports = OnboardContainer;