const session = require('express-session');
const logger = require('./logger');
const config = require('../config');

module.exports = () => {
  const { sessionSecret } = config.server;

  if (!sessionSecret) {
    throw new Error('Session secret must be set');
  }

  const sessionConfig = {
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {},
  };

  if (config.server.useSecureSessionCookie) {
    sessionConfig.cookie.secure = true; // serve secure cookies
  }

  return sessionConfig;
};
