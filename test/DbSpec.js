// Sets NODE_ENV to suppress loggers (morgan)
process.env.NODE_ENV = 'test';

// Test
var request = require('supertest');
var expect = require('chai').expect;

// Server
var app = require('../server/server');

// DB Models
var mongoose = require('mongoose');
var Habit = require('../db/models').Habit;
var Instances = require('../db/models').Instances;

// Helpers
var helpers = require('../server/helpers');

describe('Database', function () {

  // Example habits
  var habit1 = {
    action: 'Write tests',
    frequency: 'Daily'
  };
  var habit2 = {
    action: 'Floss',
    frequency: 'Daily'
  };

  describe('Helpers', function () {

    beforeEach(function (done) {
      request(app)
      .post('/habits')
      .send(habit1)
      .expect(201)
      .end(function () {
        request(app)
        .post('/habits')
        .send(habit2)
        .expect(201)
        .end(done);
      });
    });

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

    // After tests run, close DB connection
    after(function (done) {
      mongoose.connection.close();
      done();
    });

    describe('getHabits', function () {

      it('should be a function', function (done) {
        expect(helpers.getHabits).to.be.a('function');
        done();
      });

      it('should fetch habits from database', function (done) {
        helpers.getHabits(
          function(success) {
            expect(success).to.be.a('array');
            expect(success.length).to.equal(2);
          },
          function (fail) {
            console.error('getHabits error:', fail);
          });
        done();
      });

    });

  });

});
