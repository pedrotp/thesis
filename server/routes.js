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
  '/habits',
  '/done'
]

var routes = [
  {
    path: '/habits',
    get: function (req, res) {
      // query db for user's habits
      helpers.getHabits(
        function (success) {
          res.json(success);
        },
        function (err) {
          if (!testing) {
            console.error('Server error:', err);
          }
          res.sendStatus(400);
        });
    },
    post: function (req, res) {
      var habit = req.body;
      helpers.addHabit(habit,
        function (data) {
          res.status(201).send(data);
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
    path: '/habits/:habitid',
    post: function (req, res) {
      var habitid = req.params.habitid;
      helpers.createInstance(habitid,
        function (data) {
          res.status(201).send(data);
        },
        function (err) {
          if (!testing) {
            console.error('Server error:', err);
          }
          res.status(400);
        });
    },
    put: function (req, res) {
      var habitid = req.params.habitid;
      var habitDetails = req.body;
      helpers.updateHabit(habitid, habitDetails,
        function (data) {
          res.status(200).send(data);
        },
        function (err) {
          if (!testing) {
            console.error('Server error:', err);
          }
          res.sendStatus(400);
        });
    },
    delete: function (req, res) {
      var habitid = req.params.habitid;
      helpers.deleteHabit(habitid,
        function (data) {
          res.status(202).send(data);
        },
        function (err) {
          if (!testing) {
            console.error('Server error:', err);
          }
          res.sendStatus(500);
        });
    }
  },
  {
    path: '/done/:habitid',
    get: function (req, res) {
      var habitid = req.params.habitid;
      helpers.isDone(habitid,
        function (done) {
          res.send(done);
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
  authReqRoutes.forEach(function (route) {
    app.use(route, jwtCheck)
  })

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
