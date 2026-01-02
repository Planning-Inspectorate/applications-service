/**
 * OS Maps OAuth Routes
 *
 * Routes for OAuth token generation for map tile proxying
 *
 * Usage:
 *   GET /api/os-maps/token
 *   Returns: { access_token, token_type, expires_in }
 */

const express = require('express');
const { getOSMapsToken } = require('./controller');

const osMapsRouter = express.Router();

osMapsRouter.get('/os-maps/token', getOSMapsToken);

module.exports = osMapsRouter;
