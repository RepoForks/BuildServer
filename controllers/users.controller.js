import bcrypt from 'bcrypt';
import Users from '../models/users.model';
import logger from '../core/logger/app-logger';

const controller = {};

controller.createUser = async (req, res, next) => {
  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {
    // Hash the password
    bcrypt.hash(req.body.password, 8, (errH, hash) => {
      if (errH) {
        logger.error(errH);
        return next(errH);
      }
      const userData = {
        email: req.body.email,
        username: req.body.username,
        password: hash,
      };
      Users.create(userData, (err, user) => {
        if (err) {
          logger.error(err);
          return next(err);
        }
        logger.info(`New user '${user.username}' has been created`);
        return res.json({ message: `User with username '${user.username}' has been created` });
      });
    });
  } else {
    res.status(500);
    return res.json({ status: 500, message: 'Email, username, password, and passwordConf must be provided' });
  }
};

export default controller;
