import Mongoose from 'mongoose';
import logger from '../core/logger/app-logger';
import config from '../core/config/config.dev';
import Clients from '../models/clients.model';

Mongoose.Promise = global.Promise;

const connectToDb = async () => {
  const { dbHost, dbPort, dbName } = config;
  try {
    await Mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);
    logger.info('Connected to mongo server.');

    // Create the base client if does not already exist
    Clients.findOneAndUpdate({
      clientId: config.clientId,
    }, {
      clientId: config.clientId,
      clientSecret: config.clientSecret,
    }, { upsert: true }, (err) => {
      if (err) {
        logger.error('Unable to instantiate base client.');
      } else {
        logger.info('Successfully instantiated base client.');
      }
    });
  } catch (err) {
    logger.error('Could not connect to MongoDB.');
  }
};

export default connectToDb;
