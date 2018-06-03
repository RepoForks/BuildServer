'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _users = require('../models/users.model');

var _users2 = _interopRequireDefault(_users);

var _tokens = require('../models/tokens.model');

var _tokens2 = _interopRequireDefault(_tokens);

var _clients = require('../models/clients.model');

var _clients2 = _interopRequireDefault(_clients);

var _appLogger = require('../core/logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = {};

/*
 * Get access token.
 */
auth.getAccessToken = function (bearerToken, callback) {
  _tokens2.default.findOne({
    accessToken: bearerToken
  }, callback);
};

/**
 * Get client.
 */
auth.getClient = function (clientId, clientSecret, callback) {
  _clients2.default.findOne({
    clientId: clientId,
    clientSecret: clientSecret
  }, callback);
};

/**
 * Grant type allowed.
 */
auth.grantTypeAllowed = function (clientId, grantType, callback) {
  callback(false, grantType === 'password');
};

/**
 * Save token.
 */
auth.saveAccessToken = function (accessToken, clientId, expires, user, callback) {
  var token = {
    accessToken: accessToken,
    expires: expires,
    clientId: clientId,
    user: user
  };
  _tokens2.default.update({ user: user }, { $set: token }, { upsert: true }, function (err) {
    if (err) _appLogger2.default.error(err);
    callback();
  });
};

/*
 * Get user.
 */
auth.getUser = function (username, password, callback) {
  _users2.default.findOne({
    username: username
  }, function (errU, user) {
    if (errU) {
      _appLogger2.default.error("Could not find user");
      callback({ error: 'User credentials are incorrect' }, null);
    } else {
      _bcrypt2.default.compare(password, user.password, function (err, res) {
        if (err || res !== true) {
          _appLogger2.default.error("Wrong password");
          callback({ error: 'User credentials are incorrect' }, null);
        } else {
          callback(null, user);
        }
      });
    }
  });
};

/**
 * Export model definition object.
 */
exports.default = auth;