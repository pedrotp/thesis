var Habits = require('../db/models').Habits;
var Instances = require('../db/models').Instances;
var User = require('../db/models').User;

var getHabits = function (email, success, fail) {
  User.findOne({ email: email })
    .then(function (user) {
      success(user.habits);
    })
    .catch(function (err) {
      fail(err);
    });
};

var addHabit = function (email, habitDetails, success, fail) {
  User.findOne({ 'email': email })
    .then(function (user) {
      return Habits.findById(user.habitsId);
    })
    .then(function (habits) {
      var habit = habits.store.create(habitDetails);
      habits.store.push(habit);
      habits.save();
      return habit;
    })
    .then(function (newHabit) {
      var instances = new Instances;
      newHabit.instancesId = instances.id;

      // instances.save() is async but we aren't doing anything further
      // with instances so we can move on without waiting for completion
      instances.save();
      return newHabit.save();
    })
    .then(function (newHabit) {
      success(newHabit);
    })
    .catch(function (err) {
      fail(err);
    });
};

var deleteHabit = function (email, habitId, success, fail) {
  User.findOneAndUpdate(
  // TODO: test if $pull triggers post 'remove' middleware
    { email: email }, { $pull: { 'habits': { _id: habitId } }}
  )
  .then(function (data) {
    success(data);
  })
  .catch(function (err) {
    fail(err);
  });
};

var updateHabit = function (email, habitid, habitDetails, success, fail) {
  User.findOne({ 'email': email } )
    .then(function (user) {
      return Habits.findById(user.habitsId);
    })
    .then(function (habits) {
      var habit;
      for (var i = 0; i < habits.store.length; i++) {
        if (habits.store[i]._id.toString() === habitid) {
          habit = habits.store[i];
          break;
        }
      }
      habit.action = habitDetails.action;
      habit.frequency = habitDetails.frequency;
      habits.save();
      return habit;
    })
    .then(function (updatedHabit) {
      success(updatedHabit);
    })
    .catch(function (err) {
      fail(err);
    });
};

var createInstance = function (email, habitid, success, fail) {
  User.findOne({ 'email': email } )
    .then(function (user) {
      return Habits.findById(user.habitsId);
    })
    .then(function (habits) {
      var habitIndex;
      for (var i = 0; i < habits.store.length; i++) {
        if (habits.store[i]._id.toString() === habitid) {
          habitIndex = i;
          break;
        }
      }
      Instances.findById(habits.store[habitIndex].instancesId)
        .then(function (instances) {
          var instance = instances.store.create({});
          instances.store.push(instance);
          return instances.save();
        })
        .then(function (instances) {
          var created = instances.store[instances.store.length - 1].createdAt;
          habits.store[habitIndex].instanceCount = instances.store.length;
          habits.store[habitIndex].lastDone = created;
          habits.save();
          return instances.store[instances.store.length - 1];
        })
        .then(function (instance) {
          success(instance);
        })
        .catch(function (err) {
          fail(err);
        });
    })
    .catch(function (err) {
      fail(err);
    });
};

var addUser = function (email, success, fail) {
  // findOneAndUpdate along with upsert set to true
  // allows for a user to be created if they don't exist
  User.findOneAndUpdate({ 'email': email }, { 'email': email }, { 'upsert': true, 'new': true })
    .then(function (dbUser) {
      var habits = new Habits;
      dbUser.habitsId = habits.id;

      // habits.save() is async but we aren't doing anything further
      // with habits so we can move on without waiting for completion
      habits.save();
      return dbUser.save();
    })
    .then(function (newUser) {
      success(newUser);
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
  addUser: addUser
};
