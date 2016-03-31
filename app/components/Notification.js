var React = require('react-native');
var Component = React.Component,
    PropTypes = React.PropTypes,
    Text = React.Text,
    Animated = React.Animated,
    Dimensions = React.Dimensions,
    View = React.View;

var Screen = Dimensions.get('window');

var Notification = React.createClass({

  getInitialState: function () {
    return {
      opacityValue: new Animated.Value(Notification.minOpacity),
    };
  },

  componentDidMount: function () {
    if (this.props.visible) {
      this.fadeIn();
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.visible && !this.props.visible) {
      this.fadeIn();
    } else {
      if (!nextProps.visible && this.props.visible) {
        this.fadeOut();
      }
    }
  },

  shouldComponentUpdate: function (nextProps) {
    // TODO: Compare the messages with each other
    /* if (this.props.message !== nextProps.message) {
      return true;
    }*/

    if (this.props.visible !== nextProps.visible) {
      return true;
    }

    // TODO: Is there a reliable way not use `__getValue` and something else that may not be as unstable
    if (this.state.opacityValue.__getValue() !== this.state.opacityValue.__getValue()) {
      return true;
    }

    return false;
  },

  fadeIn: function () {
    Animated.timing(this.state.opacityValue, {
      duration: Notification.fadeTime,
      toValue: Notification.maxOpacity,
    }).start();
  },

  fadeOut: function () {
    Animated.timing(this.state.opacityValue, {
      duration: Notification.fadeTime,
      toValue: Notification.minOpacity,
    }).start();
  },

  render: function () {
    var contents = this.props.children;

    if (!contents) {
      return null;
    }

    return (
      <Animated.View style={[Notification.styles.container, {opacity: this.state.opacityValue}]}>
        <View style={Notification.styles.contents}>{contents}</View>
      </Animated.View>
    );
  },
});

Notification.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
};

Notification.defaultProps = {
  visible: true,
};

Notification.fadeTime = 500;
Notification.minOpacity = 0.0;
Notification.maxOpacity = 0.9;

Notification.styles = {
  container: {
    position: 'absolute',
    top: Screen.height * .2,
    width: Screen.width - 120,
    left: 60,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    padding: 6,
    opacity: Notification.minOpacity,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  contents: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
};

module.exports = Notification;