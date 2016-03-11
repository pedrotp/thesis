var app = require('../server.js');
var helpers = require('./helpers.js');

var routes = [
  {
    path: '/habits',
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
      Habit.findByIdAndRemove(req.params.id, function (err, habit) {
        if (err) {
          console.error('Server error: ', err);
          res.sendStatus(500);
        } else {
          res.send('Habit removed.');
        }
      });
    }
  }
];