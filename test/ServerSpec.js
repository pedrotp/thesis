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
var Habits = require('../db/models').Habits;
var Instances = require('../db/models').Instances;

describe('Basic Server', function () {

  // Example user
  var user = {
    email: 'yolo@yolo.com'
  };

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
      .post('/user')
      .send(user)
      .expect(200)
      .expect(function (res) {
        expect(res.body.email).to.equal('yolo@yolo.com');
      })
      .end(function () {
        request(app)
        .post('/habits/' + user.email)
        .send(habit1)
        .expect(201)
        .expect(function (res) {
          habit1Id = res.body._id;
          instance1Id = res.body.instancesId;
        })
        .end(function () {
          request(app)
          .post('/habits/' + user.email)
          .send(habit2)
          .expect(201)
          .expect(function (res) {
            habit2Id = res.body._id;
          })
          .end(done);
        });
      });
  });

  afterEach(function (done) {
    var dropUser = User.remove({});
    var dropHabits = Habits.remove({});
    var dropInstances = Instances.remove({});

    // Promise.join coordinates a fixed number of promises concurrently
    Join(dropUser, dropHabits, dropInstances)
      .then(function (success) {
        // console.log('dropUser success:', success[0].result);
        // console.log('dropHabits success:', success[1].result);
        // console.log('dropInstances success:', success[2].result);
        done();
      })
      .catch(function (err) {
        console.error('DbSpec afterEach error:', err);
      });
  });

  after(function (done) {
    // Close DB connection after tests complete
    mongoose.connection.close();
    done();
  });

  describe('GET /habits/:user', function () {

    it('should return 200 on success', function (done) {
      request(app)
        .get('/habits/' + user.email)
        .expect(200)
        .end(done);
    });

    it('should respond with JSON', function (done) {
      request(app)
        .get('/habits/' + user.email)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done);
    });

    it('should retrieve habits', function (done) {
      request(app)
        .get('/habits/' + user.email)
        .expect(200)
        .expect(function (res) {
          expect(res.body.length).to.equal(2);
          expect(habit1.action).to.equal(res.body[0].action);
          expect(habit1.frequency).to.equal(res.body[0].frequency);
        })
        .end(done);
    });

  });

  describe('POST /habits/:user', function () {

    // Habit to send in POST requests
    var habit3 = {
      action: 'Run',
      frequency: 'Weekly'
    };

    it('should return 201 on success', function (done) {
      request(app)
        .post('/habits/' + user.email)
        .send(habit3)
        .expect(201)
        .end(done);
    });

    it('should return 400 on error (required fields missing)', function (done) {
      var errHabit = {};
      request(app)
        .post('/habits/' + user.email)
        .send(errHabit)
        .expect(400)
        .end(done);
    });

    it('should respond with new habit on success', function (done) {
      request(app)
        .post('/habits/' + user.email)
        .send(habit3)
        .expect(201)
        .expect(function (res) {
          expect(res.body.action).to.equal(habit3.action);
          expect(res.body.frequency).to.equal(habit3.frequency);
        })
        .end(done);
    });

    it('should create new instance for each new habit', function (done) {
      request(app)
        .post('/habits/' + user.email)
        .send(habit3)
        .expect(201)
        .expect(function (res) {
          instance1Id = res.body.instancesId;
          Instances.findById(instance1Id)
            .then(function (success) {
              expect(instance1Id).to.equal(success._id.toString());
            })
            .catch(function (err) {
              console.error('Instance fail:', err);
            });
        })
        .end(done);
    });

  });

  describe('PUT /habits/:user/:habitid', function () {

    // Updates to be used in request
    var update1 = {
      action: 'Write BETTER tests',
      frequency: 'Weekly'
    };

    it('should return 200 on success', function (done) {
      request(app)
        .put('/habits/' + user.email + '/' + habit1Id)
        .send(update1)
        .expect(200)
        .end(done);
    });

    // Incorrect ID not being handled and returning status 200
    it('should return 400 on error (incorrect ID)', function (done) {
      request(app)
        .put('/habits/' + user.email + '/12345')
        .expect(400)
        .end(done);
    });

    it('should return updated habit', function (done) {
      request(app)
        .put('/habits/' + user.email + '/' + habit1Id)
        .send(update1)
        .expect(200)
        .expect(function (res) {
          expect(update1.action).to.equal(res.body.action);
        })
        .end(done);
    });

  });

  describe('DELETE /habits/:user/:habitid', function () {

    it('should return 200 on success', function (done) {
      request(app)
        .delete('/habits/' + user.email + '/' + habit1Id)
        .expect(200)
        .end(done);
    });

    it('should return 400 on error (incorrect ID)', function (done) {
      request(app)
        .delete('/habits/' + user.email + '/12345')
        .expect(400)
        .end(done);
    });

    it('should return deleted habit', function (done) {
      request(app)
        .delete('/habits/' + user.email + '/' + habit1Id)
        .expect(200)
        .expect(function (res) {
          expect(habit1Id).to.equal(res.body._id);
        })
        .end(done);
    });

    it('should delete habit from database', function (done) {
      request(app)
        .delete('/habits/' + user.email + '/' + habit1Id)
        .expect(200)
        .end(function () {
          request(app)
            .get('/habits/' + user.email)
            .expect(200)
            .expect(function (res) {
              expect(res.body.length).to.equal(1);
            })
            .end(done);
        });
    });

  });

});
