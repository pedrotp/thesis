// Sets NODE_ENV to suppress loggers (morgan)
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
var Habit = require('../db/models').Habit;
var Instances = require('../db/models').Instances;

// Helper functions which query db
var helpers = require('../server/helpers');

xdescribe('Database', function () {

  describe('Helpers', function () {

    // Example habits with habit1Id to be assigned in
    // beforeEach and used in habit update/delete
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
        .expect(function (res) {
          habit2Id = res.body._id;
        })
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

    describe('getHabits', function () {

      it('should be a function', function (done) {
        expect(helpers.getHabits).to.be.a('function');
        done();
      });

      it('should fetch habits', function (done) {
        helpers.getHabits(
          function(success) {
            expect(success).to.be.a('array');
            expect(success.length).to.equal(2);
            done();
          },
          function (fail) {
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
          frequency: 'Weekly'
        };
        helpers.addHabit(habit3,
          function (success) {
            expect(success.action).to.equal(habit3.action);
            expect(success.frequency).to.equal(habit3.frequency);
            expect(success.instancesId).to.exist;
            done();
          },
          function (fail) {
            console.error('DbSpec addHabit error:', fail);
          });
      });

      it('should error when missing required fields', function (done) {
        var habit3 = {
          action: 'Run'
        };
        helpers.addHabit(habit3,
          function (success) {
            console.log('DbSpec addHabit success:', success);
          },
          function (fail) {
            expect(fail.message).to.equal('Habit validation failed');
            done();
          });
      });

    });

    describe('deleteHabit', function () {

      it('should be a function', function (done) {
        expect(helpers.deleteHabit).to.be.a('function');
        done();
      });

      it('should delete habit and corresponding instance store', function (done) {
        helpers.deleteHabit(habit1Id,
          function (success) {
            expect(success.habitId.toString()).to.equal(habit1Id);

            // In order to confirm instance was deleted,
            // instance1Id is assigned in beforeEach function
            // on line 50 when habit1 is successfully created
            expect(success.instanceId.toString()).to.equal(instance1Id);
            done();
          },
          function (fail) {
            console.error('DbSpec deleteHabit error:', fail);
          });
      });

      it('should error when attempting to delete invalid ID', function (done) {
        helpers.deleteHabit('12345',
          function (success) {
            console.log('DbSpec deleteHabit success:', success);
          },
          function (fail) {
            expect(fail.name).to.equal('CastError');
            expect(fail.kind).to.equal('ObjectId');
            expect(fail.path).to.equal('_id');
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
          frequency: 'Weekly'
        };
        helpers.updateHabit(habit1Id, update1,
          function (success) {
            expect(success.frequency).to.equal('Weekly');
            done();
          },
          function (fail) {
            console.error('DbSpec updateHabit error:', fail);
          });
      });

      it('should error when attempting update with incorrect ID', function (done) {

        // habit1 = { action: 'Write tests', frequency: 'Daily' }
        var update1 = {
          frequency: 'Weekly'
        };
        helpers.updateHabit('12345', update1,
          function (success) {
            console.log('DbSpec updateHabit success:', success);
          },
          function (fail) {
            expect(fail.name).to.equal('CastError');
            expect(fail.kind).to.equal('ObjectId');
            expect(fail.path).to.equal('_id');
            done();
          });
      });

    });

    describe('createInstance', function () {

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

    });

  });

});
