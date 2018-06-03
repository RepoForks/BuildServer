'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils = {};

utils.getMissingParams = function (body, params) {
  var missingParams = [];
  for (var i = 0; i < params.length; i += 1) {
    var param = params[i];
    if (!body[param]) {
      missingParams.push(param);
    }
  }
  if (missingParams.length <= 0) {
    return null;
  }
  return 'The following parameters are missing: \'' + missingParams.join('\', \'') + '\'';
};

exports.default = utils;