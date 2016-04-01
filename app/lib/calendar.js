var moment = require('moment');
require('moment-range');

// Generates labels for calendar
var calendarLabel = function () {
  var result = [];
  var weekDays = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
  weekDays.forEach(function (item) {
    result.push({calendarHeading: item});
  });
  return result;
};

// Creates an array of dates (moment objects) in ISOString format
// Current range - Start of 3 weeks prior to start of current week to end of the current week
var getPeriodArray = function () {
  // Current range
  var timeInterval = moment().startOf('week').subtract(3, 'weeks').format() + '/' + moment().endOf('week').add(1, 'weeks').format();
  var dr = moment.range(timeInterval);
  var periodArray = dr.toArray('weeks');
  // Converts moment object to ISOString format
  var transform = periodArray.map(function (week) {
    return week.format();
  });
  return transform;
};

// Creates an array containing objects representing each day in the period
var getDaysArray = function (array) {
  var daysArray = [];
  
  for (var i = 0; i < 4; i++ ) {
    var weekInterval, weekRange, weekRangeArray;
    if( i + 1 < array.length) {
      weekInterval = array[i] + '/' + array[ i + 1 ];
      weekRange = moment.range(weekInterval);
      weekRangeArray = weekRange.toArray('days');
    }
    var transform = weekRangeArray.map(function(day) {
      return {ISOString: day.format(), date: day.date(), done: false};
    });
    // removes duplicate end-of-week day
    transform.pop(); 
    transform.forEach(function(day){
      daysArray.push(day);
    });
  }
  return daysArray;
};

var getInstancePeriod = function (startDate, endDate) {
  var timeInterval = moment(startDate).startOf('day').format() + '/' + moment(endDate).startOf('day').format();
  var dr = moment.range(timeInterval);
  var instanceArray = dr.toArray('days');
  // Converts moment object to ISOString format
  var transform = instanceArray.map(function (day) {
    return { ISOString: day.format(), done: false };
  });
  return transform;
};


module.exports = {
  getPeriodArray: getPeriodArray,
  getDaysArray: getDaysArray,
  calendarLabel: calendarLabel,
  getInstancePeriod: getInstancePeriod,
};





