'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _users = require('../models/users.model');

var _users2 = _interopRequireDefault(_users);

var _appLogger = require('../core/logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var controller = {};

controller.createUser = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(req.body.email && req.body.username && req.body.password && req.body.passwordConf)) {
              _context.next = 4;
              break;
            }

            // Hash the password
            _bcrypt2.default.hash(req.body.password, 8, function (errH, hash) {
              if (errH) {
                _appLogger2.default.error(errH);
                return next(errH);
              }
              var userData = {
                email: req.body.email,
                username: req.body.username,
                password: hash
              };
              _users2.default.create(userData, function (err, user) {
                if (err) {
                  _appLogger2.default.error(err);
                  return next(err);
                }
                _appLogger2.default.info('New user \'' + user.username + '\' has been created');
                return res.json({ message: 'User with username \'' + user.username + '\' has been created' });
              });
            });
            _context.next = 6;
            break;

          case 4:
            res.status(500);
            return _context.abrupt('return', res.json({ status: 500, message: 'Email, username, password, and passwordConf must be provided' }));

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = controller;