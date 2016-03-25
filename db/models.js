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
  frequency: { type: String }, // how often user wants to do the action (year, month, week, day, hour)
  instancesId: { type: mongoose.Schema.Types.ObjectId, ref: Instances }, // all the times a user has performed this action
  instanceCount: { type: Number, default: 0 },
  streak: {
    current: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
    maxDate: { type: Date }
  },
  lastDone: { type: Date },
  reminder: {
    set: { type: Boolean, default: false },
    time: { type: Date }
  }
},
{
  timestamps: true
});

var habitsSchema = mongoose.Schema({
  store: [habitSchema]
});
var Habits = mongoose.model('Habits', habitsSchema);

// Users
var userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  fullName: { type: String },
  habitsId: { type: mongoose.Schema.Types.ObjectId, ref: Habits }
},
{
  timestamps: true
});
var User = mongoose.model('User', userSchema);

module.exports = {
  Habits: Habits,
  Instances: Instances,
  User: User
};
