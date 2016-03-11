module.exports.addHabit = function (habit, success, fail) {
  Habit.createHabit(habit, function (err, habit) {
    if(err) {
      fail(err);
    } else {
      success(habit);
    }
  });
};