# Better

> Get Better.

## Team

  - __Product Owner__: Pedro Torres-Picon
  - __Scrum Master__: Justin Bitely
  - __Development Team Members__: Pierre Teo Jun Sheng, Derek Huang

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Once the application is up and running on Xcode's iOS simulator, simply follow the on-boarding process to get started on your very first habit!

## Requirements

- Node 4.4.0
- npm 3.8.1
- Xcode 7.3
- react-native-cli 0.1.10
- mongodb 2.1.7

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

From the ios directory:

```sh
pod install
```

Once all dependencies are finished installing, set the `localServer` flag on line 17 in `index.ios.js` to `true`. This enables development on http://localhost:3000. Then enter:

```sh
mongod
npm run local
react-native start
react-native run-ios
```
This will start up Xcode's iOS simulator.

React Native makes it incredibly easy to develop as you would in a web browser. When any changes are made, simply hit `CMD + R` (on Mac) to reload with your changes.

To run tests, simply enter

```sh
npm test
```
At the moment, all loggers are suppressed when running tests. If you would like to allow logging, comment out the `process.env.NODE_ENV` assignment on line 2 in both `DbSpec.js` and `ServerSpec.js` files.

### Roadmap

View the project roadmap [here](https://github.com/hrr12-thundercats/thesis/issues)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
