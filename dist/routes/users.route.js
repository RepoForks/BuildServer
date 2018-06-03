'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('../controllers/users.controller');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/allcars', function (req, res) {
  _users2.default.getAll(req, res);
});

router.post('/addcar', function (req, res) {
  _users2.default.addCar(req, res);
});

router.delete('/deletecar', function (req, res) {
  _users2.default.deleteCar(req, res);
});

exports.default = router;