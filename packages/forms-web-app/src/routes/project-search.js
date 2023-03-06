const express = require('express');
const projectSearchController = require('../pages/projects/project-search/project-search');

const router = express.Router();

router.get('/', projectSearchController.getProjectList);

module.exports = router;
