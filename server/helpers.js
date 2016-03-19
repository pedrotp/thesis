var Habit = require('../db/models').Habit;
var Instances = require('../db/models').Instances;
var User = require('../db/models').User;
var moment = require('moment');

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
  if (habit.currentGoal) {
    habit.currentGoal = parseInt(habit.currentGoal);
  }
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
  var instanceId;
  Habit.findByIdAndRemove(id)
    .then(function (data) {
      instanceId = data.instancesId;
      return Instances.findByIdAndRemove(instanceId);
    })
    .then(function (deletedInstance) {

      // deletedIds obj allows for both the deleted habit ID
      // as well as the deleted instance ID to be sent back
      var deletedIds = {
        habitId: id,
        instanceId: deletedInstance._id
      };
      success(deletedIds);
    })
    .catch(function (err) {
      fail(err);
    });
};

var updateHabit = function (habitid, habitDetails, success, fail) {
  if (habitDetails.currentGoal) {
    habitDetails.currentGoal = parseInt(habitDetails.currentGoal);
  }
  Habit.findByIdAndUpdate(habitid, habitDetails, {new: true})
    .then(function (habit) {
      success(habit);
    })
    .catch(function (err) {
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
      fail(err);
    });
};

var isDone = function (habitid, success, fail) {
  Habit.findById(habitid)
    .then(function (habit) {
      Instances.findById(habit.instancesId)
        .then(function (instances) {
          var last = instances.store[instances.store.length - 1].createdAt;
          var now = new Date();
          var freq = habit.frequency;
          success(moment(last).isSame(now, freq));
        });
    })
    .catch(function (err) {
      fail(err);
    });
};

module.exports = {
  updateHabit: updateHabit,
  addHabit: addHabit,
  deleteHabit: deleteHabit,
  getHabits: getHabits,
  createInstance: createInstance,
  isDone: isDone
};
