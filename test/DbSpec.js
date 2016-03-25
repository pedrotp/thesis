// Sets NODE_ENV to suppress loggers (morgan)
process.env.NODE_ENV = 'test';

// Test
var request = require('supertest');
var expect = require('chai').expect;

// Bluebird 'join' method used in afterEach function
var Join = require('bluebird').join;

// Moment to test the lastDone property
var moment = require('moment');

// Server
var app = require('../server/server');

// DB Models
var mongoose = require('mongoose');
var User = require('../db/models').User;
var Habits = require('../db/models').Habits;
var Instances = require('../db/models').Instances;

// Helper functions which query db
var helpers = require('../server/helpers');

describe('Database', function () {

  describe('Helpers', function () {

    // Example user
    var user = {
      email: 'yolo@yolo.com'
    };

    // Example habits with habit1Id to be assigned in
    // beforeEach and used in habit update/delete
    var habit1Id, habit2Id;
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

    describe('getHabits', function () {

      it('should be a function', function (done) {
        expect(helpers.getHabits).to.be.a('function');
        done();
      });

      it('should fetch habits', function (done) {
        helpers.getHabits(user.email)
          .then(function (success) {
            expect(success).to.be.a('array');
            expect(success.length).to.equal(2);
            done();
          })
          .catch(function (fail) {
            console.error('DbSpec getHabits error:', fail);
          });
      });

    });

    describe('addHabit', function () {

      it('should be a function', function (done) {
        expect(helpers.addHabit).to.be.a('function');
        done();
      });

      it('should add both a new habit and an instance store', function (done) {
        var habit3 = {
          action: 'Run',
        };
        helpers.addHabit(user.email, habit3)
          .then(function (success) {
            expect(success.action).to.equal(habit3.action);
            expect(success.instancesId).to.exist;
            done();
          })
          .catch(function (fail) {
            console.error('DbSpec addHabit error:', fail);
          });
      });

      xit('should error when missing required fields', function (done) {
        var habit3 = {
          action: 'Run'
        };
        helpers.addHabit(user.email, habit3,
          function (success) {
            console.log('DbSpec addHabit success:', success);
          },
          function (fail) {
            expect(fail).to.equal('Required field(s) missing');
            done();
          });
      });

    });

    describe('deleteHabit', function () {

      it('should be a function', function (done) {
        expect(helpers.deleteHabit).to.be.a('function');
        done();
      });

      // TODO: refactor after updated deleteHabit helper is implemented
      // success data will be modified
      it('should delete habit and corresponding instance store', function (done) {
        helpers.deleteHabit(user.email, habit1Id)
          .then (function (success) {
            expect(success._id.toString()).to.equal(habit1Id);

            // In order to confirm instance was deleted,
            // instance1Id is assigned in beforeEach function
            // on line 49 when habit1 is successfully created
            Instances.findById(instance1Id)
              .then(function (success) {
                expect(success).to.equal(null);
                done();
              })
              .catch(function (err) {
                console.error('Instance fail:', err);
              });
          })
          .then(function (fail) {
            console.error('DbSpec deleteHabit error:', fail);
          });
      });

      it('should error when attempting to delete invalid ID', function (done) {
        helpers.deleteHabit(user.email, '12345')
          .then(function (success) {
            console.log('DbSpec deleteHabit success:', success);
          })
          .catch(function (fail) {
            expect(fail).to.exist;
            done();
          });
      });

    });

    describe('updateHabit', function () {

      it('should be a function', function (done) {
        expect(helpers.updateHabit).to.be.a('function');
        done();
      });

      it('should update habit with changes', function (done) {

        // habit1 = { action: 'Write tests', frequency: 'Daily' }
        var update1 = {
          action : 'Update'
        };
        helpers.updateHabit(user.email, habit1Id, update1)
          .then(function (success) {
            expect(success.action).to.equal('Update');
            done();
          })
          .catch(function (fail) {
            console.error('DbSpec updateHabit error:', fail);
          });
      });

      it('should error when attempting update with incorrect ID', function (done) {

        // habit1 = { action: 'Write tests', frequency: 'Daily' }
        var update1 = {
          action: 'Error out'
        };
        helpers.updateHabit(user.email, '12345', update1)
          .then(function (success) {
            console.log('DbSpec updateHabit success:', success);
          })
          .catch(function (fail) {
            expect(fail).to.exist;
            done();
          });
      });

    });

    xdescribe('createInstance', function () {

      it('should be a function', function (done) {
        expect(helpers.createInstance).to.be.a('function');
        done();
      });

      it('should create an instance for existing habit', function (done) {
        helpers.createInstance(habit1Id,
        function (success) {
          expect(success._id).to.exist;
          done();
        },
        function (fail) {
          console.error('createInstance error:', fail);
        });
      });

      it('should error when attempting to create instance on non-existent habit', function (done) {
        helpers.createInstance('12345',
        function (success) {
          console.log('DbSpec createInstance success:', success);
        },
        function (fail) {
          expect(fail.name).to.equal('CastError');
          expect(fail.kind).to.equal('ObjectId');
          expect(fail.path).to.equal('_id');
          done();
        });
      });

      it('should update the instanceCount property for the habit', function (done) {
        helpers.createInstance(habit1Id,
          function (instance) {
            Habit.findById(habit1Id)
              .then(function (habit) {
                expect(habit.instanceCount).to.equal(1);
                done();
              })
              .catch(function (err) {
                done(err);
              });
          },
          function (err) {
            done(err);
          });
      });

      it('should update the lastDone property for the habit', function (done) {
        Habit.findById(habit1Id)
          .then(function (habit) {
            expect(habit.lastDone).to.exist;
            expect(moment(habit.lastDone).isSame(Date.now(), 'minute')).to.equal(true);
            done();
          })
          .catch(function (err) {
            done(err);
          });
      });

    });

  });

});
