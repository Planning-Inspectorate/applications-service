const express = require('express');
const { getProjectSearch } = require('./controller');

const projectSearchRoute = 'project-search';
const projectSearchRouter = express.Router();

projectSearchRouter.get(`/${projectSearchRoute}`, getProjectSearch);

module.exports = { projectSearchRoute, projectSearchRouter };
