import Users from '../models/users.model';
import Tokens from '../models/tokens.model';

const utils = {};

const testUser = {
  username: 'mocha',
  email: 'mocha@tester.com',
  password: 'mediummochaicedlattewithwholemilk',
  passwordConf: 'mediummochaicedlattewithwholemilk',
};

utils.createTestUser = (cb) => {
  Users.create(testUser, () => {
    cb();
  });
};

utils.deleteTestUser = (user, cb) => {
  Users.findOne({ username: user.username }, (err, foundUser) => {
    Tokens.deleteOne({ user: foundUser }, () => {
      Users.deleteOne({ username: user.username }, () => {
        // Then delete this user's tokens
        cb();
      });
    });
  });
};

export default utils;
