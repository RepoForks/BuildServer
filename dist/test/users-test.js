'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _users = require('../models/users.model');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect,
    assert = _chai2.default.assert;

var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

describe('Users', function () {
  var app = null;
  var user = {
    username: 'mocha',
    email: 'mocha@tester.com',
    password: 'mediummochaicedlattewithwholemilk',
    passwordConf: 'mediummochaicedlattewithwholemilk'
  };
  var accessToken = null;

  before(function (done) {
    // Before the test suite we start server and create a user
    app = require('../server').default;
    done();
  });

  after(function (done) {
    // Delete the user in case there is a remnant
    _utils2.default.deleteTestUser(user, done);
  });

  describe('user creation and auth flow', function () {
    it('it should POST a new user', function (done) {
      _chai2.default.request(app).post('/api/users').send(user).end(function (err, res) {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('User with username \'mocha\' has been created');
        done();
      });
    });
    it('it should authenticate the user', function (done) {
      _chai2.default.request(app).post('/oauth/token').set('content-type', 'application/x-www-form-urlencoded').set('Authorization', 'Basic Y29pbml0bWFpbjpVWTlWREU2OTI0M1JZQzkwMjQzODdIRlkzQVFGSw==').send({
        username: user.username,
        password: user.password,
        grant_type: 'password'
      }).end(function (err, res) {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token_type').eql('bearer');
        res.body.should.have.property('access_token');
        res.body.should.have.property('expires_in');
        accessToken = res.body.access_token;
        done();
      });
    });
  });
});