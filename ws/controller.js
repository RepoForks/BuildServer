import WebSocket from 'ws';
import logger from '../core/logger/app-logger';
import config from '../core/config/config.dev';

const controller = {};

controller.startSockets = () => {
  logger.info('WebSocket starting');
  const { websocketPort } = config;
  controller.wss = new WebSocket.Server({ port: websocketPort });
  controller.wss.on('connection', (ws) => {
    logger.info('socket has been connected');
  });
  controller.wss.on('error', (error) => {
    logger.error(`WebSocket error: ${error}`);
  });
  controller.wss.on('listening', () => {
    logger.info(`WebSocket now listening on ${controller.wss.address().port}`);
  });
};

export default controller;
