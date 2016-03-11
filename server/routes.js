var helpers = require('./helpers');

var routes = [
  {
    path: '/habits',
    get: function (req, res) {
      // query db for user's habits
      // on success
        // res.json(data);
      // on Error
        // console.error(err);
        // res.statusCode(500);
    },
    post: function(req, res) {
      var habit = req.body;
      helpers.addHabit(habit, function(data) {
            res.status(201).send(data);
          },
          function(error) {
            console.error(error);
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
