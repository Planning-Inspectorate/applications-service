const express = require('express');
const { getRegisterOfApplications } = require('./controller');
const { registerOfApplicationsRoute } = require('./config');

const registerOfApplicationsRouter = express.Router();

registerOfApplicationsRouter.get(`/${registerOfApplicationsRoute}`, getRegisterOfApplications);

module.exports = { registerOfApplicationsRouter };
