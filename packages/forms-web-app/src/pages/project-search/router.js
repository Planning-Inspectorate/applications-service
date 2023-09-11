const express = require('express');
const { getProjectSearch } = require('./controller');
const { projectSearchRoute } = require('./config');

const projectSearchRouter = express.Router();

projectSearchRouter.get(`/${projectSearchRoute}`, getProjectSearch);

module.exports = { projectSearchRouter };
