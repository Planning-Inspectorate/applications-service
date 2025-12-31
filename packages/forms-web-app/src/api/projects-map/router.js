const express = require('express');
const { getProjectsMap } = require('./controller');

const projectsMapRouter = express.Router();

projectsMapRouter.get('/projects-map', getProjectsMap);

module.exports = { projectsMapRouter };
