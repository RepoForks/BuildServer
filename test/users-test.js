import chai from 'chai';
import chaiHttp from 'chai-http';
import utils from './utils';
import Users from '../models/users.model';

const { expect, assert } = chai;
const should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  let app = null;
  const user = {
    username: 'mocha',
    email: 'mocha@tester.com',
    password: 'mediummochaicedlattewithwholemilk',
    passwordConf: 'mediummochaicedlattewithwholemilk',
  };
  let accessToken = null;

  before((done) => { // Before the test suite we start server and create a user
    app = require('../server').default;
    done();
  });

  after((done) => {
    // Delete the user in case there is a remnant
    utils.deleteTestUser(user, done);
  });

  describe('user creation and auth flow', () => {
    it('it should POST a new user', (done) => {
      chai.request(app)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User with username \'mocha\' has been created');
          done();
        });
    });
    it('it should authenticate the user', (done) => {
      chai.request(app)
        .post('/oauth/token')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Basic Y29pbml0bWFpbjpVWTlWREU2OTI0M1JZQzkwMjQzODdIRlkzQVFGSw==')
        .send({
          username: user.username,
          password: user.password,
          grant_type: 'password',
        })
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token_type').eql('bearer');
          res.body.should.have.property('access_token');
          res.body.should.have.property('expires_in');
          accessToken = res.body.access_token;
          done();
        });
    });
  });
});
