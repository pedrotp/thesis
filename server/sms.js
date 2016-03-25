// Twilio account details
var accountSid = 'ACffea5ad1485550ef8c9e959872a324bc'; 
var authToken = 'c9b33ec2cf3f9c04a10e44aabbe88cd5'; 

// require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
var schedule = require('node-schedule');

module.exports = {
  send: function (data, callback) {
    client.messages.create({ 
      to: data.number, 
      from: "+18629022901", 
      body: data.message,   
    }, callback);
  },
  schedule: function (data, time, callback) {
    var rule = new schedule.RecurrenceRule();
    rule.hour = time.hour;
    rule.minute = time.minute;

    var job = schedule.scheduleJob(rule, function () {
      client.messages.create({ 
        to: data.number, 
        from: "+18629022901", 
        body: data.message,   
      }, function (err, message) { 
        callback(err, message, job);
      });
    });
  }  
};