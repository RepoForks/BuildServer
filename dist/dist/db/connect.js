'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _appLogger = require('../core/logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

var _config = require('../core/config/config.dev');

var _config2 = _interopRequireDefault(_config);

var _clients = require('../models/clients.model');

var _clients2 = _interopRequireDefault(_clients);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);var value = info.value;
        } catch (error) {
          reject(error);return;
        }if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }return step("next");
    });
  };
}

_mongoose2.default.Promise = global.Promise;

var connectToDb = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var dbHost, dbPort, dbName;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dbHost = _config2.default.dbHost, dbPort = _config2.default.dbPort, dbName = _config2.default.dbName;
            _context.prev = 1;
            _context.next = 4;
            return _mongoose2.default.connect('mongodb://' + dbHost + ':' + dbPort + '/' + dbName);

          case 4:
            _appLogger2.default.info('Connected to mongo server.');

            // Create the base client if does not already exist
            _clients2.default.findOneAndUpdate({
              clientId: _config2.default.clientId
            }, {
              clientId: _config2.default.clientId,
              clientSecret: _config2.default.clientSecret
            }, { upsert: true }, function (err) {
              if (err) {
                _appLogger2.default.error('Unable to instantiate base client.');
              } else {
                _appLogger2.default.info('Successfully instantiated base client.');
              }
            });
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](1);

            _appLogger2.default.error('Could not connect to MongoDB.');

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 8]]);
  }));

  return function connectToDb() {
    return _ref.apply(this, arguments);
  };
}();

exports.default = connectToDb;