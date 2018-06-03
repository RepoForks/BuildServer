import bcrypt from 'bcrypt';
import Users from '../models/users.model';
import Tokens from '../models/tokens.model';
import Clients from '../models/clients.model';
import logger from '../core/logger/app-logger';

const auth = {};

/*
 * Get access token.
 */
auth.getAccessToken = (bearerToken, callback) => {
  Tokens.findOne({
    accessToken: bearerToken,
  }, callback);
};

/**
 * Get client.
 */
auth.getClient = (clientId, clientSecret, callback) => {
  Clients.findOne({
    clientId,
    clientSecret,
  }, callback);
};

/**
 * Grant type allowed.
 */
auth.grantTypeAllowed = (clientId, grantType, callback) => {
  callback(false, grantType === 'password');
};

/**
 * Save token.
 */
auth.saveAccessToken = (accessToken, clientId, expires, user, callback) => {
  const token = {
    accessToken,
    expires,
    clientId,
    user,
  };
  Tokens.update({ user }, { $set: token }, { upsert: true }, (err) => {
    if (err) logger.error(err);
    callback();
  });
};

/*
 * Get user.
 */
auth.getUser = (username, password, callback) => {
  Users.findOne({
    username,
  }, (errU, user) => {
    if (errU) {
      logger.error("Could not find user");
      callback({ error: 'User credentials are incorrect' }, null);
    } else {
      bcrypt.compare(password, user.password, (err, res) => {
        if (err || res !== true) {
          logger.error("Wrong password")
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
export default auth;
