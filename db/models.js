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
  instancesId: { type: mongoose.Schema.Types.ObjectId, ref: Instances }, // all the times a user has performed this action
  instanceCount: { type: Number, default: 0 },
  lastDone: { type: Date },
},
{
  timestamps: true
});

// var Habit = mongoose.model('Habit', habitSchema);

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

// instancesSchema.post('save', function (doc) {
//   console.log("instancesSchema post:", doc);
//   if (doc.store.length) {
//     Habit.findOneAndUpdate({ instancesId: doc._id }, { instanceCount: doc.store.length, lastDone: doc.store[doc.store.length - 1].createdAt })
//       .then(function (success) {})
//       .catch(function (err) {
//         console.error(err);
//       });
//   } else {
//     Habit.findOneAndUpdate({ instancesId: doc._id }, { instanceCount: 0 })
//       .then(function (success) {})
//       .catch(function (err) {
//         console.error(err);
//       });
//   }
// });


module.exports = {
  Habits: Habits,
  // Habit: Habit,
  Instances: Instances,
  User: User
};
