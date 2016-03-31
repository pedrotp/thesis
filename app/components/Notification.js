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
    if (this.props.icon) var icon = this.props.icon.substring(0);
    if (this.props.name) var name = this.props.name.substring(0);

    return (
      <Animated.View style={[Notification.styles.container, {opacity: this.state.opacityValue}]}>
        <Animated.View style={[Notification.styles.contents, {opacity: this.state.opacityValue}]}>
          <Animated.Text style={[Notification.styles.alertTitle, {opacity: this.state.opacityValue}]}>You crushed a badge!</Animated.Text>
          <Animated.Image style={[Notification.styles.alertImage, {opacity: this.state.opacityValue}]} source={{uri: icon }} />
          <Animated.Text style={[Notification.styles.alertText, {opacity: this.state.opacityValue}]}>{name}</Animated.Text>
        </Animated.View>
      </Animated.View>
    );
  },
});

Notification.propTypes = {
  visible: PropTypes.bool,
  icon: PropTypes.string,
  name: PropTypes.string
};

Notification.defaultProps = {
  visible: false,
};

Notification.fadeTime = 600;
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
    opacity: Notification.minOpacity
  },
  alertTitle: {
    fontSize: 16,
    color: '#6b6b6b',
    fontWeight: 'bold',
    marginBottom: 5,
    opacity: Notification.minOpacity
  },
  alertText: {
    fontSize: 14,
    color: '#6b6b6b',
    marginTop: 5,
    opacity: Notification.minOpacity
  },
  alertImage: {
    height: 70,
    width: 70,
    opacity: Notification.minOpacity
  }
};

module.exports = Notification;