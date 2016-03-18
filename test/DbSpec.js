// Test
var request = require('request');
var expect = require('chai').expect;

// DB connection
var db = require('../db/db');

// DB Models
var User = require('../db/models').User;
var Habit = require('../db/models').Habit;
var Instance = require('../db/models').Instance;
var Instances = require('../db/models').Instances;

describe('Basic Server', function () {

  // To store ID from POST response to use in PUT/DELETE tests
  var habitid;

  describe('GET /habits', function () {
    it('should return status code 200', function (done) {
      request('http://localhost:3000/habits', function (err, res) {
        if (err) {
          console.error(err);
        }
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('POST /habits', function () {
    afterEach(function (done) {
      Habit.remove({})
        .then(function (success) {
          // console.log('Habits successfully removed');
        })
        .catch(function (err) {
          console.error(err);
        });

      done();
    });

    it('should return status code 201', function (done) {
      var reqParams = {
        method: 'POST',
        uri: 'http://localhost:3000/habits',
        json: {
          action: "floss",
          frequency: "every night",
          unit: "one tooth",
          schedule: "9 PM"
        }
      };

      request(reqParams, function (err, res) {
        if (err) {
          console.error(err);
        }

        // Storing ID to be used in PUT/DELETE requests
        habitid = res.body._id;
        expect(res.statusCode).to.equal(201);
        done();
      });
    });
  });

  describe('PUT /habits/:habitid', function () {
    it('should return status code 200', function (done) {
      var reqParams = {
        method: 'PUT',
        uri: 'http://localhost:3000/habits/' + habitid,
        json: {
          schedule: '8 PM'
        }
      };

      request(reqParams, function (err, res) {
        if (err) {
          console.error(err);
        }
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe ('DELETE /habits:habitid', function () {
    it('should return status code 202', function (done) {
      var reqParams = {
        method: 'DELETE',
        uri: 'http://localhost:3000/habits/' + habitid
      };

      request(reqParams, function (err, res) {
        if (err) {
          console.error(err);
        }
        expect(res.statusCode).to.equal(202);
        done();
      });
    });
  });
});
