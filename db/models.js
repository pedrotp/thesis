var mongoose = require('mongoose');

var instanceSchema = mongoose.Schema({}, { timestamps: true });

var instancesSchema = mongoose.Schema({
  store: [instanceSchema]
});

var Instances = mongoose.model('Instances', instancesSchema);

var habitSchema = mongoose.Schema({
  action: { type: String, required: true }, // name of the activity habit
  frequency: { type: String, required: true }, // how often user wants to do the action
  unit: { type: String, default: 'Units' }, // units used to measure habit
  currentGoal: { type: Number, default: 1 }, // amount of units the user is currently trying to perform
  schedule: { type: String }, // when in the desired frequency (mornings, weekends, etc)
  instancesId: { type: mongoose.Schema.Types.ObjectId, ref: Instances }, // all the times a user has performed this action
  instanceCount: { type: Number, default: 0 }
},
{
  timestamps: true
});

var userSchema = mongoose.Schema({
  username: { type: String, required: true },
  fullName: { type: String },
  habits: [habitSchema]
},
{
  timestamps: true
});

var Habit = mongoose.model('Habit', habitSchema);
var User = mongoose.model('User', userSchema);

instancesSchema.post('save', function (doc) {
  Habit.findOneAndUpdate({ instancesId: doc._id }, { instanceCount: doc.store.length })
    .then(function () {
      console.log('success');
    });
});

module.exports = {
  Habit: Habit,
  Instances: Instances,
  User: User
};
