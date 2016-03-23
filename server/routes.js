var jwt = require('express-jwt');
var helpers = require('./helpers');

// For suppressing (purposeful) error logging in tests
var testing = process.env.NODE_ENV === 'test';

var jwtCheck = jwt({
  secret: new Buffer(process.env.AUTH_SECRET, 'base64'),
  audience: process.env.AUTH_ID
});

// routes requiring auth for use
var authReqRoutes = [
  '/habits'
];

var routes = [
  {
    path: '/user',
    post: function (req, res) {
      var userEmail = req.body.email;
      helpers.addUser(userEmail,
        function (success) {
          res.status(200).json(success);
        },
        function (err) {
          if (!testing) {
            console.error('Server error:', err);
          }
          res.sendStatus(400);
        });
    }
  },
  {
    path: '/habits/:user',
    get: function (req, res) {
      var userEmail = req.params.user;
      // query db for user's habits
      helpers.getHabits(userEmail,
        function (success) {
          res.status(200).json(success);
        },
        function (err) {
          if (!testing) {
            console.error('Server error:', err);
          }
          res.sendStatus(400);
        });
    },
    post: function (req, res) {
      var userEmail = req.params.user;
      var habit = req.body;
      helpers.addHabit(userEmail, habit,
        function (data) {
          res.status(201).json(data);
        },
        function (err) {
          if (!testing) {
            console.error('Server error:', err);
          }
          res.sendStatus(400);
        });
    }
  },
  {
    path: '/habits/:user/:habitid',
    post: function (req, res) {
      var userEmail = req.params.user;
      var habitid = req.params.habitid;
      helpers.createInstance(userEmail, habitid,
        function (data) {
          res.status(201).json(data);
        },
        function (err) {
          if (!testing) {
            console.error('Server error:', err);
          }
          res.status(400);
        });
    },
    put: function (req, res) {
      var userEmail = req.params.user;
      var habitid = req.params.habitid;
      var habitDetails = req.body;
      helpers.updateHabit(userEmail, habitid, habitDetails,
        function (data) {
          res.status(200).json(data);
        },
        function (err) {
          if (!testing) {
            console.error('Server error:', err);
          }
          res.sendStatus(400);
        });
    },
    delete: function (req, res) {
      var userEmail = req.params.user;
      var habitid = req.params.habitid;
      helpers.deleteHabit(userEmail, habitid,
        function (data) {
          res.status(200).json(data);
        },
        function (err) {
          if (!testing) {
            console.error('Server error:', err);
          }
          res.sendStatus(500);
        });
    }
  }
];

module.exports = function (app, express) {
  // require auth on all routes in authReqRoutes
  // skip if we are testing
  if (!testing) {
    authReqRoutes.forEach(function (route) {
      app.use(route, jwtCheck);
    });
  }

  // export routes
  routes.forEach(function (route) {
    for (var key in route) {
      if (key === 'path') {
        continue;
      }
      app[key](route.path, route[key]);
    }
  });
};
