// Twilio account details
var accountSid = 'ACffea5ad1485550ef8c9e959872a324bc'; 
var authToken = 'c9b33ec2cf3f9c04a10e44aabbe88cd5'; 

// require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
var cronJob = require('cron').CronJob;

module.exports = {
  send: function (data, callback) {
    client.sendMessage({ 
      to: data.number, 
      from: '+18629022901', 
      body: data.message,   
    }, callback);
  },
  schedule: function (data, time) {
    time.days = time.days || '*';
    var _this = this;
    var job = new cronJob('0 ' + time.minute + ' ' + time.hour + ' * * ' + time.days, function(){
      this.send(data, function (err, message) {
        console.log('Message sent: ', message.body);
      });
    }, null, true, null, _this);
    return job;
  }
};