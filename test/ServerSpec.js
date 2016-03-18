// Sets NODE_ENV in order to suppress loggers (morgan)
process.env.NODE_ENV = 'test';

// Test
var request = require('supertest');
var expect = require('chai').expect;

// Server
var app = require('../server/server');

// DB Models
var Habit = require('../db/models').Habit;
var Instances = require('../db/models').Instances;

xdescribe('Basic Server', function () {

  // Example habits to be used in POST and PUT tests
  var habit1 = {
    action: 'Write tests',
    frequency: 'Daily'
  };
  var habit2 = {
    action: 'Floss',
    frequency: 'Daily'
  };

  beforeEach(function (done) {
    Habit.create(habit1)
      .then(function (success) {
        // console.log('First habit success:', success);
      })
      .catch(function (err) {
        console.error(err);
      });

    Habit.create(habit2)
      .then(function (success) {
        // console.log('Second habit success:', success);
      })
      .catch(function (err) {
        console.error(err);
      });

    done();
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

  xdescribe('GET /habits', function () {

    it('should return 200 on success', function (done) {
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

  xdescribe('POST /habits', function () {

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
          var newUser = {
            action: res.body.action,
            frequency: res.body.frequency
          };
          expect(newUser.action).to.equal(habit3.action);
          expect(newUser.frequency).to.equal(habit3.frequency);
        })
        .end(done);
    });

    it('should create new instance for each new habit', function (done) {
      var instanceId;
      request(app)
        .post('/habits')
        .send(habit3)
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

  xdescribe('PUT /habits/:habitid', function () {

    // Updates to be used in requests
    var updates = {
      action: 'Write BETTER tests',
      frequency: 'Weekly'
    };

    // Used to store habit ID to be used in requests
    var habitId;

    it('should return 200 on success', function (done) {
      request(app)
        .get('/habits')
        .expect(200)
        .expect(function (res) {

          // habit1 { action: 'Write tests', frequency: 'Daily' }
          habitId = res.body[0]._id;
        })
        .end(function () {
          request(app)
            .put('/habits/' + habitId)
            .send(updates)
            .expect(200)
            .end(done);
        });
    });

    it('should return 400 on error (incorrect ID)', function (done) {
      request(app)
        .put('/habits/12345')
        .expect(400)
        .end(done);
    });

    it('should return updated habit', function (done) {
      request(app)
        .get('/habits')
        .expect(200)
        .expect(function (res) {

          // habit1 { action: 'Write tests', frequency: 'Daily' }
          habitId = res.body[0]._id;
        })
        .end(function () {
          request(app)
            .put('/habits/' + habitId)
            .send(updates)
            .expect(200)
            .expect(function (res) {
              expect(updates.action).to.equal(res.body.action);
              expect(updates.frequency).to.equal(res.body.frequency);
            })
            .end(done);
        });
    });

  });

  xdescribe('DELETE /habits/:habitid', function () {

    // Used to store habit ID to be used in requests
    var habitId;

    it('should return 202 on success', function (done) {
      request(app)
        .get('/habits')
        .expect(200)
        .expect(function (res) {

          // habit2 { action: 'Floss', frequency: 'Daily' }
          habitId = res.body[1]._id;
        })
        .end(function () {
          request(app)
            .delete('/habits/' + habitId)
            .expect(202)
            .end(done);
        });
    });

    it('should return 500 on error (incorrect ID)', function (done) {
      request(app)
        .delete('/habits/12345')
        .expect(500)
        .end(done);
    });

    it('should return deleted habit', function (done) {
      request(app)
        .get('/habits')
        .expect(200)
        .expect(function (res) {

          // habit2 { action: 'Floss', frequency: 'Daily' }
          habitId = res.body[1]._id;
        })
        .end(function () {
          request(app)
            .delete('/habits/' + habitId)
            .expect(202)
            .expect(function (res) {
              expect(habit2.action).to.equal(res.body.action);
              expect(habit2.frequency).to.equal(res.body.frequency);
            })
            .end(done);
        });
    });

    it('should delete habit from database', function (done) {
      request(app)
        .get('/habits')
        .expect(200)
        .expect(function (res) {

          // habit2 { action: 'Floss', frequency: 'Daily' }
          habitId = res.body[1]._id;
        })
        .end(function () {
          request(app)
            .delete('/habits/' + habitId)
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

});