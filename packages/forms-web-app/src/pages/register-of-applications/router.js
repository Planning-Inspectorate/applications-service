const express = require('express');
const { getRegisterOfApplications } = require('./controller');

const registerOfApplicationsRouter = express.Router();

registerOfApplicationsRouter.get('/register-of-applications', getRegisterOfApplications);

module.exports = { registerOfApplicationsRouter };
