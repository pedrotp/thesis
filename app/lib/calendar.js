var getDaysArray = function(year, month) {
  var names = [ 'Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa' ];
  var result = [];
  
  var date = new Date(year, month - 1, 1);
  
  var fullDate = new Date(year, month - 1 , 2);
  var day = fullDate.getDate();
  
  while (date.getMonth() == month - 1) {
    result.push({fullDate: new Date(fullDate.setDate(day++)).toISOString(), date: date.getDate(), dayOfWeek: names[date.getDay()]});
    date.setDate(date.getDate() + 1);
  }
  return result;
}
var myDays = getDaysArray(2016, 3);

console.log(myDays);

module.exports = getDaysArray;