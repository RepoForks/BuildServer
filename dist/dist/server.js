'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _appLogger = require('./core/logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

var _config = require('./core/config/config.dev');

var _config2 = _interopRequireDefault(_config);

var _users = require('./routes/users.route');

var _users2 = _interopRequireDefault(_users);

var _connect = require('./db/connect');

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var port = _config2.default.serverPort;
_appLogger2.default.stream = {
  write: function write(message, encoding) {
    _appLogger2.default.info(message);
  }
};

(0, _connect2.default)();

var app = (0, _express2.default)();
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _morgan2.default)('dev', { stream: _appLogger2.default.stream }));

app.use('/cars', _users2.default);

// Index route
app.get('/', function (req, res) {
  res.send('Invalid endpoint!');
});

app.listen(port, function () {
  _appLogger2.default.info('server started - ', port);
});