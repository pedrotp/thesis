var Habits = require('../db/models').Habits;
var Instances = require('../db/models').Instances;
var User = require('../db/models').User;

var getHabits = function (email, success, fail) {
  User.findOne({ 'email': email })
    .then(function (user) {
      return Habits.findById(user.habitsId);
    })
    .then(function (habits) {
      success(habits.store);
    })
    .catch(function (err) {
      fail(err);
    });
};

var addHabit = function (email, habitDetails, success, fail) {

  // Manual error handling for partial
  // habitDetails (missing required fields)
  // if (Object.keys(habitDetails).length < 2) {
  //   return fail('Required field(s) missing');
  // }

  User.findOne({ 'email': email })
    .then(function (user) {
      return Habits.findById(user.habitsId);
    })
    .then(function (habits) {
      var habit = habits.store.create(habitDetails);
      var instances = new Instances;
      habit.instancesId = instances.id;

      // instances.save() is async but we aren't doing anything further
      // with instances so we can move on without waiting for completion
      instances.save();
      habits.store.push(habit);
      habits.save();
      return habit;
    })
    .then(function (newHabit) {
      success(newHabit);
    })
    .catch(function (err) {
      fail(err);
    });
};

var deleteHabit = function (email, habitId, success, fail) {
  User.findOne({ 'email': email })
    .then(function (user) {
      return Habits.findById(user.habitsId);
    })
    .then(function (habits) {
      var habit = habits.store.id(habitId);
      Instances.findByIdAndRemove(habit.instancesId, null, function (err, success) {
        if (err) {
          console.error(err);
        }
      });
      habits.store.pull({ '_id': habitId });
      habits.save();
      return habit;
    })
    .then(function (deletedHabit) {
      success(deletedHabit);
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
      var habit = habits.store.id(habitid);
      if (habitDetails.action) {
        habit.action = habitDetails.action;
      }
      if (habitDetails.frequency) {
        habit.frequency = habitDetails.frequency;
      }
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
      var habit = habits.store.id(habitid)
      Instances.findById(habit.instancesId)
        .then(function (instances) {
          var instance = instances.store.create({});
          instances.store.push(instance);
          return instances.save();
        })
        .then(function (instances) {
          var created = instances.store[instances.store.length - 1].createdAt;
          habit.instanceCount = instances.store.length;
          habit.lastDone = created;
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
      if (dbUser.habitsId === undefined) {
        var habits = new Habits;
        dbUser.habitsId = habits.id;

        // habits.save() is async but we aren't doing anything further
        // with habits so we can move on without waiting for completion
        habits.save();
      }
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
