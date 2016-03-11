var helpers = require('./helpers');

var routes = [{
  path: '/habits',
  get: function (req, res) {
    // query db for user's habits
    helpers.getHabits(
      // on success
      function (success) {
        res.json(success);
      },
      function (err) {
        console.error(err);
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
        console.error(err);
        res.sendStatus(400);
      });
  }
},
{
  path: '/habits/:habitid',
  put: function (req, res) {
    var habitid = req.params.habitid;
    var habitDetails = req.body.habitDetails;
    console.log('id', habitid);
    console.log('details', habitDetails);
    helpers.updateHabit(habitid, habitDetails, function (data) {
        console.log('got back', data, 'from updateHabit helper');
        res.send(data);
      },
      function (err) {
        console.err(err);
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
}];

module.exports = function (app, express) {

  routes.forEach(function (route) {
    for (var key in route) {
      if (key === 'path') {
        continue;
      }
      app[key](route.path, route[key]);
    }
  });
};
