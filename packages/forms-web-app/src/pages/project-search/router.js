const express = require('express');
const { getProjectSearch } = require('./controller');

const projectSearchRouter = express.Router();

projectSearchRouter.get('/project-search', getProjectSearch);

module.exports = { projectSearchRouter };
