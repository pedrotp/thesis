var Habits = require('../db/models').Habits;
var Instances = require('../db/models').Instances;
var User = require('../db/models').User;

var _badges = {
  firstHabit: 'https://better-habits.herokuapp.com/assets/Badges/Morning.png',
  firstCompletion: 'https://better-habits.herokuapp.com/assets/Badges/Bon_Voyage.png',
  firstPerfectDay: 'https://better-habits.herokuapp.com/assets/Badges/Mountain_Top.png',
}

var checkBadges = function (email, habit) {
  // if they don't have first completion badge
  return User.findOne({email: email})
    .then(function (user) {
      var index = user.badges.indexOf({ firstCompletion: _badges.firstCompletion })
      console.log('checkBadges index:', index)
      if (index === -1 && habit.instanceCount === 1) {
        console.log('passed check')
        user.badges.push({ firstCompletion: _badges.firstCompletion })
        user.save();
        return { firstCompletion: _badges.firstCompletion }
      }
    })
    // add badge to badges array
  // return toast info
};

module.exports = {
  checkBadges: checkBadges
};
