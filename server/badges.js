var Habits = require('../db/models').Habits;
var Instances = require('../db/models').Instances;
var User = require('../db/models').User;

var _badges = {
  firstHabit: {
    toastText: 'You earned the First Habit badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Morning.png',
    check: function () {
      return false;
    }
  },
  firstCompletion: {
    toastText: 'You earned the First Completion Badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Bon_Voyage.png',
    check: function (habit) {
      //do checking stuff
      return habit.instanceCount === 1
    }
  },
  firstPerfectDay: {
    toastText: 'You earned the Perfect Day badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Mountain_Top.png',
    check: function () {
      return false;
    }
  },
}

var awardBadge = function (user, badge) {

  // save badge to user's DB entry
  var newBadge = {};
  newBadge[badge] = _badges[badge].uri;
  user.badges.push(newBadge);
  user.save();

  // if badge is being awarded, setup toast return
  return _badges[badge].toastText;
};

var checkBadges = function (email, habit) {
  return User.findOne({ 'email': email })
    .then(function (user) {
      var awarded = [];

      var doCheck = function (badge) {

        // check if a badge is to be awarded
        if (_badges[badge].check(habit)) {
          // if yes, award it and push toast into awarded
          awarded.push(awardBadge(user, badge));
        }
      }

      // iterate over all possible badges
      var length = user.badges.length;
      for (var badge in _badges) {

        // if user has existing badges
        // if (user.badges.length !== 0) {
          var found = false;
          for(var i = 0; i < length; i++) {
            // if the user doesn't have current badge, check if it should be awarded
            if (user.badges[i].hasOwnProperty(badge)) {
              found = true;
              break;
            }
          }
          if (found === false) {
            doCheck(badge);
          }
        // } else {

        //   // if user has no badges, check if they should be awarded current badge
        //   doCheck(badge);
        // }
      }
      return awarded;
    });
};


module.exports = {
  checkBadges: checkBadges,
  awardBadge: awardBadge
};
