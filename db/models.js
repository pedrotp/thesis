var mongoose = require('mongoose');

// Instance
var instanceSchema = mongoose.Schema({}, { timestamps: true });


// Instance store
var instancesSchema = mongoose.Schema({
  store: [instanceSchema]
});
var Instances = mongoose.model('Instances', instancesSchema);


// Habits
var habitSchema = mongoose.Schema({
  action: { type: String, required: true }, // name of the activity habit
  frequency: { type: String, required: true }, // how often user wants to do the action (year, month, week, day, hour)
  unit: { type: String, default: 'Units' }, // units used to measure habit
  currentGoal: { type: Number, default: 1 }, // amount of units the user is currently trying to perform
  schedule: { type: String }, // when in the desired frequency (mornings, weekends, etc)
  instancesId: { type: mongoose.Schema.Types.ObjectId, ref: Instances }, // all the times a user has performed this action
  instanceCount: { type: Number, default: 0 }
},
{
  timestamps: true
});
var Habit = mongoose.model('Habit', habitSchema);


// Users
var userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  fullName: { type: String },
  habits: [habitSchema]
},
{
  timestamps: true
});
var User = mongoose.model('User', userSchema);


// Middleware
habitSchema.post('remove', function (doc) {
  var instanceId = doc.instancesId;
  Instances.findByIdAndRemove(instanceId)
    .then(function (success) {
      // console.log('Post habit instance deletion success:', success);
    })
    .catch(function (err) {
      console.error(err);
    });
});

instancesSchema.post('save', function (doc) {
  Habit.findOneAndUpdate({ instancesId: doc._id }, { instanceCount: doc.store.length })
    .then(function (success) {
      // console.log('Post instance creation habit update success:', success);
    })
    .catch(function (err) {
      console.error(err);
    });
});


module.exports = {
  Habit: Habit,
  Instances: Instances,
  User: User
};
