
module.exports.addHabit = function (habit, success, fail) {
  Habit.create(habit, function (err, habit) {
    if(err) {
      fail(err);
    } else {
      success(habit);
    }
  });
};

module.exports.deleteHabit = function (id, success, fail) {
  Habit.findByIdAndRemove(id, function (err, habit) {
    if (err) {
      fail(err);
    } else {
      success(habit);
    }
  });
};