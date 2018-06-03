import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import OauthServer from 'oauth2-server';
import logger from './core/logger/app-logger';
import config from './core/config/config.dev';
import openRoutes from './routes/open.route';
import authedRoutes from './routes/authed.route';
import connectToDb from './db/connect';
import socketManager from './ws/controller';
import auth from './controllers/auth.controller';

const port = config.serverPort;
logger.stream = {
  write(message) {
    logger.info(message);
  },
};

connectToDb();

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev', { stream: logger.stream }));

app.oauth = OauthServer({
  model: auth,
  grants: ['password'],
  debug: true,
});

app.all('/oauth/token', app.oauth.grant());

app.use('/api/secure', app.oauth.authorise(), authedRoutes);
app.use('/api', openRoutes);

// app.get('/secret', app.oauth.authorise(), (req, res) => {
//   res.send('Congratulations, you are in a secret area!');
// });

// Index route
app.get('/', (req, res) => {
  res.send('Invalid endpoint!');
});

app.use(app.oauth.errorHandler());

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
  console.log('Sending error information');
  console.log(err);
  res.status(err.status || 500);
  res.json(err);
});

const server = app.listen(port, () => {
  logger.info('Build server started on port', port);
  socketManager.startSockets();
});

export default server;
