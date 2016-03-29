var mongoose = require('mongoose');
require('mongoose-function')(mongoose);

// Instance
var instanceSchema = mongoose.Schema({
  note: { type: String, default: '' }
}, { timestamps: true });

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
    active: { type: Boolean, default: false },
    time: { type: Date, default: Date.now() },
    days: { type: String },
    stop: { type: Function }
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
  userName: { type: String },
  habitsId: { type: mongoose.Schema.Types.ObjectId, ref: Habits },
  phoneNumber: { type: String },
  badges: { type: Array, default: [] },
  newUser: { type: Boolean, default: true }
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
