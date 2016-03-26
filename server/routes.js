var jwt = require('express-jwt');
var helpers = require('./helpers');
var sms = require('./sms');

// For suppressing (purposeful) error logging in tests
var testing = process.env.NODE_ENV === 'test';

var jwtCheck = jwt({
  secret: new Buffer(process.env.AUTH_SECRET, 'base64'),
  audience: process.env.AUTH_ID
});

// Routes requiring auth for use
var authReqRoutes = [
  '/habits',
  '/user',
  '/sms'
];

var routes = [
  {
    path: '/user',
    post: function (req, res) {
      var userEmail = req.body.email;
      helpers.addUser(userEmail)
        .then(function (user) {
          res.status(200).json(user);
        })
        .catch(function (err) {
          if (!testing) {
            console.error('Server error:', err)
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
      helpers.getHabits(userEmail)
        .then(function (habits) {
          res.status(200).json(habits);
        })
        .catch(function (err) {
          if (!testing) {
            console.error('Server error:', err)
          }
          res.sendStatus(400);
        });
    },
    post: function (req, res) {
      var userEmail = req.params.user;
      var habit = req.body;
      if (habit.action) {
        helpers.addHabit(userEmail, habit)
        .then(function (habit) {
          res.status(201).json(habit);
        })
        .catch(function (err) {
          if (!testing) {
            console.error('Server error:', err)
          }
          res.sendStatus(400);
        });
      } else {
        res.sendStatus(400);
      }
    }
  },
  {
    path: '/habits/:user/:habitid',
    get: function (req, res) {
      var userEmail = req.params.user;
      var habitid = req.params.habitid;
      helpers.getInstances(userEmail, habitid,
        function (data) {
          res.status(200).json(data);
        },
        function (err) {
          if (!testing) {
            console.error('Server error:', err);
          }
          res.status(400);
        });
    },
    post: function (req, res) {
      var userEmail = req.params.user;
      var habitid = req.params.habitid;
      helpers.toggleInstance(userEmail, habitid)
        .then(function (instance) {
          res.status(201).json(instance);
        })
        .catch(function (err) {
          if (!testing) {
            console.error('Server error:', err)
          }
          res.sendStatus(400);
        });
    },
    put: function (req, res) {
      var userEmail = req.params.user;
      var habitid = req.params.habitid;
      var habitDetails = req.body;
      helpers.updateHabit(userEmail, habitid, habitDetails)
        .then(function (habit) {
          res.status(200).json(habit);
        })
        .catch(function (err) {
          if (!testing) {
            console.error('Server error:', err)
          }
          res.sendStatus(400);
        });
    },
    delete: function (req, res) {
      var userEmail = req.params.user;
      var habitid = req.params.habitid;
      helpers.deleteHabit(userEmail, habitid)
        .then(function (habit) {
          res.status(200).json(habit);
        })
        .catch(function (err) {
          if (!testing) {
            console.error('Server error:', err)
          }
          res.sendStatus(400);
        });
    }
  },
  {
    path: '/sms',
    post: function (req, res) {
      sms.send(req.body, function (err, received) {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        } else {
          res.status(200).send(received.sid);
        }
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
