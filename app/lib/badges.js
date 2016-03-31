var moment = require('moment');

var badges = {
  'First Step': {
    toastText: 'You earned the First Step badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Morning.png',
    check: function () {
      return false;
    }
  },
  'Better Already': {
    toastText: 'You earned the Better Already Badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Bungee.png',
    check: function (habit) {
      return habit.instanceCount === 1;
    }
  },
  'Top of the World': {
    toastText: 'You earned the Top of the World badge!',
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
  'Five Streak': {
    toastText: 'You earned the Five Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Mona_Lisa.png',
    check: function (habit) {
      return habit.streak.current === 5;
    }
  },
  'Ten Streak': {
    toastText: 'You earned the Ten Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Archery.png',
    check: function (habit) {
      return habit.streak.current === 10;
    }
  },
  'Fifteen Streak': {
    toastText: 'You earned the Fifteen Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Hot_Air_Balloon.png',
    check: function (habit) {
      return habit.streak.current === 15;
    }
  },
  'Twenty Streak': {
    toastText: 'You earned the Twenty Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Bon_Voyage.png',
    check: function () {
      return false;
    }
  },
  'Twenty-Five Streak': {
    toastText: 'You earned the Twenty-Five Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Duel.png',
    check: function () {
      return false;
    }
  },
  'Thirty Streak': {
    toastText: 'You earned the Thirty Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Empire_State.png',
    check: function () {
      return false;
    }
  },
  'Thirty-Five Streak': {
    toastText: 'You earned the Thirty-Five Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Guitar.png',
    check: function () {
      return false;
    }
  },
  'Forty Streak': {
    toastText: 'You earned the Forty Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Niagara_Falls.png',
    check: function () {
      return false;
    }
  },
  'Forty-Five Streak': {
    toastText: 'You earned the Forty-Five Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Picnic.png',
    check: function () {
      return false;
    }
  },
  'Fifty Streak': {
    toastText: 'You earned the Fifty Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Skateboard.png',
    check: function () {
      return false;
    }
  },
  'Fifty-Five Streak': {
    toastText: 'You earned the Fifty-Five Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Stonehenge.png',
    check: function () {
      return false;
    }
  },
  'Sixty Streak': {
    toastText: 'You earned the Sixty Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Sydney.png',
    check: function () {
      return false;
    }
  },
  'Sixty-Five Streak': {
    toastText: 'You earned the Sixty-Five Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Taj_Mahal.png',
    check: function () {
      return false;
    }
  },
  'Seventy Streak': {
    toastText: 'You earned the Seventy Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Underwater.png',
    check: function () {
      return false;
    }
  },
  'Seventy-Five Streak': {
    toastText: 'You earned the Seventy-Five Streak badge!',
    uri: 'https://better-habits.herokuapp.com/assets/Badges/Bonjour.png',
    check: function () {
      return false;
    }
  }
};

module.exports = badges;
