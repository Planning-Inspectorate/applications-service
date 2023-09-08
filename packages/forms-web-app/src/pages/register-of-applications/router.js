const express = require('express');
const { getRegisterOfApplications } = require('./controller');

const registerOfApplicationsRoute = 'register-of-applications';
const registerOfApplicationsRouter = express.Router();

registerOfApplicationsRouter.get(`/${registerOfApplicationsRoute}`, getRegisterOfApplications);

module.exports = { registerOfApplicationsRoute, registerOfApplicationsRouter };
