var db = require('db');

module.exports = {

  getHabits: function (success, fail) {
    db.Habits.find({})
    .then(function (data) {
      success(data);
    })
    .catch(function (err) {
      fail(err);
    });
  },

  addHabit = function (habit, success, fail) {
    Habit.createHabit(habit, function (err, habit) {
      if(err) {
        fail(err);
      } else {
        success(habit);
      }
    });
  },

  deleteHabit = function (id, success, fail) {
    Habit.findByIdAndRemove(id, function (err, habit) {
      if (err) {
        fail(err);
      } else {
        success(habit);
      }
    });
  }

};
