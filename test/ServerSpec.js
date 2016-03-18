// Signals tests being run to turn off logger(s)
exports.testing = true;

// Test
var request = require('supertest');
var expect = require('chai').expect;

// Server
var express = require('express');
var app = require('../server/server');

// DB Models
var Habit = require('../db/models').Habit;
var Instances = require('../db/models').Instances;

describe('Basic Server', function () {
  // Example habit to be used in POST and PUT tests
  var habit = {
    action: 'Write tests',
    frequency: 'Daily'
  };

  describe('GET /habits', function () {

    it('should return status code 200', function (done) {
      request(app)
        .get('/habits')
        .expect(200, done);
    });

    it('should respond with JSON', function (done) {
      request(app)
        .get('/habits')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

  });

  describe('POST /habits', function () {

    // Remove habits and instances after each POST
    afterEach(function (done) {
      Habit.remove({})
        .then(function (success) {
          // console.log('Habits successfully removed:', success.result);
        })
        .catch(function (err) {
          console.error(err);
        });

      Instances.remove({})
        .then(function (success) {
          // console.log('Instances successfully removed');
        })
        .catch(function (err) {
          console.error(err);
        });

      done();
    });

    it('should return status code 201', function (done) {
      request(app)
        .post('/habits')
        .send(habit)
        .expect(201)
        .end(done);
    });

    it('should respond with new habit on success', function (done) {
      request(app)
        .post('/habits')
        .send(habit)
        .expect(201)
        .expect(function (res) {
          var newUser = {
            action: res.body.action,
            frequency: res.body.frequency
          };
          expect(newUser.action).to.equal(habit.action);
          expect(newUser.frequency).to.equal(habit.frequency);
        })
        .end(done);
    });

    it('should create new instance for each new habit', function (done) {
      var instanceId;

      request(app)
        .post('/habits')
        .send(habit)
        .expect(201)
        .expect(function (res) {
          instanceId = res.body.instancesId;
          Instances.findById(instanceId)
            .then(function (success) {
              expect(instanceId).to.equal(success._id.toString());
            })
            .catch(function (err) {
              console.error('instance fail:', err);
            });
        })
        .end(done);
    });
  });

  describe('PUT /habits/:habitid', function () {

    // Updates to 'habit' (line 18) to be used in requests
    var updates = {

      // Previously 'Write tests'
      action: 'Write BETTER tests',

      // Previously 'Daily'
      frequency: 'Weekly'
    };

    // Used to store habit ID to be used in requests
    var habitId;

    // Remove habits and instances after each PUT
    afterEach(function (done) {
      Habit.remove({})
        .then(function (success) {
          // console.log('Habits successfully removed:', success.result);
        })
        .catch(function (err) {
          console.error(err);
        });

      Instances.remove({})
        .then(function (success) {
          // console.log('Instances successfully removed');
        })
        .catch(function (err) {
          console.error(err);
        });

      done();
    });

    it('should return status code 200', function (done) {
      Habit.create(habit)
        .then(function (success) {
          // console.log('PUT beforeEach success:', success);
          habitId = success._id;
          request(app)
            .put('/habits/' + habitId)
            .send(updates)
            .expect(200)
            .end(done);
        })
        .catch(function (err) {
          console.error(err);
        });
    });

    it('should return updated habit', function (done) {
      Habit.create(habit)
        .then(function (success) {
          // console.log('PUT beforeEach success:', success);
          habitId = success._id;
          request(app)
            .put('/habits/' + habitId)
            .send(updates)
            .expect(200)
            .expect(function (res) {
              expect(updates.action).to.equal(res.body.action);
              expect(updates.frequency).to.equal(res.body.frequency);
            })
            .end(done);
        })
        .catch(function (err) {
          console.error(err);
        });
    });
  });

});
