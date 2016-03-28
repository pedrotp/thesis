// Setup for compilation of third-party react-native dependencies
var fs = require('fs');
var path = require('path');

function getBabelRC() {
  var rcpath = path.join(__dirname, '..', 'thesis/.babelrc');
  var source = fs.readFileSync(rcpath).toString();
  return JSON.parse(source);
}

var config = getBabelRC();

config.ignore = function(filename) {
    // if not in node_modules, we want to compile it
  if (!(/\/node_modules\//).test(filename)) {
    return false;
    // its RN source code, so we want to compile it
  } else if ((/\/node_modules\/react-native\//).test(filename)) {
    return false;
    // it's in node modules and NOT RN source code
  } else {
    var modulesToCompile = [
      "react-native-radio-buttons",
      "react-native-swipeout",
      "react-native-button",
      "react-native-refreshable-listview",
      "react-native-swiper",
      "react-native-vector-icons",
      "react-native-progress-bar"
    ];

    for (var i = 0; i < modulesToCompile.length; i++ ) {
      if(filename.includes(modulesToCompile[i])) {
        return false;
      }
    }
    return true;
  }
};

require("babel-register")(config);

global.__DEV__ = true;

// JSDOM required in order to use mount if not in browser environment
// Has to be run before react is first required
var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

// must be added before running any enzyme tests on react native
require("react-native-mock/mock");
