var helpers = require('./helpers');

var routes = [
  {
    path: '/habits',
    get: function (req, res) {
      // query db for user's habits
      helpers.getHabits(
      // on success
      function (success) {
        res.json(success);
      },
      // on Error
        // console.error(err);
        // res.sendStatus(400);
    },
    post: function(req, res) {
      var habit = req.body;
      helpers.addHabit(habit,
      function(data) {
        res.status(201).send(data);
      },
      function (err) {
        console.error(err);
        res.sendStatus(400);
      });
    },
    delete: function (req, res) {
      helpers.deleteHabit(req.params.id, function () {
        console.error('Server error: ', err);
        res.sendStatus(500);
      }, function () {
        res.send('Habit removed.');
      });
    }
  }
];
