var Habit = require('../db/models').Habit;
var Instances = require('../db/models').Instances;
var User = require('../db/models').User;

var getHabits = function (success, fail) {
  Habit.find({})
    .then(function (data) {
      success(data);
    })
    .catch(function (err) {
      fail(err);
    });
};

var addHabit = function (habit, success, fail) {
  Habit.create(habit)
    .then(function (data) {
      var instances = new Instances;
      data.instancesId = instances.id;
      instances.save();
      data.save();
      success(data);
    })
    .catch(function (err) {
      fail(err);
    });
};

var deleteHabit = function (id, success, fail) {
  Habit.findByIdAndRemove(id)
    .then(function (data) {
      success(data);
    })
    .catch(function (err) {
      fail(err);
    });
};

var updateHabit = function (habitid, habitDetails, success, fail) {
  Habit.findByIdAndUpdate(habitid, habitDetails, {new: true})
    .then(function (habit) {
      success(habit);
    })
    .catch(function (err) {
      console.error(err);
      fail(err);
    });
};

var createInstance = function (habitid, success, fail) {
  Habit.findById(habitid)
    .then(function (habit) {
      return Instances.findById(habit.instancesId);
    })
    .then(function (instances) {
      var instance = instances.store.create({});
      instances.store.push(instance);
      instances.save();
      return instance;
    })
    .then(function (instance) {
      success(instance);
    })
    .catch(function (err) {
      console.error(err);
      fail(err);
    });
};

module.exports = {
  updateHabit: updateHabit,
  addHabit: addHabit,
  deleteHabit: deleteHabit,
  getHabits: getHabits,
  createInstance: createInstance
};
