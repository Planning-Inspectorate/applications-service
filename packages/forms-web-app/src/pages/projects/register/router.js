const express = require('express');
const { asyncRoute } = require('@pins/common/src/utils/async-route');
const { getRegister } = require('./index/controller');
const { registerRoute } = require('./index/config');
const { middleware } = require('../_middleware/middleware');

const registerRouter = express.Router({ mergeParams: true });

registerRouter.get(`/${registerRoute}`, middleware, asyncRoute(getRegister));
registerRouter.get(`/${registerRoute}/start`, middleware, asyncRoute(getRegister));

module.exports = { registerRouter };
