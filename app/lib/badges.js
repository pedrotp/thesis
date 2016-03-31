var moment = require('moment');

var badges = {
  'First Step': {
    toastText: 'First Step to getting Better!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Morning.png',
    check: function () {
      return false;
    }
  },
  'Better Already': {
    toastText: 'You\'re Better Already!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Bungee.png',
    check: function (habit) {
      return habit.instanceCount === 1;
    }
  },
  'Top of the World': {
    toastText: 'You got your first perfect day! You\'re on Top of the World!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Mountain_Top.png',
    check: function (habit, store) {
      if (store.length > 2) {
        for (var i = 0; i < store.length; i++) {
          if (store[i].lastDone === undefined || !moment(store[i].lastDone).isSame(Date.now(), 'day')) {
            return false;
          }
        }
        return true;
      }
      return false;
    }
  },
  'Gone Streaking': {
    toastText: 'You\'re On a Roll!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Bon_Voyage.png',
    check: function (habit) {
      return habit.streak.current === 5;
    }
  },
  'On a Roll': {
    toastText: 'Ten in a row! You\'re amazing!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Skateboard.png',
    check: function (habit) {
      return habit.streak.current === 10;
    }
  },
  'On Point': {
    toastText: 'Fifteen in a row? You\'re on another level!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Archery.png',
    check: function (habit) {
      return habit.streak.current === 15;
    }
  },
  'Soaring': {
    toastText: 'You earned the Twenty Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Hot_Air_Balloon.png',
    check: function () {
      return false;
    }
  },
  'Dangerous': {
    toastText: 'You earned the Twenty-Five Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Duel.png',
    check: function () {
      return false;
    }
  },
  'Better Empire': {
    toastText: 'You earned the Thirty Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Empire_State.png',
    check: function () {
      return false;
    }
  },
  'Music to my Ears': {
    toastText: 'You earned the Thirty-Five Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Guitar.png',
    check: function () {
      return false;
    }
  },
  'Colossal': {
    toastText: 'You earned the Forty Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Niagara_Falls.png',
    check: function () {
      return false;
    }
  },
  '8th Wonder': {
    toastText: 'You earned the Forty-Five Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Pyramids.png',
    check: function () {
      return false;
    }
  },
  'True Beauty': {
    toastText: 'You earned the Fifty Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Mona_Lisa.png',
    check: function () {
      return false;
    }
  },
  '9th Wonder': {
    toastText: 'You earned the Fifty-Five Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Stonehenge.png',
    check: function () {
      return false;
    }
  },
  'AUSome': {
    toastText: 'You earned the Sixty Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Sydney.png',
    check: function () {
      return false;
    }
  },
  '10th Wonder': {
    toastText: 'You earned the Sixty-Five Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Taj_Mahal.png',
    check: function () {
      return false;
    }
  },
  'Deep Sea': {
    toastText: 'You earned the Seventy Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Underwater.png',
    check: function () {
      return false;
    }
  },
  'International': {
    toastText: 'You earned the Seventy-Five Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Bonjour.png',
    check: function () {
      return false;
    }
  }
};

module.exports = badges;
