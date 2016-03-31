var User = require('../db/models').User;
var _badges = require('../app/lib/badges');

var awardBadge = function (user, badge) {

  // save badge to user's DB entry
  var newBadge = {};
  newBadge[badge] = _badges[badge].uri;
  user.badges.push(newBadge);
  user.save();
  // if badge is being awarded, setup toast return
  return {
    name: badge,
    toast: _badges[badge].toast,
    icon: _badges[badge].uri
  } 
};

var checkBadges = function (email, habit, habits) {
  return User.findOne({ 'email': email })
    .then(function (user) {
      var awarded = [];

      var doCheck = function (badge) {

        // check if a badge is to be awarded
        if (_badges[badge].check(habit, habits.store)) {
          // if yes, award it and push toast into awarded
          awarded.push(awardBadge(user, badge));
        }
      };

      // iterate over all possible badges
      var length = user.badges.length;
      for (var badge in _badges) {

        // if user has existing badges
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
      }
      return awarded;
    });
};

module.exports = {
  checkBadges: checkBadges,
  awardBadge: awardBadge
};
