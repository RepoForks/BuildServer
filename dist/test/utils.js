'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _users = require('../models/users.model');

var _users2 = _interopRequireDefault(_users);

var _tokens = require('../models/tokens.model');

var _tokens2 = _interopRequireDefault(_tokens);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utils = {};

var testUser = {
  username: 'mocha',
  email: 'mocha@tester.com',
  password: 'mediummochaicedlattewithwholemilk',
  passwordConf: 'mediummochaicedlattewithwholemilk'
};

utils.createTestUser = function (cb) {
  _users2.default.create(testUser, function () {
    cb();
  });
};

utils.deleteTestUser = function (user, cb) {
  _users2.default.findOne({ username: user.username }, function (err, foundUser) {
    _tokens2.default.deleteOne({ user: foundUser }, function () {
      _users2.default.deleteOne({ username: user.username }, function () {
        // Then delete this user's tokens
        cb();
      });
    });
  });
};

exports.default = utils;