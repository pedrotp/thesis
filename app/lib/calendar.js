var getDaysArray = function(year, month) {
  var names = [ 'Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa' ];
  var result = [];
  
  var date = new Date(year, month - 1, 1);
  
  var fullDate = new Date(year, month - 1 , 2);
  var day = fullDate.getDate();
  
  while (date.getMonth() == month - 1) {
    result.push({fullDate: new Date(fullDate.setDate(day++)).toISOString(), date: date.getDate(), dayOfWeek: names[date.getDay()], done: false, placeholder: false});
    date.setDate(date.getDate() + 1);
  }
  return result;
};

var makePlaceholder = function (length) {
  var arr = [];
  for (var i = 1; i <= length; i++) {
    arr.push({placeholder: true})
  }
  return arr;
};

var getOffSetDays = function (day, rawArray) {
  switch (day) {
    case 'Su':
      return makePlaceholder(0).concat(rawArray);
      break;
    case 'M':
      return makePlaceholder(1).concat(rawArray);
      break;
    case 'Tu':
      return makePlaceholder(2).concat(rawArray);
      break;
    case 'W':
      return makePlaceholder(3).concat(rawArray);
      break;
    case 'Th':
      return makePlaceholder(4).concat(rawArray);
      break;
    case 'F':
      return makePlaceholder(5).concat(rawArray);
      break;
    case 'Sa':
      return makePlaceholder(6).concat(rawArray);
      break;
  }
};

var getDaysOfWeek = function () {
  var result = []
  var arr = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
  arr.forEach(function (item) {
    result.push({calendarHeading: item})
  })
  return result;
}





module.exports.getDaysArray = getDaysArray;
module.exports.getOffSetDays = getOffSetDays;
module.exports.getDaysOfWeek = getDaysOfWeek;
module.exports.makePlaceholder = makePlaceholder;