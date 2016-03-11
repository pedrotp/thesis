var mongoose = require('mongoose');

var habitSchema = mongoose.Schema({
  action: { type: String, required: true }, // name of the activity habit
  frequency: { type: String, required: true }, // how often user wants to do the action
  unit: { type: String, default: 'Units' }, // units used to measure habit
  currentGoal: { type: Number, default: 1 }, // amount of units the user is currently trying to perform
  schedule: { type: String }, // when in the desired frequency (mornings, weekends, etc)
  instances: [] // all the times a user has performed this action
});

module.exports = {
  habit: mongoose.model('Habit', habitSchema)
};