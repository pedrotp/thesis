var Habits = require('../db/models').Habits;
var Instances = require('../db/models').Instances;
var User = require('../db/models').User;
var Badges = require('./badgeHelpers');
var moment = require('moment');
var sms = require('./sms');

var getHabits = function (email) {
  return User.findOne({ 'email': email })
    .then(function (user) {
      return Habits.findById(user.habitsId)
    })
    .then(function (habits) {
      return habits.store;
    });
};

var addHabit = function (email, habitDetails) {
  var user;
  return User.findOne({ 'email': email })
    .then(function (foundUser) {
      user = foundUser;
      // Error has to be thrown inside the success function
      // in order to be caught by catch in routes.js
      if (!habitDetails.action) {
        throw new Error('Required field missing');
      }
      return Habits.findById(foundUser.habitsId);
    })
    .then(function (habits) {
      if (habits.store.length === 0 && user.newUser === true) {
        user.newUser = false;

        // user is saved in awardBadge
        var toast = Badges.awardBadge(user, 'First Step');
      }
      var habit = habits.store.create(habitDetails);
      var instances = new Instances;
      habit.instancesId = instances.id;
      // instances.save() is async but we aren't doing anything further
      // with instances so we can move on without waiting for completion
      instances.save();
      habits.store.push(habit);
      habits.save();
      return {
        toast: toast,
        habit: habit
      }
    })
};

var deleteHabit = function (email, habitId) {
  return User.findOne({ 'email': email })
    .then(function (user) {
      return Habits.findById(user.habitsId);
    })
    .then(function (habits) {
      var habit = habits.store.id(habitId);
      if (habit.reminder.active) {
        habit.reminder.stop();
      }
      Instances.findByIdAndRemove(habit.instancesId, null, function (err, success) {
        if (err) {
          console.error(err);
        }
      });
      habits.store.pull({ '_id': habitId });
      habits.save();
      return habit;
    })
};

var updateHabit = function (email, habitId, newHabit) {
  var userId;
  var oldHabit;
  return User.findOne({ 'email': email } )
    .then(function (user) {
      userId = user._id;
      return Habits.findById(user.habitsId);
    })
    .then(function (habits) {
      oldHabit = habits.store.id(habitId);
      if (!oldHabit) {
        throw new Error('Invalid habit ID');
      }
      var i = habits.store.indexOf(oldHabit);
      habits.store.set(i, newHabit);
      habits.save();
      return habits.store[i];
    })
    .then(function (habit) {
      if (!oldHabit.reminder.active && habit.reminder.active) {
        var job = sms.schedule({
          userId: userId,
          message: 'Time to ' + habit.action.toLowerCase() + '! - Better'
        },
        {
          hour: habit.reminder.time.getHours(),
          minute: habit.reminder.time.getMinutes(),
          days: habit.reminder.days || undefined
        }, habit._id);
        habit.set('reminder.stop', job.stop);
      } else if (oldHabit.reminder.active && !habit.reminder.active) {
        oldHabit.reminder.stop();
      } else if (!moment(new Date(oldHabit.reminder.time)).isSame(new Date(habit.reminder.time), 'second') || JSON.stringify(oldHabit.reminder.days) !== JSON.stringify(habit.reminder.days)) { //or days changed
        oldHabit.reminder.stop();
        var job = sms.schedule({
          userId: userId,
          message: 'Time to ' + habit.action.toLowerCase() + '! - Better'
        },
        {
          hour: habit.reminder.time.getHours(),
          minute: habit.reminder.time.getMinutes(),
          days: habit.reminder.days || undefined
        }, habit._id);
        habit.set('reminder.stop', job.stop);
      }
      return habit;
    });
};

var updateUser = function (email, updates) {
  return User.findOneAndUpdate({ 'email': email }, updates, { 'new': true })
    .then(function (user) {
      return user;
    });
};

// TODO: possibly refactor with getHabits since getUser is
// making the same queries but returning different data
var getUser = function (email) {
  var user;
  return User.findOne({ 'email': email })
    .then(function (foundUser) {
      user = foundUser;
      return Habits.findById(user.habitsId)
    })
    .then(function (habits) {
      return {
        user: user,
        habits: habits.store
      };
    });
};

var toggleInstance = function (email, habitId) {
  var removed;
  return User.findOne({ 'email': email })
    .then(function (user) {
      return Habits.findById(user.habitsId);
    })
    .then(function (habits) {
      // get the specific habit from the user's collection of habits
      var habit = habits.store.id(habitId);
      if (!habit) {
        throw new Error('Invalid habit ID');
      }
      return Instances.findById(habit.instancesId)
        .then(function (instances) {
          var last = instances.store[instances.store.length - 1];
          if (last && moment().isSame(new Date(last.createdAt), 'day')) {
            last.remove();
            removed = true;
            return instances.save();
          } else {
            var instance = instances.store.create({});
            instances.store.push(instance);
            return instances.save();
          }
        })
        .then(function (instances) {
          if (instances.store.length) {
            var last = instances.store[instances.store.length - 1].createdAt;
            // set instance count to the length of the instances array
            habit.instanceCount = instances.store.length;
            // set lastDone to the date of the last instance
            habit.lastDone = last;
            var second = undefined;
            if (instances.store.length > 1) {
              // store the second to last instance in a variable if it exists
              second = instances.store[instances.store.length - 2].createdAt;
            }
            if (removed) {
              // if an instance was removed decrease current streak and max streak only if this week is max
              if (habit.streak.max === habit.streak.current && moment().isSame(new Date(habit.streak.maxDate), 'week')) {
                habit.streak.max--;
              }
              habit.streak.current--;
            } else if (second && moment(new Date(last)).isSame(new Date(second), 'week')) {
              // if an instance was added and it happened the same week as the second to last instance, increase current streak
              habit.streak.current++;
            } else {
              // if the new instance did not happen the same week as the second to last instance, or there is only one instance, set current streak to 1
              habit.streak.current = 1;
            }
            if (habit.streak.current > habit.streak.max) {
              // if current streak is max, update max and store the date the max was achieved
              habit.streak.max = habit.streak.current;
              habit.streak.maxDate = last;
            }
            habits.save();

            // check if this instance triggers any badges earned
            return Badges.checkBadges(email, habit, habits)
              .then(function (earnedBadge) {
                return {
                  instance: instances.store[instances.store.length - 1],
                  toast: earnedBadge
                };
              });

          } else {
            habit.streak.max = 0;
            habit.instanceCount = 0;
            habit.lastDone = undefined;
            habit.streak.current = 0;
            habits.save();
            return { empty: true };
          }
        })
    })
};

var addUser = function (email, userName) {
  // findOneAndUpdate along with upsert set to true
  // allows for a user to be created if they don't exist
  return User.findOneAndUpdate(
    { 'email': email },
    { 'email': email, 'userName': userName },
    { 'upsert': true, 'new': true })
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
};

var getInstances = function (email, habitid, success, fail) {
  return User.findOne({ 'email': email } )
    .then(function (user) {
      return Habits.findById(user.habitsId);
    })
    .then(function (habits) {
      var habit = habits.store.id(habitid);
      if (!habit) {
        throw new Error('Invalid habit ID');
      }
      return Instances.findById(habit.instancesId);
    })
    .then(function (instances) {
      return instances.store;
    })
};

var getInstance = function (email, habitid, instanceid) {
  return User.findOne({ 'email': email })
    .then(function (user) {
      return Habits.findById(user.habitsId);
    })
    .then(function (habits) {
      var habit = habits.store.id(habitid);
      if(!habit) {
        throw new Error('Invalid habit ID');
      }
      return Instances.findById(habit.instancesId);
    })
    .then(function (instances) {
      var instance = instances.store.id(instanceid);
      if(!instance) {
        throw new Error('Invalid instance ID');
      }
      return instance;
    });
};

var updateInstance = function (email, habitid, instanceid, instanceNote) {
  return User.findOne({ 'email': email })
    .then(function (user) {
      return Habits.findById(user.habitsId);
    })
    .then(function (habits) {
      var habit = habits.store.id(habitid);
      if (!habit) {
        throw new Error('Invalid habit ID');
      }
      return Instances.findById(habit.instancesId);
    })
    .then(function (instances) {
      var instance = instances.store.id(instanceid);
      if (!instance) {
        throw new Error('Invalid instance ID');
      }
      instance.note = instanceNote.note;
      instances.save();
      return instance;
    });
};

module.exports = {
  updateHabit: updateHabit,
  addHabit: addHabit,
  deleteHabit: deleteHabit,
  getHabits: getHabits,
  updateUser: updateUser,
  toggleInstance: toggleInstance,
  addUser: addUser,
  getUser: getUser,
  getInstances: getInstances,
  getInstance: getInstance,
  updateInstance: updateInstance
};
