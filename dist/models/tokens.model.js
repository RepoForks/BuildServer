'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _users = require('./users.model');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TokenSchema = new _mongoose2.default.Schema({
  accessToken: String,
  expires: Date,
  clientId: String,
  user: _users2.default.schema
});

var Tokens = _mongoose2.default.model('Tokens', TokenSchema);

exports.default = Tokens;