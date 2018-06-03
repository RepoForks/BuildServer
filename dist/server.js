'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _oauth2Server = require('oauth2-server');

var _oauth2Server2 = _interopRequireDefault(_oauth2Server);

var _appLogger = require('./core/logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

var _config = require('./core/config/config.dev');

var _config2 = _interopRequireDefault(_config);

var _open = require('./routes/open.route');

var _open2 = _interopRequireDefault(_open);

var _authed = require('./routes/authed.route');

var _authed2 = _interopRequireDefault(_authed);

var _connect = require('./db/connect');

var _connect2 = _interopRequireDefault(_connect);

var _auth = require('./controllers/auth.controller');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = _config2.default.serverPort;
_appLogger2.default.stream = {
  write: function write(message) {
    _appLogger2.default.info(message);
  }
};

(0, _connect2.default)();

var app = (0, _express2.default)();
app.use((0, _cors2.default)());

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use((0, _morgan2.default)('dev', { stream: _appLogger2.default.stream }));

app.oauth = (0, _oauth2Server2.default)({
  model: _auth2.default,
  grants: ['password'],
  debug: true
});

app.all('/oauth/token', app.oauth.grant());

app.use('/api/secure', app.oauth.authorise(), _authed2.default);
app.use('/api', _open2.default);

// app.get('/secret', app.oauth.authorise(), (req, res) => {
//   res.send('Congratulations, you are in a secret area!');
// });

// Index route
app.get('/', function (req, res) {
  res.send('Invalid endpoint!');
});

app.use(app.oauth.errorHandler());

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  console.log('Sending error information');
  console.log(err);
  res.status(err.status || 500);
  res.json(err);
});

var server = app.listen(port, function () {
  _appLogger2.default.info('Build server started on port ', port);
});

exports.default = server;