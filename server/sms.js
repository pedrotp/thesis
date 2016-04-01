// Twilio account details
var accountSid = 'ACffea5ad1485550ef8c9e959872a324bc';
var authToken = 'c9b33ec2cf3f9c04a10e44aabbe88cd5';
var Habits = require('../db/models').Habits;
var User = require('../db/models').User;
var moment = require('moment');

// require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);
var cronJob = require('cron').CronJob;

module.exports = {
  send: function (data, callback) {
    User.findById(data.userId)
      .then(function (user) {
        client.sendMessage({
          to: user.phoneNumber,
          from: '+18629022901',
          body: data.message,
        }, callback);
      });
  },
  schedule: function (data, time, habitId) {
    var weekArray = ['sun','mon','tue','wed','thu','fri','sat',];
    var alias = "";
    for (var i = 0; i < weekArray.length; i++) {
      var day = weekArray[i];
      if (time.days[day]) {
        alias = alias + ',' + day;
      }
    }
    alias = alias.substring(1);
    var _this = this;
    var job = new cronJob('0 ' + time.minute + ' ' + time.hour + ' * * ' + alias, function () {
      Habits.find({'store._id': habitId},{'store.$': 1})
        .then(function (habits) {
          var habit = habits[0].store[0];
          if (!moment().isSame(new Date(habit.lastDone), 'day')) {
            _this.send(data, function (err, message) {
              if (err) {
                console.error('SMS Send Error: ',err);
              } else {
                console.log('Message sent: ', message.body);
              }
            });
          }
        });
    }, null, true);
    return job;
  },
};
