// Sets NODE_ENV in order to suppress loggers (morgan)
process.env.NODE_ENV = 'test';

// Test
var request = require('supertest');
var expect = require('chai').expect;

// Bluebird 'join' method used in afterEach function
var Join = require('bluebird').join;

// Server
var app = require('../server/server');

// DB Models
var mongoose = require('mongoose');
var User = require('../db/models').User;
var Habit = require('../db/models').Habit;
var Instances = require('../db/models').Instances;

describe('Basic Server', function () {

  // Example habits with habit1Id to be assigned in
  // beforeEach and used in habit PUT/DELETE
  var habit1Id;
  var habit1 = {
    action: 'Write tests',
    frequency: 'Daily'
  };
  var habit2 = {
    action: 'Floss',
    frequency: 'Daily'
  };

  // Instance ID to be assigned in beforeEach
  // to habit1 and used in deleteHabit
  var instance1Id;

  beforeEach(function (done) {
    request(app)
      .post('/habits')
      .send(habit1)
      .expect(201)
      .expect(function (res) {
        habit1Id = res.body._id;
        instance1Id = res.body.instancesId;
      })
      .end(function () {
        request(app)
          .post('/habits')
          .send(habit2)
          .expect(201)
          .end(done);
      });
  });

  afterEach(function (done) {
    var dropHabits = Habit.remove({});
    var dropInstances = Instances.remove({});

    // Promise.join coordinates a fixed number of promises concurrently
    Join(dropHabits, dropInstances)
      .then(function (success) {
        // console.log('dropHabits success:', success[0].result);
        // console.log('dropInstances success:', success[1].result);
        done();
      })
      .catch(function (err) {
        console.error('DbSpec afterEach error:', err);
      });
  });

  // Close DB connection after tests complete
  after(function (done) {
    mongoose.connection.close();
    done();
  });

  describe('GET /habits', function () {

    it('should return 200 on success', function (done) {
      request(app)
        .get('/habits')
        .expect(200)
        .end(done);
    });

    it('should respond with JSON', function (done) {
      request(app)
        .get('/habits')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done);
    });

    it('should retrieve habits', function (done) {
      request(app)
        .get('/habits')
        .expect(200)
        .expect(function (res) {
          expect(res.body.length).to.equal(2);
          expect(habit1.action).to.equal(res.body[0].action);
          expect(habit1.frequency).to.equal(res.body[0].frequency);
        })
        .end(done);
    });

  });

  describe('POST /habits', function () {

    // Habit to send in POST requests
    var habit3 = {
      action: 'Run',
      frequency: 'Weekly'
    };

    it('should return 201 on success', function (done) {
      request(app)
        .post('/habits')
        .send(habit3)
        .expect(201)
        .end(done);
    });

    it('should return 400 on error (required fields missing)', function (done) {
      var errHabit = {
        action: 'Run'
      };
      request(app)
        .post('/habits')
        .send(errHabit)
        .expect(400)
        .end(done);
    });

    it('should respond with new habit on success', function (done) {
      request(app)
        .post('/habits')
        .send(habit3)
        .expect(201)
        .expect(function (res) {
          var newHabit = {
            action: res.body.action,
            frequency: res.body.frequency
          };
          expect(newHabit.action).to.equal(habit3.action);
          expect(newHabit.frequency).to.equal(habit3.frequency);
        })
        .end(done);
    });

    it('should create new instance for each new habit', function (done) {
      request(app)
        .post('/habits')
        .send(habit3)
        .expect(201)
        .expect(function (res) {
          instance1Id = res.body.instancesId;
          Instances.findById(instance1Id)
            .then(function (success) {
              expect(instance1Id).to.equal(success._id.toString());
            })
            .catch(function (err) {
              console.error('instance fail:', err);
            });
        })
        .end(done);
    });

  });

  describe('PUT /habits/:habitid', function () {

    // Updates to be used in request
    var update1 = {
      action: 'Write BETTER tests',
      frequency: 'Weekly'
    };

    it('should return 200 on success', function (done) {
      request(app)
        .put('/habits/' + habit1Id)
        .send(update1)
        .expect(200)
        .end(done);
    });

    it('should return 400 on error (incorrect ID)', function (done) {
      request(app)
        .put('/habits/12345')
        .expect(400)
        .end(done);
    });

    it('should return updated habit', function (done) {
      request(app)
        .put('/habits/' + habit1Id)
        .send(update1)
        .expect(200)
        .expect(function (res) {
          expect(update1.action).to.equal(res.body.action);
          expect(update1.frequency).to.equal(res.body.frequency);
        })
        .end(done);
    });

  });

  describe('DELETE /habits/:habitid', function () {

    it('should return 202 on success', function (done) {
      request(app)
        .delete('/habits/' + habit1Id)
        .expect(202)
        .end(done);
    });

    it('should return 500 on error (incorrect ID)', function (done) {
      request(app)
        .delete('/habits/12345')
        .expect(500)
        .end(done);
    });

    it('should return deleted habit', function (done) {
      request(app)
        .delete('/habits/' + habit1Id)
        .expect(202)
        .expect(function (res) {
          expect(habit1Id).to.equal(res.body._id);
        })
        .end(done);
    });

    it('should delete habit from database', function (done) {
      request(app)
        .delete('/habits/' + habit1Id)
        .expect(202)
        .end(function () {
          request(app)
            .get('/habits')
            .expect(200)
            .expect(function (res) {
              expect(res.body.length).to.equal(1);
            })
            .end(done);
        });
    });

  });

});
