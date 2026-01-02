/**
 * OS Maps OAuth Routes
 *
 * Routes for OAuth token generation for map tile proxying
 */

const express = require('express');
const { getOSMapsToken } = require('./controller');

const osMapsRouter = express.Router();

osMapsRouter.get('/token', getOSMapsToken);

module.exports = osMapsRouter;
