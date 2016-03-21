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
// var getHabits = function (email, success, fail) {
//   User.find({ email: email })
//     .then(function (user) {
//       success(user.habits);
//     })
//     .catch(function (err) {
//       fail(err);
//     });
// };

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
// var addHabit = function (email, habit, success, fail) {
//   if (habit.currentGoal) {
//     habit.currentGoal = parseInt(habit.currentGoal);
//   }
//   Habit.create(habit)
//     .then(function (data) {
//       return User.findOneAndUpdate(
//         { email: email }, { $push: { "habits": data }}
//       );
//     })
//     .then(function (data2) {
//       success(data2);
//     })
//     .catch(function (err) {
//       fail(err);
//     });
// };

var deleteHabit = function (id, success, fail) {
  Habit.find({ _id: id })
    .then(function (data) {

      // Mongoose post 'remove' middleware will
      // not trigger on remove() calls to Habit model
      return data[0].remove();
    })
    .then(function (data) {
      success(data);
    })
    .catch(function (err) {
      fail(err);
    });
};
// var deleteHabit = function (email, habitId, success, fail) {
//   User.findOneAndUpdate(
//   TODO: test if $pull triggers post 'remove' middleware
//     { email: email }, { $pull: { habits._id: habitId } }
//   )
//   .then(function (data) {
//     success(data);
//   })
//   .catch(function (err) {
//     fail(err);
//   });
// };

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
// var updateHabit = function (email, habitid, habitDetails, success, fail) {
//   if (habitDetails.currentGoal) {
//     habitDetails.currentGoal = parseInt(habitDetails.currentGoal);
//   }
//
//   // TODO: try 'habits.$' if 'habits.$.' doesn't work
//   // updates object allows for partial updates
//   var updates = {};
//   for (var key in habitDetails) {
//     updates['habits.$.' + key] = habitDetails[key];
//   }
//   User.findOneAndUpdate(
//     { email: email, habits._id: habitid }, { $set: updates }
//   )
//   .then(function (data) {
//     success(data);
//   })
//   .catch(function (err) {
//     fail(err);
//   });
// };

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

// TODO: modify as needed once user info is available
var addUser = function (email, success, fail) {
  User.create(email)
    .then(function (data) {
      success(data);
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
  isDone: isDone,
  addUser: addUser
};
