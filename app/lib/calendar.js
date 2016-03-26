var moment = require('moment');
require('moment-range');


var calendarLabel = function () {
  var result = [];
  var arr = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
  
  arr.forEach(function (item) {
    result.push({calendarHeading: item});
  });
  return result;
};


var getPeriodArray = function () {
  // Between start of 3 weeks ago and end of current week
  var timeInterval = moment().startOf('week').subtract(3, 'weeks').format() + '/' + moment().endOf('week').add(1, 'weeks').format();
  var dr = moment.range(timeInterval);


  var test = dr.toArray('weeks');
  var output = test.map(function (week) {
    return week.format();
  });
  
  return output;
};


var getDaysArray = function (array) {
  var period = [];
  
  for (var i = 0; i < 4; i++ ) {
    var weekInterval;
    var weekRange;
    var weekRangeArray;
    
    if( i + 1 < array.length) {
      weekInterval = array[i] + '/' + array[ i + 1 ];
      weekRange = moment.range(weekInterval);
      weekRangeArray = weekRange.toArray('days');
    }
    
    var transform = weekRangeArray.map(function(day) {
      return {ISOString: day.format(), date: day.date(), done: false};
    });
    
    transform.pop(); // removes duplicate end-of-week day
    
    transform.forEach(function(day){
      period.push(day);
    });
  }
  return period;
};


module.exports.getPeriodArray = getPeriodArray;
module.exports.getDaysArray = getDaysArray;
module.exports.calendarLabel = calendarLabel;





